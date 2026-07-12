import { apiFetch, hasUsableToken, requireAuth } from "./api.js";

const PENDING_PAYPAL_CHECKOUT_KEY = "mat_pending_paypal_checkout";

function rememberPaypalCheckout(result) {
  if (!result?.sessionId || !result?.plan?.key) return;
  localStorage.setItem(PENDING_PAYPAL_CHECKOUT_KEY, JSON.stringify({
    provider: "paypal",
    sessionId: result.sessionId,
    plan: result.plan.key,
    planName: result.plan.name,
    returnUrl: result.returnUrl,
    startedAt: new Date().toISOString()
  }));
}

async function initOwnerPricingState() {
  if (!hasUsableToken()) return;

  try {
    const result = await apiFetch("/api/auth/me");
    if (result.user?.role !== "admin" && !result.user?.entitlements?.unlimitedAccess) return;

    document.querySelectorAll("[data-stripe-plan], [data-paypal-plan]").forEach((button) => {
      button.disabled = true;
      button.textContent = "Included";
    });

    const header = document.querySelector(".section-header p");
    if (header) {
      header.textContent = "Admin unlimited access is active. All plans, lead volume, CRM, reports, admin, analytics, billing, and AI workflows are unlocked.";
    }
  } catch {
    // Keep pricing usable for anonymous visitors.
  }
}

function initBillingButtons() {
  document.addEventListener("click", async (event) => {
    const stripeButton = event.target.closest("[data-stripe-plan]");
    const paypalButton = event.target.closest("[data-paypal-plan]");
    const creditButton = event.target.closest("[data-credit-pack]");
    const weeklyButton = event.target.closest("[data-weekly-plan]");

    // Handle credit pack purchase
    if (creditButton) {
      if (!requireAuth()) return;
      const packKey = creditButton.dataset.creditPack;
      const original = creditButton.textContent;
      creditButton.disabled = true;
      creditButton.textContent = "Processing...";
      try {
        const result = await apiFetch("/api/credits/purchase", {
          method: "POST",
          body: JSON.stringify({ packKey })
        });
        creditButton.textContent = "Purchased!";
        var status = document.querySelector("[data-pricing-status]");
        if (status) status.textContent = "Credits added to your account. Go to Marketplace to buy leads.";
        setTimeout(function() {
          creditButton.textContent = original;
          creditButton.disabled = false;
        }, 2000);
      } catch (e) {
        creditButton.textContent = e.message;
        setTimeout(function() {
          creditButton.textContent = original;
          creditButton.disabled = false;
        }, 2000);
      }
      return;
    }

    // Handle weekly subscription
    if (weeklyButton) {
      if (!requireAuth()) return;
      var planKey = weeklyButton.dataset.weeklyPlan;
      weeklyButton.disabled = true;
      weeklyButton.textContent = "Opening...";
      // Redirect to a subscription setup page or show modal
      window.location.href = "/settings.html?subscribe=" + planKey;
      return;
    }

    if (!stripeButton && !paypalButton) return;

    const button = stripeButton || paypalButton;
    if (!requireAuth()) return;
    const provider = stripeButton ? "stripe/payment-intent" : "paypal/order";
    const original = button.textContent;
    button.disabled = true;
    button.textContent = "Preparing...";

    try {
      const result = await apiFetch(`/api/billing/${provider}`, {
        method: "POST",
        headers: { "Idempotency-Key": crypto.randomUUID() },
        body: JSON.stringify({ plan: button.dataset.stripePlan || button.dataset.paypalPlan })
      });
      const checkoutUrl = result.approvalUrl || result.checkoutUrl;
      if (paypalButton && checkoutUrl) {
        rememberPaypalCheckout(result);
        button.textContent = "Opening PayPal...";
        window.location.href = checkoutUrl;
        return;
      }
      button.textContent = result.message || "Ready";
    } catch (error) {
      button.textContent = error.message;
      setTimeout(() => {
        button.textContent = original;
        button.disabled = false;
      }, 1800);
    }
  });
}

document.addEventListener("DOMContentLoaded", initBillingButtons);
document.addEventListener("DOMContentLoaded", initOwnerPricingState);