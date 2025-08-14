import { Suspense } from "react";
import CheckoutClient from "./CheckoutClient";

export const dynamic = "force-dynamic";

type PageProps = {
  searchParams?: { [key: string]: string | string[] | undefined };
};

export default function CheckoutPage({ searchParams }: PageProps) {
  const sp = searchParams ?? {};
  const raw = sp.plan;
  const plan = (Array.isArray(raw) ? raw[0] : raw) ?? "starter";

  return (
    <main className="px-6 py-8">
      <h1 className="text-xl font-bold mb-4">Checkout</h1>
      <p className="mb-4">
        Plan: <strong>{plan}</strong>
      </p>

      <Suspense fallback={<p>Loading…</p>}>
        <CheckoutClient plan={plan as "starter" | "pro"} />
      </Suspense>
    </main>
  );
}
