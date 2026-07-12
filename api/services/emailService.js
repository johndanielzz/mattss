import { env } from "../config/env.js";
import { AppError } from "../utils/errors.js";

export class EmailService {
  constructor() {
    this.apiKey = env.email.apiKey;
    this.fromEmail = env.email.fromEmail;
    this.fromName = env.email.fromName;
    this.provider = env.email.provider;
  }

  isConfigured() {
    return Boolean(this.apiKey && this.fromEmail);
  }

  async sendSingle({ to, subject, html, text }) {
    if (!this.isConfigured()) {
      throw new AppError("Email sending requires EMAIL_API_KEY in .env", 503, "EMAIL_NOT_CONFIGURED");
    }

    if (this.provider === "sendgrid") {
      return this._sendSendGrid({ to, subject, html, text });
    }
    // Default to Resend
    return this._sendResend({ to, subject, html, text });
  }

  async _sendResend({ to, subject, html, text }) {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${this.apiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        from: `${this.fromName} <${this.fromEmail}>`,
        to: Array.isArray(to) ? to : [to],
        subject,
        html: html || "",
        text: text || ""
      })
    });

    if (!response.ok) {
      const body = await response.text();
      throw new AppError(`Email send failed: ${body.slice(0, 200)}`, response.status, "EMAIL_SEND_FAILED");
    }
    return response.json();
  }

  async _sendSendGrid({ to, subject, html, text }) {
    const response = await fetch("https://api.sendgrid.com/v3/mail/send", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${this.apiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        personalizations: [{ to: [{ email: to }] }],
        from: { email: this.fromEmail, name: this.fromName },
        subject,
        content: [
          ...(html ? [{ type: "text/html", value: html }] : []),
          ...(text ? [{ type: "text/plain", value: text }] : [])
        ]
      })
    });

    if (!response.ok) {
      const body = await response.text();
      throw new AppError(`SendGrid email failed: ${body.slice(0, 200)}`, response.status, "EMAIL_SEND_FAILED");
    }
    return { id: response.headers.get("x-message-id") };
  }

  async sendBulk(recipients) {
    // recipients: [{ to, subject, html, text }]
    const results = [];
    for (const r of recipients) {
      try {
        const result = await this.sendSingle(r);
        results.push({ to: r.to, status: "sent", id: result.id });
      } catch (e) {
        results.push({ to: r.to, status: "failed", error: e.message });
      }
      // Rate limit: 5 emails per second
      await new Promise((resolve) => setTimeout(resolve, 200));
    }
    return results;
  }

  async sendCampaign(leads, campaign) {
    const { subject, template, senderName } = campaign;
    const results = [];
    const batchSize = 50;
    const delayMs = 1000;

    for (let i = 0; i < leads.length; i += batchSize) {
      const batch = leads.slice(i, i + batchSize);
      const batchResults = await Promise.allSettled(
        batch.map(async (lead) => {
          const personalizedSubject = subject
            .replace(/{name}/g, lead.name || "there")
            .replace(/{business}/g, lead.businessType || "business");
          const personalizedHtml = template
            .replace(/{name}/g, lead.name || "there")
            .replace(/{business}/g, lead.businessType || "business")
            .replace(/{phone}/g, lead.phone || "")
            .replace(/{website}/g, lead.websiteUrl || "your business");
          const email = lead.email || lead.details?.contact?.email;
          if (!email) return { lead: lead.name, status: "skipped", reason: "no email" };

          try {
            await this.sendSingle({
              to: email,
              subject: personalizedSubject,
              html: personalizedHtml
            });
            return { lead: lead.name, email, status: "sent" };
          } catch (e) {
            return { lead: lead.name, email, status: "failed", error: e.message };
          }
        })
      );
      results.push(...batchResults.map((r) => r.value || r.reason));
      if (i + batchSize < leads.length) {
        await new Promise((resolve) => setTimeout(resolve, delayMs));
      }
    }
    return results;
  }
}