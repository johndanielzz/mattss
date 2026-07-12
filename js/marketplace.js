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

var currentPage = 1;

function renderListing(l) {
  var score = l.leadScore || 0;
  var scoreClass = score >= 80 ? "hot" : score >= 55 ? "high" : score >= 30 ? "warning" : "low";
  return '<article class="lead-card">' +
    '<div class="lead-card__top">' +
      '<div><h3>' + escapeHtml(l.leadName || "Business") + '</h3>' +
      '<p>' + escapeHtml(l.leadBusinessType || "Local business") + ' - ' + escapeHtml(l.leadAddress || "Address N/A") + '</p></div>' +
      '<span class="score-pill ' + scoreClass + '">' + score + '/100</span>' +
    '</div>' +
    '<div class="lead-meta">' +
      (l.leadPhone ? '<span class="tag">' + escapeHtml(l.leadPhone) + '</span>' : '') +
      (l.leadEmail ? '<span class="tag success">Email</span>' : '<span class="tag">No email</span>') +
      (l.leadWebsiteUrl ? '<span class="tag">Website</span>' : '<span class="tag warning">No website</span>') +
    '</div>' +
    '<div class="lead-actions">' +
      '<span style="font-size:1.2rem;font-weight:750;">$' + escapeHtml(l.priceDollars || "0.00") + '</span>' +
      '<button class="btn btn-primary" type="button" data-buy-lead="' + escapeHtml(l.id) + '">Buy Lead</button>' +
    '</div>' +
  '</article>';
}

async function loadMarketplace() {
  var container = byId("marketplaceListings");
  var pagination = byId("marketplacePagination");
  if (!container) return;
  if (!requireAuth()) return;

  var search = byId("marketplaceSearch")?.value || "";
  var minScore = byId("marketplaceMinScore")?.value || 0;

  try {
    var url = "/api/marketplace/listings?page=" + currentPage + "&minScore=" + minScore;
    if (search) url += "&businessType=" + encodeURIComponent(search);
    var result = await apiFetch(url);
    var listings = result.listings || [];

    if (listings.length === 0) {
      container.innerHTML = '<div class="empty-state">No leads available for sale right now. Check back later or run a search and list your own leads.</div>';
    } else {
      container.innerHTML = '<div class="leads-grid">' + listings.map(renderListing).join("") + '</div>';
    }

    if (pagination) {
      var totalPages = result.totalPages || 1;
      pagination.innerHTML = '';
      if (totalPages > 1) {
        pagination.innerHTML = '<button class="btn btn-secondary" type="button" data-mp-page="prev" ' + (currentPage <= 1 ? 'disabled' : '') + '>Previous</button>' +
          '<span class="pagination-status">Page ' + currentPage + ' of ' + totalPages + '</span>' +
          '<button class="btn btn-primary" type="button" data-mp-page="next" ' + (currentPage >= totalPages ? 'disabled' : '') + '>Next</button>';
      }
    }
  } catch (e) {
    container.innerHTML = '<div class="error-state">' + escapeHtml(e.message) + '</div>';
  }
}

async function loadStats() {
  try {
    var result = await apiFetch("/api/marketplace/stats");
    var seller = result.seller || {};
    byId("statListings").textContent = seller.activeListings || 0;
    byId("statSold").textContent = seller.soldCount || 0;
    byId("statEarned").textContent = "$" + (seller.totalEarnedDollars || "0.00");

    var user = getCurrentUser();
    var balance = user?.marketplaceBalance || 0;
    byId("balanceDisplay").textContent = "Balance: $" + (balance / 100).toFixed(2);
  } catch (e) {
    // Stats optional
  }
}

function initMarketplaceEvents() {
  document.addEventListener("click", async function(e) {
    var buyBtn = e.target.closest("[data-buy-lead]");
    var pageBtn = e.target.closest("[data-mp-page]");
    var refreshBtn = e.target.closest("#refreshMarketplaceBtn");

    if (buyBtn) {
      var listingId = buyBtn.dataset.buyLead;
      buyBtn.disabled = true;
      buyBtn.textContent = "Buying...";
      try {
        var result = await apiFetch("/api/marketplace/buy/" + encodeURIComponent(listingId), { method: "POST" });
        byId("marketplaceStatus").textContent = "Lead purchased successfully! Check your CRM.";
        loadMarketplace();
        loadStats();
      } catch (e) {
        byId("marketplaceStatus").textContent = e.message;
        buyBtn.disabled = false;
        buyBtn.textContent = "Buy Lead";
      }
      return;
    }

    if (pageBtn) {
      if (pageBtn.dataset.mpPage === "next") currentPage++;
      else currentPage = Math.max(1, currentPage - 1);
      loadMarketplace();
      return;
    }

    if (refreshBtn) {
      currentPage = 1;
      loadMarketplace();
      loadStats();
    }
  });

  var searchInput = byId("marketplaceSearch");
  var scoreSelect = byId("marketplaceMinScore");
  if (searchInput) searchInput.addEventListener("input", function() { currentPage = 1; loadMarketplace(); });
  if (scoreSelect) scoreSelect.addEventListener("change", function() { currentPage = 1; loadMarketplace(); });
}

document.addEventListener("DOMContentLoaded", function() {
  initMarketplaceEvents();
  loadMarketplace();
  loadStats();
});