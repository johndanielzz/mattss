import { randomUUID } from "node:crypto";
import fs from "node:fs/promises";
import path from "node:path";
import { firestoreClient } from "../config/firebase.js";

const memoryStore = new Map();
const storeDir = process.env.VERCEL ? "/tmp" : process.cwd();
const localStorePath = path.resolve(storeDir, process.env.LOCAL_DATA_FILE || "data/local-store.json");
let localStoreLoaded = false;
let localStoreWriteQueue = Promise.resolve();

function collectionStore(name) {
  if (!memoryStore.has(name)) memoryStore.set(name, new Map());
  return memoryStore.get(name);
}

async function loadLocalStore() {
  if (localStoreLoaded) return;
  localStoreLoaded = true;

  try {
    const raw = await fs.readFile(localStorePath, "utf8");
    const parsed = JSON.parse(raw);
    for (const [collection, records] of Object.entries(parsed.collections || {})) {
      collectionStore(collection).clear();
      for (const record of Array.isArray(records) ? records : []) {
        if (record?.id) collectionStore(collection).set(record.id, record);
      }
    }
  } catch (error) {
    if (error.code !== "ENOENT") throw error;
  }
}

function localStorePayload() {
  return {
    updatedAt: new Date().toISOString(),
    collections: Object.fromEntries([...memoryStore.entries()].map(([collection, records]) => [
      collection,
      [...records.values()]
    ]))
  };
}

async function persistLocalStore() {
  const payload = JSON.stringify(localStorePayload(), null, 2);
  const directory = path.dirname(localStorePath);
  const tempPath = `${localStorePath}.${process.pid}.tmp`;
  await fs.mkdir(directory, { recursive: true });
  await fs.writeFile(tempPath, payload, "utf8");
  await fs.rename(tempPath, localStorePath);
}

async function queueLocalStorePersist() {
  localStoreWriteQueue = localStoreWriteQueue.then(persistLocalStore, persistLocalStore);
  return localStoreWriteQueue;
}

function applyWhere(items, where = []) {
  return items.filter((item) => where.every(({ field, op, value }) => {
    if (op !== "==") return true;
    return item[field] === value;
  }));
}

export class FirestoreRepository {
  constructor(collectionName) {
    this.collectionName = collectionName;
  }

  client() {
    return firestoreClient();
  }

  async _saveLocal(id, payload) {
    try {
      await loadLocalStore();
      collectionStore(this.collectionName).set(id, payload);
      await queueLocalStorePersist();
    } catch (e) {
      // Local storage fallback failed, but we still return the payload
      console.error("local_store_save_error:", e.message);
    }
  }

  async _loadLocal() {
    try {
      await loadLocalStore();
    } catch (e) {
      console.error("local_store_load_error:", e.message);
    }
    return collectionStore(this.collectionName);
  }

  async create(data) {
    const id = data.id || randomUUID();
    const now = new Date().toISOString();
    const payload = { ...data, id, createdAt: data.createdAt || now, updatedAt: now };

    const client = this.client();
    if (client) {
      const result = await client.set(this.collectionName, id, payload);
      if (result) return result; // Firebase succeeded
      // Firebase failed, fall through to local
    }

    await this._saveLocal(id, payload);
    return payload;
  }

  async upsert(id, data) {
    const now = new Date().toISOString();
    const existing = await this.findById(id);
    const payload = { ...(existing || {}), ...data, id, updatedAt: now, createdAt: existing?.createdAt || now };

    const client = this.client();
    if (client) {
      const result = await client.set(this.collectionName, id, payload);
      if (result) return result; // Firebase succeeded
      // Firebase failed, fall through to local
    }

    await this._saveLocal(id, payload);
    return payload;
  }

  async findById(id) {
    const client = this.client();
    if (client) {
      const result = await client.get(this.collectionName, id);
      if (result) return result; // Firebase has it
      // Firebase returned null, still check local
    }

    const store = await this._loadLocal();
    return store.get(id) || null;
  }

  async list({ where = [], limit = 50, orderBy = "updatedAt" } = {}) {
    const client = this.client();
    let items = [];

    if (client) {
      const result = await client.list(this.collectionName, { limit: Math.max(limit, 100) });
      if (result && result.length > 0) {
        items = result;
      }
    }

    // If Firebase returned nothing, try local
    if (items.length === 0) {
      const store = await this._loadLocal();
      items = Array.from(store.values());
    }

    return applyWhere(items, where)
      .sort((a, b) => String(b[orderBy] || "").localeCompare(String(a[orderBy] || "")))
      .slice(0, limit);
  }

  async update(id, data) {
    const existing = await this.findById(id);
    if (!existing) return null;
    return this.upsert(id, { ...existing, ...data });
  }
}