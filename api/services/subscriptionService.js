import { FirestoreRepository } from "../repositories/firestoreRepository.js";
import { AppError } from "../utils/errors.js";
import { GooglePlacesService } from "./googlePlacesService.js";
import { WebsiteAuditService } from "./websiteAuditService.js";

// Weekly Lead Subscriptions: automated lead delivery every week
// Users set their search criteria once, we run it weekly and deliver results

const WEEKLY_PLANS = {
  "weekly_starter": { priceCents: 9700, label: "Weekly Starter", leadsPerWeek: 50, price: "$97/mo" },
  "weekly_pro": { priceCents: 24700, label: "Weekly Pro", leadsPerWeek: 200, price: "$247/mo" },
  "weekly_agency": { priceCents: 49700, label: "Weekly Agency", leadsPerWeek: 1000, price: "$497/mo" }
};

export { WEEKLY_PLANS };

export class SubscriptionService {
  constructor() {
    this.subscriptions = new FirestoreRepository("weeklySubscriptions");
    this.leads = new FirestoreRepository("leads");
    this.users = new FirestoreRepository("users");
    this.googlePlaces = new GooglePlacesService();
    this.websiteAudit = new WebsiteAuditService();
  }

  getPlans() {
    return Object.entries(WEEKLY_PLANS).map(([key, plan]) => ({ key, ...plan }));
  }

  async create(userId, planKey, searchCriteria) {
    const plan = WEEKLY_PLANS[planKey];
    if (!plan) throw new AppError("Invalid weekly plan.", 422, "INVALID_WEEKLY_PLAN");

    const sub = await this.subscriptions.create({
      userId,
      planKey,
      leadsPerWeek: plan.leadsPerWeek,
      priceCents: plan.priceCents,
      searchCriteria: {
        country: searchCriteria.country || "United States",
        businessTypes: searchCriteria.businessTypes || [],
        industry: searchCriteria.industry || "",
        keyword: searchCriteria.keyword || "",
        city: searchCriteria.city || "",
        state: searchCriteria.state || "",
        mapLink: searchCriteria.mapLink || "",
        radiusMeters: searchCriteria.radiusMeters || 15000,
        leadQuality: searchCriteria.leadQuality || "all",
        sortBy: searchCriteria.sortBy || "opportunity",
        searchDepth: searchCriteria.searchDepth || "deep",
        minOpportunityScore: searchCriteria.minOpportunityScore || 0,
        requireContact: Boolean(searchCriteria.requireContact),
        missingWebsiteOnly: Boolean(searchCriteria.missingWebsiteOnly)
      },
      status: "active",
      weekNumber: 0,
      totalLeadsDelivered: 0,
      lastDeliveryAt: null,
      nextDeliveryAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
      createdAt: new Date().toISOString()
    });

    return sub;
  }

  async getUserSubscriptions(userId) {
    return this.subscriptions.list({
      where: [{ field: "userId", op: "==", value: userId }],
      limit: 50,
      orderBy: "createdAt"
    });
  }

  async cancel(subscriptionId, userId) {
    const sub = await this.subscriptions.findById(subscriptionId);
    if (!sub || sub.userId !== userId) throw new AppError("Subscription not found.", 404, "SUBSCRIPTION_NOT_FOUND");
    await this.subscriptions.upsert(subscriptionId, { status: "cancelled", cancelledAt: new Date().toISOString() });
    return { message: "Subscription cancelled." };
  }

  // Called by a cron job weekly
  async processWeeklyDeliveries() {
    const all = await this.subscriptions.list({
      where: [{ field: "status", op: "==", value: "active" }],
      limit: 100
    });

    const now = new Date();
    const results = [];

    for (const sub of all) {
      if (sub.nextDeliveryAt && new Date(sub.nextDeliveryAt) > now) continue;

      try {
        const search = {
          ...sub.searchCriteria,
          limit: Math.min(sub.leadsPerWeek, 200),
          bypassCache: true,
          refreshSeed: `weekly-${sub.id}-${Date.now()}`
        };

        const result = await this.googlePlaces.search(search);
        const leads = (result.leads || []).slice(0, sub.leadsPerWeek);

        // Save leads and assign to user
        for (const lead of leads) {
          await this.leads.upsert(lead.id, {
            ...lead,
            ownerId: sub.userId,
            source: "weekly_subscription",
            subscriptionId: sub.id,
            deliveredAt: new Date().toISOString()
          });
        }

        const weekNumber = (sub.weekNumber || 0) + 1;
        const totalDelivered = (sub.totalLeadsDelivered || 0) + leads.length;

        await this.subscriptions.upsert(sub.id, {
          weekNumber,
          totalLeadsDelivered: totalDelivered,
          lastDeliveryAt: new Date().toISOString(),
          nextDeliveryAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString()
        });

        results.push({ subscriptionId: sub.id, delivered: leads.length, weekNumber });
      } catch (e) {
        results.push({ subscriptionId: sub.id, error: e.message });
      }
    }

    return results;
  }
}