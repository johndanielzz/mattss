import { FirestoreRepository } from "../repositories/firestoreRepository.js";
import { AppError } from "../utils/errors.js";

// Lead Marketplace: users can list leads for sale and buy leads from others
// Platform takes 30% commission on each sale

export class MarketplaceService {
  constructor() {
    this.listings = new FirestoreRepository("marketplaceListings");
    this.transactions = new FirestoreRepository("marketplaceTransactions");
    this.leads = new FirestoreRepository("leads");
    this.users = new FirestoreRepository("users");
    this.platformCommission = 0.30; // 30%
  }

  async listLeadForSale(userId, leadId, priceCents) {
    const lead = await this.leads.findById(leadId);
    if (!lead) throw new AppError("Lead not found.", 404, "LEAD_NOT_FOUND");
    // Admin can list any lead
    if (lead.ownerId && lead.ownerId !== userId) {
      const user = await this.users.findById(userId);
      if (user?.role !== "admin") throw new AppError("You can only sell leads you own.", 403, "NOT_OWNER");
    }

    const price = Math.max(99, Math.min(9999, Math.round(priceCents))); // $0.99 to $99.99

    const listing = await this.listings.create({
      sellerId: userId,
      leadId,
      leadName: lead.name || "Business",
      leadBusinessType: lead.businessType || lead.category || "Local business",
      leadAddress: lead.address || "",
      leadPhone: lead.phone || "",
      leadEmail: lead.email || "",
      leadWebsiteUrl: lead.websiteUrl || "",
      leadScore: lead.opportunityScore ?? lead.audit?.score ?? 0,
      priceCents: price,
      priceDollars: (price / 100).toFixed(2),
      status: "active",
      listedAt: new Date().toISOString()
    });

    return listing;
  }

  async buyLead(buyerId, listingId) {
    const listing = await this.listings.findById(listingId);
    if (!listing) throw new AppError("Listing not found.", 404, "LISTING_NOT_FOUND");
    if (listing.status !== "active") throw new AppError("Listing is no longer available.", 400, "LISTING_SOLD");
    if (listing.sellerId === buyerId) throw new AppError("You cannot buy your own listing.", 400, "CANNOT_BUY_OWN");

    const commissionCents = Math.round(listing.priceCents * this.platformCommission);
    const sellerEarnsCents = listing.priceCents - commissionCents;

    const transaction = await this.transactions.create({
      listingId,
      buyerId,
      sellerId: listing.sellerId,
      leadId: listing.leadId,
      priceCents: listing.priceCents,
      commissionCents,
      sellerEarnsCents,
      status: "completed",
      completedAt: new Date().toISOString()
    });

    await this.listings.upsert(listingId, { status: "sold", boughtAt: new Date().toISOString(), buyerId });

    const lead = await this.leads.findById(listing.leadId);
    if (lead) {
      await this.leads.upsert(lead.id, {
        ...lead,
        ownerId: buyerId,
        purchasedAt: new Date().toISOString(),
        purchasePrice: listing.priceCents
      });
    }

    const seller = await this.users.findById(listing.sellerId);
    const currentBalance = seller?.marketplaceBalance || 0;
    await this.users.upsert(listing.sellerId, {
      email: seller?.email || "",
      role: seller?.role || "user",
      marketplaceBalance: currentBalance + sellerEarnsCents
    });

    return { transaction, lead };
  }

  async listActiveListings({ limit = 50, offset = 0, minScore, businessType } = {}) {
    const all = await this.listings.list({
      where: [{ field: "status", op: "==", value: "active" }],
      limit: 500
    });

    let filtered = all;
    if (minScore) filtered = filtered.filter((l) => (l.leadScore || 0) >= minScore);
    if (businessType) filtered = filtered.filter((l) => String(l.leadBusinessType || "").toLowerCase().includes(businessType.toLowerCase()));

    filtered.sort((a, b) => (b.leadScore || 0) - (a.leadScore || 0));

    return {
      listings: filtered.slice(offset, offset + limit),
      total: filtered.length,
      page: Math.floor(offset / limit) + 1,
      totalPages: Math.ceil(filtered.length / limit)
    };
  }

  async getSellerStats(sellerId) {
    const listings = await this.listings.list({
      where: [{ field: "sellerId", op: "==", value: sellerId }],
      limit: 500
    });
    const transactions = await this.transactions.list({
      where: [{ field: "sellerId", op: "==", value: sellerId }],
      limit: 500
    });

    const totalEarned = transactions.reduce((sum, t) => sum + (t.sellerEarnsCents || 0), 0);
    const totalCommission = transactions.reduce((sum, t) => sum + (t.commissionCents || 0), 0);

    return {
      totalListed: listings.length,
      activeListings: listings.filter((l) => l.status === "active").length,
      soldCount: transactions.length,
      totalEarnedCents: totalEarned,
      totalEarnedDollars: (totalEarned / 100).toFixed(2),
      platformCommissionCents: totalCommission,
      platformCommissionDollars: (totalCommission / 100).toFixed(2)
    };
  }

  async getBuyerStats(buyerId) {
    const transactions = await this.transactions.list({
      where: [{ field: "buyerId", op: "==", value: buyerId }],
      limit: 500
    });

    const totalSpent = transactions.reduce((sum, t) => sum + (t.priceCents || 0), 0);

    return {
      totalPurchased: transactions.length,
      totalSpentCents: totalSpent,
      totalSpentDollars: (totalSpent / 100).toFixed(2)
    };
  }

  async getPlatformStats() {
    const allTransactions = await this.transactions.list({ limit: 1000 });
    const totalCommission = allTransactions.reduce((sum, t) => sum + (t.commissionCents || 0), 0);
    const totalVolume = allTransactions.reduce((sum, t) => sum + (t.priceCents || 0), 0);

    return {
      totalTransactions: allTransactions.length,
      totalVolumeCents: totalVolume,
      totalVolumeDollars: (totalVolume / 100).toFixed(2),
      totalCommissionCents: totalCommission,
      totalCommissionDollars: (totalCommission / 100).toFixed(2)
    };
  }
}