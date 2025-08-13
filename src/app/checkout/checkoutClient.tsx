// src/app/checkout/checkoutClient.tsx
"use client";

import { captureEvent } from "@/lib/posthog";

type Plan = "starter" | "pro";

export default function CheckoutClient({ plan }: { plan: Plan }) {
  function startCheckout() {
    captureEvent("checkout_started", {
      plan,
      currency: "usd",
      price_id: "price_placeholder",
    });

    // TODO: replace with real Stripe Checkout redirect
    alert(`Checkout started for ${plan}`);
  }

  return (
    <main className="font-sans p-6 max-w-3xl mx-auto">
      <h1 className="text-xl font-bold mb-4">Checkout</h1>
      <p className="mb-4">
        Plan: <strong>{plan}</strong>
      </p>
      <button className="border px-4 py-2" onClick={startCheckout}>
        Start Checkout
      </button>
    </main>
  );
}
