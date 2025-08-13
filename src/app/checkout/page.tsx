'use client';

import { captureEvent } from '@/lib/posthog';

export default function CheckoutPage({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  // normalize ?plan=... (string | string[] | undefined) -> 'starter' | 'pro'
  const raw = searchParams?.['plan'];
  const planStr = Array.isArray(raw) ? raw[0] : raw;
  const plan: 'starter' | 'pro' = planStr === 'pro' ? 'pro' : 'starter';

  function startCheckout() {
    captureEvent('checkout_started', { plan, currency: 'usd', price_id: 'price_placeholder' });
    alert(`Checkout started for ${plan}. Replace with Stripe Checkout session.`);
  }

  return (
    <main className="font-sans p-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Checkout</h1>
      <p className="mb-4">
        Plan: <strong>{plan}</strong>
      </p>
      <button className="border px-4 py-2" onClick={startCheckout}>
        Start Checkout
      </button>
    </main>
  );
}
