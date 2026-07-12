import { FirestoreRepository } from "../repositories/firestoreRepository.js";
import { AppError } from "../utils/errors.js";
import { getPlan } from "../config/plans.js";

// Credit Packs: users buy credits, credits are used to purchase marketplace leads
// 1 credit = 1 lead purchase

const CREDIT_PACKS = {
  "credits_25": { credits: 25, priceCents: 4900, label: "25 Credits", price: "$49" },
  "credits_100": { credits: 100, priceCents: 14900, label: "100 Credits", price: "$149" },
  "credits_500": { credits: 500, priceCents: 49900, label: "500 Credits", price: "$499" }
};

export { CREDIT_PACKS };

export class CreditService {
  constructor() {
    this.users = new FirestoreRepository("users");
    this.creditTransactions = new FirestoreRepository("creditTransactions");
  }

  getPacks() {
    return Object.entries(CREDIT_PACKS).map(([key, pack]) => ({ key, ...pack }));
  }

  async getBalance(userId) {
    const user = await this.users.findById(userId);
    return user?.marketplaceBalance || 0; // in cents
  }

  async addCredits(userId, packKey, paymentReference) {
    const pack = CREDIT_PACKS[packKey];
    if (!pack) throw new AppError("Invalid credit pack.", 422, "INVALID_CREDIT_PACK");

    const tx = await this.creditTransactions.create({
      userId,
      type: "purchase",
      packKey,
      credits: pack.credits,
      priceCents: pack.priceCents,
      paymentReference: paymentReference || "",
      status: "completed",
      createdAt: new Date().toISOString()
    });

    const user = await this.users.findById(userId);
    const currentBalance = user?.marketplaceBalance || 0;
    await this.users.upsert(userId, {
      email: user?.email || "",
      role: user?.role || "user",
      marketplaceBalance: currentBalance + pack.priceCents
    });

    return { transaction: tx, newBalance: currentBalance + pack.priceCents };
  }

  async deductCredits(userId, amountCents, reason) {
    const user = await this.users.findById(userId);
    const currentBalance = user?.marketplaceBalance || 0;
    if (currentBalance < amountCents) {
      throw new AppError("Insufficient balance. Purchase a credit pack to continue.", 402, "INSUFFICIENT_BALANCE");
    }

    const tx = await this.creditTransactions.create({
      userId,
      type: "spend",
      amountCents,
      reason: reason || "lead_purchase",
      status: "completed",
      createdAt: new Date().toISOString()
    });

    await this.users.upsert(userId, {
      email: user?.email || "",
      role: user?.role || "user",
      marketplaceBalance: currentBalance - amountCents
    });

    return { transaction: tx, newBalance: currentBalance - amountCents };
  }

  async getStatement(userId) {
    const transactions = await this.creditTransactions.list({
      where: [{ field: "userId", op: "==", value: userId }],
      limit: 100,
      orderBy: "createdAt"
    });
    const user = await this.users.findById(userId);
    return {
      balance: user?.marketplaceBalance || 0,
      transactions: transactions.reverse()
    };
  }
}