import { Suspense } from "react";
import CheckoutClient from "./checkoutClient";

export const dynamic = "force-dynamic"; // avoid static prerender complaints

type Plan = "starter" | "pro";

export default function CheckoutPage({
  searchParams,
}: {
  searchParams?: Record<string, string | string[] | undefined>;
}) {
  const raw = searchParams?.plan;
  const plan: Plan =
    Array.isArray(raw) ? (raw[0] === "pro" ? "pro" : "starter") : raw === "pro" ? "pro" : "starter";

  return (
    <main className="px-6 py-8">
      <h1 className="text-2xl font-bold mb-4">Checkout</h1>
      <p className="mb-1">
        Plan: <strong>{plan}</strong>
      </p>

      <Suspense fallback={<p>loading…</p>}>
        <CheckoutClient plan={plan} />
      </Suspense>
    </main>
  );
}
