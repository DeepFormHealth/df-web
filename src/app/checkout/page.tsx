'use client';

import { captureEvent } from '@/lib/posthog';

type PageProps = {
  searchParams?: { plan?: string | string[] };
};

export default function CheckoutPage({ searchParams }: PageProps) {
  // Normalize possible array → string
  const raw = Array.isArray(searchParams?.plan)
    ? searchParams?.plan?.[0]
    : searchParams?.plan;

  const plan: 'starter' | 'pro' = raw === 'pro' ? 'pro' : 'starter';

  function startCheckout() {
    captureEvent('checkout_started', { plan, currency: 'usd', price_id: 'price_placeholder' });
    alert(`Checkout started for ${plan}. Replace with Stripe Checkout session.`);
  }

  return (
    <main className="font-sans p-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Checkout</h1>
      <p className="mb-4">Plan: <strong>{plan}</strong></p>
      <button className="border px-4 py-2" onClick={startCheckout}>Start Checkout</button>
    </main>
  );
}
