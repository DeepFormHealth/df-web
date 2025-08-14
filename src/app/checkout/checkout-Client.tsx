"use client";

import { useState } from "react";

type Plan = "starter" | "pro";

export default function CheckoutClient({ plan }: { plan: Plan }) {
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  async function startCheckout() {
    try {
      setErr(null);
      setLoading(true);

      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ plan }),
      });

      const data = (await res.json()) as { url?: string; error?: string };

      if (!res.ok || !data?.url) {
        throw new Error(data?.error ?? "create_session_failed");
      }

      // Redirect to Stripe hosted checkout
      window.location.href = data.url;
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : "unknown_error";
      setErr(msg);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mt-4">
      <button
        className="border px-4 py-2"
        onClick={startCheckout}
        disabled={loading}
      >
        {loading ? "Redirecting…" : "Start Checkout"}
      </button>

      {err && (
        <p className="mt-3 text-sm text-red-600">
          Checkout failed: {err}
        </p>
      )}
    </div>
  );
}
