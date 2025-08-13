// src/app/checkout/page.tsx
import CheckoutClient from "./checkoutClient";

type SearchParamsObj = { [key: string]: string | string[] | undefined };

export default async function CheckoutPage({
  // Pragmatic fallback: Next 15 passes a Promise; we accept Promise<any>
  searchParams,
}: {
  searchParams?: Promise<any>;
}) {
  const sp: SearchParamsObj | undefined = searchParams ? await searchParams : undefined;

  const raw = sp?.plan;
  const plan = (Array.isArray(raw) ? raw[0] : raw) === "pro" ? "pro" : "starter";

  return <CheckoutClient plan={plan} />;
}
