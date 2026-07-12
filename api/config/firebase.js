import { env } from "./env.js";
import { logger } from "../utils/logger.js";

// Uses Firebase Realtime Database REST API
// All data is stored online in the Realtime Database

const hasFirebaseConfig = Boolean(
  env.firebase.databaseURL &&
  env.firebase.webApiKey
);

function rtdbUrl(path) {
  const base = env.firebase.databaseURL.replace(/\/$/, "");
  const cleanPath = String(path || "").replace(/^\/+/, "");
  return `${base}/${cleanPath}.json?auth=${env.firebase.webApiKey}`;
}

export function isFirebaseConfigured() {
  return hasFirebaseConfig;
}

export function isFirebaseAuthConfigured() {
  return Boolean(env.firebase.webApiKey);
}

export function firestoreClient() {
  if (!hasFirebaseConfig) return null;

  return {
    async get(collection, id) {
      try {
        const url = rtdbUrl(`${collection}/${id}`);
        const response = await fetch(url);
        if (response.status === 404) return null;
        if (!response.ok) return null;
        const data = await response.json();
        if (!data) return null;
        return { id, ...data };
      } catch (e) {
        logger.warn("rtdb_get_error", { collection, id, error: e.message });
        return null;
      }
    },

    async set(collection, id, data) {
      try {
        const url = rtdbUrl(`${collection}/${id}`);
        const response = await fetch(url, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data)
        });
        if (!response.ok) {
          const body = await response.text();
          logger.warn("rtdb_set_error", { collection, id, status: response.status, body: body.slice(0, 200) });
          return null;
        }
        return { id, ...data };
      } catch (e) {
        logger.warn("rtdb_set_exception", { collection, id, error: e.message });
        return null;
      }
    },

    async list(collection, { limit = 50 } = {}) {
      try {
        const url = rtdbUrl(collection);
        const response = await fetch(url);
        if (response.status === 404) return [];
        if (!response.ok) return [];
        const data = await response.json();
        if (!data || typeof data !== "object") return [];
        const items = Object.entries(data).map(([id, value]) => ({
          id,
          ...(typeof value === "object" ? value : { value })
        }));
        return items.slice(0, limit);
      } catch (e) {
        logger.warn("rtdb_list_error", { collection, error: e.message });
        return [];
      }
    }
  };
}