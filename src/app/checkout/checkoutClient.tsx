// src/app/checkout/checkoutClient.tsx
"use client";

import { useState } from "react";
import { captureEvent } from "@/lib/posthog";

type Plan = "starter" | "pro";

export default function CheckoutClient({ plan }: { plan: Plan }) {
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  async function startCheckout() {
    if (loading) return;
    setLoading(true);
    setErr(null);
    try {
      // optional analytics
      captureEvent("checkout_click", { plan });

      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({} as { error?: string }));
        throw new Error(data.error || `HTTP ${res.status}`);
      }

      const { url } = (await res.json()) as { url: string };
      if (!url) throw new Error("Missing redirect URL");
      window.location.href = url;
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Unknown error";
      setErr(msg);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="font-sans p-6 max-w-3xl mx-auto">
      <h1 className="text-xl font-bold mb-4">Checkout</h1>
      <p className="mb-4">
        Plan: <strong>{plan}</strong>
      </p>
      <button
        className="border px-4 py-2 disabled:opacity-50"
        onClick={startCheckout}
        disabled={loading}
      >
        {loading ? "Redirecting…" : "Start Checkout"}
      </button>
      {err && <p className="mt-3 text-sm">Checkout failed: {err}</p>}
    </main>
  );
}
