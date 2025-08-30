"use client";
import { supabaseBrowser } from "@/lib/supabase-browser";

export default function PricingPage() {
  async function handleSubscribe(plan: "starter" | "pro") {
    const { data } = await supabaseBrowser.auth.getUser();
    const user = data.user;
    if (!user) {
      alert("Please log in first");
      return;
    }

    const res = await fetch("/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ plan, userId: user.id }),
    });

    const out = await res.json();
    if (out.url) {
      window.location.href = out.url; // redirect to Stripe Checkout
    } else {
      alert("Checkout failed");
    }
  }

  return (
    <main className="px-6 py-16">
      <h1 className="text-2xl font-bold mb-6">Pricing</h1>
      <p className="mb-8 text-slate-600">Simple monthly plans. Cancel anytime.</p>

      <div className="flex gap-6">
        <button
          onClick={() => handleSubscribe("starter")}
          className="rounded-xl bg-slate-900 px-6 py-3 text-white hover:opacity-80"
        >
          Subscribe Starter
        </button>

        <button
          onClick={() => handleSubscribe("pro")}
          className="rounded-xl bg-slate-900 px-6 py-3 text-white hover:opacity-80"
        >
          Subscribe Pro
        </button>
      </div>
    </main>
  );
}
