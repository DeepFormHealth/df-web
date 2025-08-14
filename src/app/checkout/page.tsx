export const dynamic = "force-dynamic"; // avoid static prerender complaints

type Plan = "starter" | "pro";

type PageProps = {
  searchParams?: { plan?: string | string[] | undefined };
};

import CheckoutClient from "./checkout-Client";

export default function CheckoutPage({ searchParams }: PageProps) {
  const raw = searchParams?.plan;
  const plan: Plan = Array.isArray(raw)
    ? raw[0] === "pro"
      ? "pro"
      : "starter"
    : raw === "pro"
      ? "pro"
      : "starter";

  return (
    <main className="px-6 py-8">
      <h1 className="text-xl font-bold mb-4">Checkout</h1>
      <p className="mb-2">
        Plan: <strong>{plan}</strong>
      </p>

      {/* Client side kickoff for Stripe session */}
      <CheckoutClient plan={plan} />
    </main>
  );
}
