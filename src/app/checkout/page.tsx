import { Suspense } from "react";
import CheckoutClient from "./checkoutClient";

type SearchParamsObj = { [key: string]: string | string[] | undefined };

interface PageProps {
  searchParams?: SearchParamsObj; // must be optional
}

export default function CheckoutPage({ searchParams }: PageProps) {
  const raw = searchParams?.plan;
  const plan = (Array.isArray(raw) ? raw[0] : raw) === "pro" ? "pro" : "starter";

  return (
    <Suspense fallback={<div>Loading…</div>}>
      <CheckoutClient plan={plan} />
    </Suspense>
  );
}