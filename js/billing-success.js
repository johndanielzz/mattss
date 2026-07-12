import { apiFetch, hasUsableToken, redirectToLogin, setCurrentUser, setToken } from "./api.js";

const PENDING_PAYPAL_CHECKOUT_KEY = "mat_pending_paypal_checkout";

function readPendingCheckout() {
  try {
    return JSON.parse(localStorage.getItem(PENDING_PAYPAL_CHECKOUT_KEY) || "null");
  } catch {
    return null;
  }
}

function setStatus(message, state = "info") {
  const target = document.querySelector("[data-billing-status]");
  if (!target) return;
  target.textContent = message;
  target.classList.toggle("error", state === "error");
  target.classList.toggle("success", state === "success");
}

function paymentReturnPayload() {
  const params = new URLSearchParams(window.location.search);
  const pending = readPendingCheckout();

  return {
    plan: pending?.plan || params.get("plan") || "",
    sessionId: pending?.sessionId || params.get("session") || "",
    paypalToken: params.get("token") || "",
    payerId: params.get("PayerID") || params.get("payerId") || "",
    transactionId: params.get("tx") || params.get("transaction_id") || params.get("paymentId") || ""
  };
}

async function confirmPaymentReturn() {
  if (!hasUsableToken()) {
    redirectToLogin();
    return;
  }

  const payload = paymentReturnPayload();
  if (!payload.plan || !payload.sessionId) {
    setStatus("We could not find the checkout session for this payment. Please return to pricing and start checkout again.", "error");
    return;
  }

  try {
    const result = await apiFetch("/api/billing/paypal/confirm", {
      method: "POST",
      body: JSON.stringify(payload)
    });

    if (result.accessToken) setToken(result.accessToken);
    if (result.user) setCurrentUser(result.user);
    localStorage.removeItem(PENDING_PAYPAL_CHECKOUT_KEY);

    const planName = result.plan?.name || result.user?.planName || "Your plan";
    setStatus(`${planName} is active. Redirecting to your dashboard...`, "success");
    setTimeout(() => {
      window.location.href = "/dashboard.html";
    }, 1600);
  } catch (error) {
    setStatus(error.message || "Payment confirmation failed. Please contact support with your PayPal receipt.", "error");
  }
}

document.addEventListener("DOMContentLoaded", confirmPaymentReturn);
