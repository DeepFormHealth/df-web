"use client";

import { useState } from "react";

type Plan = "starter" | "pro";

export default function CheckoutClient({ plan }: { plan: Plan }) {
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  async function startCheckout() {
    try {
      setLoading(true);
      setErr(null);

      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan }),
      });

      const data = await res.json();
      if (!res.ok || !data?.url) throw new Error(data?.error ?? "create_session_failed");

      window.location.href = data.url as string;
    } catch (e: any) {
      setErr(e?.message ?? "unknown_error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mt-4">
      <button
        className="border px-4 py-2 rounded"
        onClick={startCheckout}
        disabled={loading}
      >
        {loading ? "Redirecting…" : "Start Checkout"}
      </button>

      {err && <p className="mt-3 text-sm text-red-600">Checkout failed: {err}</p>}
    </div>
  );
}
