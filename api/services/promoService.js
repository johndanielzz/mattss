import { FirestoreRepository } from "../repositories/firestoreRepository.js";
import { AppError } from "../utils/errors.js";

const PROMO_CODES = {
  "freematpass2026": {
    type: "unlimited",
    label: "Free MAT Pass",
    description: "Unlimited access forever",
    maxUses: 1
  },
  "freematcode20": {
    type: "limited",
    label: "Free MAT Code 20",
    description: "20 searches/day, 20 results each, valid 2 days",
    maxUses: 1,
    searchesPerDay: 20,
    resultsPerSearch: 20,
    durationDays: 2
  }
};

export class PromoService {
  constructor() {
    this.users = new FirestoreRepository("users");
    this.promoUsages = new FirestoreRepository("promoUsages");
  }

  getPromoDefinition(code) {
    const normalized = String(code || "").trim().toLowerCase();
    return PROMO_CODES[normalized] || null;
  }

  async redeemCode(userId, code) {
    const normalized = String(code || "").trim().toLowerCase();
    const promo = PROMO_CODES[normalized];
    if (!promo) {
      throw new AppError("Invalid promo code. Please check and try again.", 404, "INVALID_PROMO_CODE");
    }

    // Check if this user has already used this code
    const existingUsages = await this.promoUsages.list({
      where: [
        { field: "userId", op: "==", value: userId },
        { field: "code", op: "==", value: normalized }
      ],
      limit: 1
    });
    if (existingUsages.length > 0) {
      throw new AppError("This promo code has already been used on your account.", 409, "PROMO_CODE_ALREADY_USED");
    }

    // Check total usage limit
    const allUsages = await this.promoUsages.list({
      where: [{ field: "code", op: "==", value: normalized }],
      limit: 1000
    });
    if (allUsages.length >= promo.maxUses) {
      throw new AppError("This promo code has reached its maximum usage limit.", 409, "PROMO_CODE_EXHAUSTED");
    }

    // Create the promo grant
    const now = new Date();
    const grant = {
      userId,
      code: normalized,
      type: promo.type,
      redeemedAt: now.toISOString(),
      searchesUsedToday: 0,
      lastSearchDate: now.toISOString().slice(0, 10)
    };

    if (promo.type === "limited") {
      grant.searchesPerDay = promo.searchesPerDay;
      grant.resultsPerSearch = promo.resultsPerSearch;
      grant.durationDays = promo.durationDays;
      grant.expiresAt = new Date(now.getTime() + promo.durationDays * 24 * 60 * 60 * 1000).toISOString();
    }

    const usage = await this.promoUsages.create(grant);

    // Update user's promo field
    const stored = await this.users.findById(userId);
    const activePromos = (stored?.promoGrants || []).concat([usage]);
    await this.users.upsert(userId, {
      email: stored?.email || "",
      role: stored?.role || "user",
      promoGrants: activePromos
    });

    return usage;
  }

  async getActivePromo(userId) {
    const stored = await this.users.findById(userId);
    if (!stored?.promoGrants || !Array.isArray(stored.promoGrants) || stored.promoGrants.length === 0) {
      return null;
    }

    const now = new Date();
    // Sort by most recent first
    const grants = [...stored.promoGrants].sort((a, b) => String(b.redeemedAt || "").localeCompare(String(a.redeemedAt || "")));

    for (const grant of grants) {
      if (grant.type === "unlimited") {
        return grant; // Valid forever
      }
      if (grant.type === "limited" && grant.expiresAt) {
        const expiresAt = new Date(grant.expiresAt);
        if (expiresAt > now) {
          return grant; // Still valid
        }
      }
    }

    return null;
  }

  async trackSearch(userId) {
    const active = await this.getActivePromo(userId);
    if (!active) return null;

    if (active.type === "unlimited") {
      return { type: "unlimited", unlimited: true };
    }

    if (active.type === "limited") {
      const today = new Date().toISOString().slice(0, 10);
      const lastSearch = active.lastSearchDate || "";

      // Reset daily counter if new day
      if (lastSearch !== today) {
        active.searchesUsedToday = 0;
        active.lastSearchDate = today;
      }

      if (active.searchesUsedToday >= active.searchesPerDay) {
        return { type: "limited", limited: true, message: "Daily search limit reached for your promo code." };
      }

      // Increment usage
      active.searchesUsedToday = (active.searchesUsedToday || 0) + 1;

      // Update in DB
      const stored = await this.users.findById(userId);
      const grants = (stored?.promoGrants || []).map((g) => {
        if (g.id === active.id) {
          return { ...g, searchesUsedToday: active.searchesUsedToday, lastSearchDate: today };
        }
        return g;
      });
      await this.users.upsert(userId, {
        email: stored?.email || "",
        role: stored?.role || "user",
        promoGrants: grants
      });

      return {
        type: "limited",
        searchesPerDay: active.searchesPerDay,
        resultsPerSearch: active.resultsPerSearch,
        searchesUsedToday: active.searchesUsedToday,
        unlimited: false
      };
    }

    return null;
  }
}