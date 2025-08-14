"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";

export default function CheckoutPage() {
  const sp = useSearchParams();
  const plan = useMemo(() => {
    const raw = sp.get("plan");
    return raw === "pro" ? "pro" : "starter";
  }, [sp]);

  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  async function startCheckout() {
    try {
      setLoading(true);
      setErr(null);
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ plan }),
      });
      const data = await res.json();
      if (!res.ok) {
        setErr(data?.detail || data?.error || "create_session_failed");
        setLoading(false);
        return;
      }
      window.location.href = data.url as string;
    } catch (e: any) {
      setErr(e?.message || "network_error");
      setLoading(false);
    }
  }

  return (
    <main className="mx-auto max-w-xl px-6 py-16">
      <h1 className="text-2xl font-bold">Checkout</h1>
      <p className="mt-1 text-slate-600">
        Plan <span className="font-mono">{plan}</span>
      </p>
      <button
        onClick={startCheckout}
        disabled={loading}
        className="mt-4 rounded-lg border px-4 py-2 hover:bg-slate-50 disabled:opacity-50"
      >
        {loading ? "Redirecting…" : "Start Checkout"}
      </button>
      {err && <p className="mt-2 text-sm text-red-600">Checkout failed: {err}</p>}
    </main>
  );
}
