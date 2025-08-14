import { Suspense } from "react";
import CheckoutClient from "./checkoutClient";

export const dynamic = "force-dynamic";

type Plan = "starter" | "pro";
type SP = Record<string, string | string[] | undefined>;

// In an async page, Next expects a Promise here.
type PageProps = {
  searchParams: Promise<SP>;
};

export default async function CheckoutPage({ searchParams }: PageProps) {
  const sp = await searchParams;               // <- await the promise
  const raw = sp.plan;
  const planValue = Array.isArray(raw) ? raw?.[0] : raw;
  const plan: Plan = planValue === "pro" ? "pro" : "starter";

  return (
    <main className="px-6 py-8">
      <h1 className="text-xl font-bold mb-4">Checkout</h1>
      <p className="mb-2">
        Plan: <strong>{plan}</strong>
      </p>

      <Suspense fallback={<p>Loading…</p>}>
        <CheckoutClient plan={plan} />
      </Suspense>
    </main>
  );
}

