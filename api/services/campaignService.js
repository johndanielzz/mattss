import { FirestoreRepository } from "../repositories/firestoreRepository.js";
import { EmailService } from "./emailService.js";
import { NvidiaService } from "./nvidiaService.js";
import { AppError } from "../utils/errors.js";

export class CampaignService {
  constructor() {
    this.campaigns = new FirestoreRepository("campaigns");
    this.leads = new FirestoreRepository("leads");
    this.emailService = new EmailService();
    this.nvidiaService = new NvidiaService();
  }

  async create(userId, data) {
    const campaign = await this.campaigns.create({
      userId,
      name: data.name,
      subject: data.subject,
      template: data.template,
      leadIds: data.leadIds || [],
      status: "draft",
      totalLeads: data.leadIds?.length || 0,
      sentCount: 0,
      openCount: 0,
      replyCount: 0,
      createdAt: new Date().toISOString()
    });
    return campaign;
  }

  async getCampaign(id) {
    return this.campaigns.findById(id);
  }

  async listCampaigns(userId) {
    return this.campaigns.list({
      where: [{ field: "userId", op: "==", value: userId }],
      limit: 50,
      orderBy: "createdAt"
    });
  }

  async generateAITemplate(lead) {
    if (!this.nvidiaService.configured()) {
      return this._defaultTemplate(lead);
    }
    try {
      const prompt = `Write a short cold email (max 150 words) for a business named "${lead.name || "the business"}" that is a ${lead.businessType || "local business"}. The email should offer a free website audit and local SEO improvement. Be friendly and professional. Use {name} for the business name placeholder.`;
      const result = await this.nvidiaService.chat(prompt);
      return result.content || this._defaultTemplate(lead);
    } catch {
      return this._defaultTemplate(lead);
    }
  }

  _defaultTemplate(lead) {
    return `<p>Hi there,</p><p>I came across {name} and noticed there may be an opportunity to improve how customers find and contact you online.</p><p>I specialize in helping {business} businesses get more calls, bookings, and website traffic from Google Maps and local search.</p><p>Would you be open to a quick 10-minute chat to see if I can help?</p><p>Best regards,<br>{sender}</p>`;
  }

  async launch(campaignId, userId) {
    const campaign = await this.campaigns.findById(campaignId);
    if (!campaign || campaign.userId !== userId) {
      throw new AppError("Campaign not found.", 404, "CAMPAIGN_NOT_FOUND");
    }

    const leads = [];
    for (const leadId of campaign.leadIds) {
      const lead = await this.leads.findById(leadId);
      if (lead && (lead.email || lead.details?.contact?.email)) {
        leads.push(lead);
      }
    }

    if (leads.length === 0) {
      throw new AppError("No leads with email addresses found in this campaign.", 400, "NO_LEADS_WITH_EMAIL");
    }

    await this.campaigns.upsert(campaignId, { status: "sending", startedAt: new Date().toISOString() });

    // Send in background
    this._sendCampaignEmails(campaignId, leads, campaign).catch((err) => {
      console.error("Campaign send error:", err);
    });

    return { message: `Campaign launched. Sending to ${leads.length} leads.`, totalLeads: leads.length };
  }

  async _sendCampaignEmails(campaignId, leads, campaign) {
    let sentCount = 0;
    const emailConfigured = this.emailService.isConfigured();

    for (let i = 0; i < leads.length; i++) {
      const lead = leads[i];
      try {
        const email = lead.email || lead.details?.contact?.email;
        if (!email) continue;

        const subject = campaign.subject
          .replace(/{name}/g, lead.name || "there")
          .replace(/{business}/g, lead.businessType || "business");

        const html = campaign.template
          .replace(/{name}/g, lead.name || "there")
          .replace(/{business}/g, lead.businessType || "business")
          .replace(/{phone}/g, lead.phone || "")
          .replace(/{website}/g, lead.websiteUrl || "your business")
          .replace(/{sender}/g, "Your Marketing Team");

        if (emailConfigured) {
          await this.emailService.sendSingle({ to: email, subject, html });
        }
        sentCount++;

        // Update lead with outreach status
        await this.leads.upsert(lead.id, {
          ...lead,
          outreachStatus: "contacted",
          outreachDate: new Date().toISOString(),
          campaignId
        });
      } catch (e) {
        console.error(`Failed to send to ${lead.name}:`, e.message);
      }

      // Update progress every 10 sends
      if (i % 10 === 0) {
        await this.campaigns.upsert(campaignId, { sentCount });
      }

      // Rate limit: 200ms between sends
      await new Promise((resolve) => setTimeout(resolve, 200));
    }

    await this.campaigns.upsert(campaignId, {
      status: "completed",
      sentCount,
      completedAt: new Date().toISOString()
    });
  }

  async getStats(userId) {
    const campaigns = await this.listCampaigns(userId);
    const totalSent = campaigns.reduce((sum, c) => sum + (c.sentCount || 0), 0);
    const totalReplies = campaigns.reduce((sum, c) => sum + (c.replyCount || 0), 0);
    return {
      totalCampaigns: campaigns.length,
      totalSent,
      totalReplies,
      replyRate: totalSent > 0 ? ((totalReplies / totalSent) * 100).toFixed(1) : "0.0"
    };
  }
}