"use client";

import { useState } from "react";

type Plan = "starter" | "pro";

export default function CheckoutClient({ plan }: { plan: Plan }) {
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  async function startCheckout() {
    setLoading(true);
    setErr(null);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.error || "create_session_failed");
      }

      const { url } = await res.json();
      if (!url) throw new Error("missing_stripe_key");
      window.location.href = url;
    } catch (e: any) {
      setErr(e?.message || "unknown_error");
      setLoading(false);
    }
  }

  return (
    <div className="space-y-3">
      <button
        onClick={startCheckout}
        disabled={loading}
        className="rounded-md border px-4 py-2"
      >
        {loading ? "Redirecting…" : "Start Checkout"}
      </button>
      {err && <p className="text-sm text-red-600">Checkout failed: {err}</p>}
    </div>
  );
}
