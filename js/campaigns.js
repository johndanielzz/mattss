import { apiFetch, byId, getCurrentUser, requireAuth, setCurrentUser } from "./api.js";

function escapeHtml(value) {
  if (value == null) return "";
  return String(value).replace(/[&<>"']/g, function(c) {
    if (c === "&") return String.fromCharCode(38) + "amp;";
    if (c === "<") return String.fromCharCode(38) + "lt;";
    if (c === ">") return String.fromCharCode(38) + "gt;";
    if (c === "\"") return String.fromCharCode(38) + "quot;";
    if (c === "'") return String.fromCharCode(38) + "#39;";
    return c;
  });
}

function statusClass(status) {
  if (status === "completed") return "success";
  if (status === "sending") return "warning";
  if (status === "draft") return "";
  return "";
}

function renderCampaign(c) {
  var statusLabel = c.status || "draft";
  var sent = c.sentCount || 0;
  var total = c.totalLeads || 0;
  var canLaunch = statusLabel === "draft" && total > 0;
  return '<div class="audit-item" style="flex-wrap:wrap;">' +
    '<div style="flex:1;min-width:200px;">' +
      '<strong>' + escapeHtml(c.name || "Untitled") + '</strong><br>' +
      '<span style="font-size:0.85rem;color:var(--muted);">' + escapeHtml(c.subject || "") + '</span>' +
    '</div>' +
    '<div style="text-align:right;">' +
      '<span class="status-pill ' + statusClass(statusLabel) + '">' + escapeHtml(statusLabel) + '</span><br>' +
      '<span style="font-size:0.85rem;">' + sent + ' / ' + total + ' sent</span>' +
    '</div>' +
    (canLaunch ? '<div style="width:100%;margin-top:8px;"><button class="btn btn-primary" type="button" data-launch-campaign="' + escapeHtml(c.id) + '">🚀 Launch Campaign</button></div>' : '') +
  '</div>';
}

async function loadCampaigns() {
  var list = byId("campaignList");
  if (!list) return;
  if (!requireAuth()) return;

  try {
    var result = await apiFetch("/api/campaigns");
    var campaigns = result.campaigns || [];
    if (campaigns.length === 0) {
      list.innerHTML = '<div class="empty-state">No campaigns yet. Click "+ New Campaign" to create your first AI outreach campaign.</div>';
    } else {
      list.innerHTML = '<div class="audit-list">' + campaigns.map(renderCampaign).join("") + '</div>';
    }
  } catch (e) {
    list.innerHTML = '<div class="error-state">' + escapeHtml(e.message) + '</div>';
  }
}

async function loadStats() {
  try {
    var result = await apiFetch("/api/campaigns/stats");
    var stats = result.stats || {};
    byId("statTotal").textContent = stats.totalCampaigns || 0;
    byId("statSent").textContent = stats.totalSent || 0;
    byId("statReplies").textContent = stats.replyRate ? stats.replyRate + "%" : "0%";
  } catch (e) {
    // Stats are optional
  }
}

async function loadLeadsForSelector() {
  var container = byId("leadSelector");
  if (!container) return;

  // Check if a lead was passed via URL (from "Campaign" button on lead card)
  var params = new URLSearchParams(window.location.search);
  var preSelectedLeadId = params.get("addLead");

  try {
    var result = await apiFetch("/api/crm/leads");
    var leads = result.leads || [];
    var withEmail = leads.filter(function(l) { return l.email || l.details?.contact?.email; });
    if (withEmail.length === 0) {
      container.innerHTML = '<div class="empty-state" style="min-height:60px;">No leads with email addresses found. Save leads with contact info first.</div>';
      return;
    }
    container.innerHTML = withEmail.map(function(l) {
      var email = l.email || l.details?.contact?.email || "";
      var checked = l.id === preSelectedLeadId || localLeadIdMatches(l.id, preSelectedLeadId) ? " checked" : "";
      return '<label style="display:flex;align-items:center;gap:8px;padding:6px 4px;border-bottom:1px solid var(--border);">' +
        '<input type="checkbox" value="' + escapeHtml(l.id) + '" class="lead-checkbox"' + checked + '>' +
        '<span><strong>' + escapeHtml(l.name || "Unknown") + '</strong> - ' + escapeHtml(email) + '</span>' +
        '</label>';
    }).join("");

    // Also try to load local saved leads and add them
    try {
      var localData = JSON.parse(localStorage.getItem("mat_local_saved_leads_v1") || "[]");
      var localWithEmail = Array.isArray(localData) ? localData.filter(function(l) { return l.email || l.details?.contact?.email; }) : [];
      if (localWithEmail.length > 0) {
        var localHtml = localWithEmail.map(function(l) {
          var lid = localLeadId(l);
          var email = l.email || l.details?.contact?.email || "";
          var checked = lid === preSelectedLeadId ? " checked" : "";
          return '<label style="display:flex;align-items:center;gap:8px;padding:6px 4px;border-bottom:1px solid var(--border);background:var(--surface-2);">' +
            '<input type="checkbox" value="' + escapeHtml(lid) + '" class="lead-checkbox"' + checked + '>' +
            '<span><strong>' + escapeHtml(l.name || "Unknown") + '</strong> (local) - ' + escapeHtml(email) + '</span>' +
            '</label>';
        }).join("");
        container.innerHTML += '<div style="margin-top:8px;font-size:0.85rem;color:var(--muted);font-weight:750;">Local Saved Leads:</div>' + localHtml;
      }
    } catch (e2) {
      // ignore
    }
  } catch (e) {
    container.innerHTML = '<div class="error-state">' + escapeHtml(e.message) + '</div>';
  }
}

