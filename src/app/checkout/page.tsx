import { Suspense } from "react";
import CheckoutClient from "./checkoutClient";

export const dynamic = "force-dynamic";

type SP = Record<string, string | string[] | undefined>;

export default async function CheckoutPage({
  searchParams,
}: {
  searchParams?: SP | Promise<SP>;
}) {
  const sp = (await searchParams) ?? {};
  const raw = sp.plan;
  const plan = (Array.isArray(raw) ? raw[0] : raw) ?? "starter";

  // Keep TS happy with a literal union type
  const normalizedPlan: "starter" | "pro" = plan === "pro" ? "pro" : "starter";

  return (
    <main className="px-6 py-8">
      <h1 className="text-xl font-bold mb-4">Checkout</h1>
      <p>
        Plan: <strong>{normalizedPlan}</strong>
      </p>

      <Suspense fallback={<p>Loading…</p>}>
        <CheckoutClient plan={normalizedPlan} />
      </Suspense>
    </main>
  );
}
