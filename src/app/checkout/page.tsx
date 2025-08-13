import { Suspense } from "react";
import CheckoutClient from "./checkoutClient";

type SearchParams = { [key: string]: string | string[] | undefined };

export default function CheckoutPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const raw = searchParams.plan;
  const plan =
    (Array.isArray(raw) ? raw[0] : raw) === "pro" ? "pro" : "starter";

  return (
    <Suspense fallback={<div>Loading…</div>}>
      <CheckoutClient plan={plan} />
    </Suspense>
  );
}