function localLeadId(lead) {
  return String(lead.id || (lead.name || "lead") + "-" + (lead.address || "") + "-" + (lead.googleMapsLink || ""))
    .toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 180) || "lead-" + Date.now();
}

function localLeadIdMatches(id1, id2) {
  if (!id1 || !id2) return false;
  var n1 = String(id1).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  var n2 = String(id2).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  return n1 === n2;
}

function initGenerateTemplate() {
  var genBtn = byId("generateTemplateBtn");
  var templateField = byId("campaignTemplate");
  if (!genBtn || !templateField) return;

  genBtn.addEventListener("click", async function() {
    genBtn.disabled = true;
    genBtn.textContent = "Generating...";
    try {
      var result = await apiFetch("/api/ai/chat", {
        method: "POST",
        body: JSON.stringify({
          prompt: "Write a professional cold email template for a marketing agency reaching out to local businesses. The email should: 1) Mention you found their business online, 2) Offer a free website audit, 3) Suggest a 10-minute call. Use placeholders {name} for business name, {business} for business type, {sender} for sender name. Keep it under 150 words. Return ONLY the HTML email body."
        })
      });
      var content = result.content || result.message || "";
      // Clean up markdown code blocks if present
      content = content.replace(/```html/g, "").replace(/```/g, "").trim();
      if (content) {
        templateField.value = content;
      } else {
        templateField.value = '<p>Hi {name},</p><p>I came across {business} and noticed there may be an opportunity to improve how customers find you online.</p><p>I specialize in helping local businesses get more calls, bookings, and website traffic.</p><p>Would you be open to a quick chat this week?</p><p>Best regards,<br>{sender}</p>';
      }
    } catch (e) {
      // Fallback template
      templateField.value = '<p>Hi {name},</p><p>I came across {business} and noticed there may be an opportunity to improve how customers find you online.</p><p>I specialize in helping local businesses get more calls, bookings, and website traffic.</p><p>Would you be open to a quick chat this week?</p><p>Best regards,<br>{sender}</p>';
    } finally {
      genBtn.disabled = false;
      genBtn.textContent = "🤖 Generate with AI";
    }
  });
}

function initLaunchCampaigns() {
  document.addEventListener("click", async function(e) {
    var launchBtn = e.target.closest("[data-launch-campaign]");
    if (!launchBtn) return;
    if (!requireAuth()) return;

    var campaignId = launchBtn.dataset.launchCampaign;
    var status = byId("campaignStatus");

    launchBtn.disabled = true;
    launchBtn.textContent = "Launching...";

    try {
      var result = await apiFetch("/api/campaigns/" + encodeURIComponent(campaignId) + "/launch", {
        method: "POST"
      });
      if (status) status.textContent = result.message || "Campaign launched!";
      loadCampaigns();
      loadStats();
    } catch (e) {
      if (status) status.textContent = e.message;
      launchBtn.disabled = false;
      launchBtn.textContent = "🚀 Launch Campaign";
    }
  });
}

function initCampaignModal() {
  var modal = byId("campaignModal");
  var newBtn = byId("newCampaignBtn");
  var cancelBtn = byId("cancelCampaignBtn");
  var saveBtn = byId("saveCampaignBtn");
  if (!modal || !newBtn || !cancelBtn || !saveBtn) return;

  newBtn.addEventListener("click", function() {
    modal.style.display = "flex";
    byId("campaignName").value = "";
    byId("campaignSubject").value = "Quick website idea for {name}";
    byId("campaignTemplate").value = "";
    loadLeadsForSelector();
  });

  cancelBtn.addEventListener("click", function() {
    modal.style.display = "none";
  });

  modal.addEventListener("click", function(e) {
    if (e.target === modal) modal.style.display = "none";
  });

  saveBtn.addEventListener("click", async function() {
    var name = byId("campaignName").value.trim();
    var subject = byId("campaignSubject").value.trim();
    var template = byId("campaignTemplate").value.trim();
    var selectedLeads = Array.from(document.querySelectorAll(".lead-checkbox:checked")).map(function(cb) { return cb.value; });

    if (!name || !subject || !template) {
      byId("campaignStatus").textContent = "Please fill in all fields.";
      return;
    }
    if (selectedLeads.length === 0) {
      byId("campaignStatus").textContent = "Please select at least one lead.";
      return;
    }

    saveBtn.disabled = true;
    saveBtn.textContent = "Creating...";

    try {
      await apiFetch("/api/campaigns", {
        method: "POST",
        body: JSON.stringify({ name: name, subject: subject, template: template, leadIds: selectedLeads })
      });
      modal.style.display = "none";
      byId("campaignStatus").textContent = "Campaign created! Click 'Launch Campaign' to start sending.";
      loadCampaigns();
      loadStats();
    } catch (e) {
      byId("campaignStatus").textContent = e.message;
    } finally {
      saveBtn.disabled = false;
      saveBtn.textContent = "Create Campaign";
    }
  });
}

document.addEventListener("DOMContentLoaded", function() {
  initCampaignModal();
  initGenerateTemplate();
  initLaunchCampaigns();
  loadCampaigns();
  loadStats();
});