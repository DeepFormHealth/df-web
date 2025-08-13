// src/app/checkout/page.tsx
import CheckoutClient from "./checkoutClient";

type SearchParamsObj = { [key: string]: string | string[] | undefined };

export default async function CheckoutPage({
  searchParams,
}: {
  searchParams?: Promise<SearchParamsObj>;
}) {
  const sp = searchParams ? await searchParams : undefined;

  const raw = sp?.plan;
  const plan = (Array.isArray(raw) ? raw[0] : raw) === "pro" ? "pro" : "starter";

  return <CheckoutClient plan={plan} />;
}
