'use client';

import { captureEvent } from '@/lib/posthog';

export default function PricingPage() {
  return (
    <main className="font-sans p-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-2">Pricing</h1>
      <p className="mb-6">Choose a plan to get started.</p>

      <div className="flex gap-4 flex-wrap">
        <button
          className="border px-4 py-2"
          onClick={() => {
            captureEvent('plan_selected', { plan: 'starter', billing: 'monthly' });
            window.location.href = '/signup?plan=starter';
          }}
        >
          Select Starter — $29/mo
        </button>

        <button
          className="border px-4 py-2"
          onClick={() => {
            captureEvent('plan_selected', { plan: 'pro', billing: 'monthly' });
            window.location.href = '/signup?plan=pro';
          }}
        >
          Select Pro — $79/mo
        </button>
      </div>
    </main>
  );
}
