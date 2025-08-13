// src/app/checkout/CheckoutClient.tsx
"use client";

import { captureEvent } from "@/lib/posthog";

export default function CheckoutClient({ plan }: { plan: "starter" | "pro" }) {
  function startCheckout() {
    captureEvent("checkout_started", {
      plan,
      currency: "usd",
      price_id: "price_placeholder",
    });
    alert(`Checkout started for ${plan}. Replace with Stripe Checkout session.`);
    // TODO: call your /api/checkout to create a Stripe Checkout session and redirect
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
