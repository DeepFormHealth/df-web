// src/app/checkout/page.tsx
import CheckoutClient from "./checkoutClient";

type SearchParamsObj = { [key: string]: string | string[] | undefined };

export default async function CheckoutPage({
  searchParams,
}: {
  // Next 15 may pass this as a Promise
  searchParams?: Promise<SearchParamsObj> | SearchParamsObj;
}) {
  const sp =
    typeof searchParams === "object" && searchParams !== null && "then" in searchParams
      ? await (searchParams as Promise<SearchParamsObj>)
      : (searchParams as SearchParamsObj | undefined);

  const raw = sp?.plan;
  const plan = (Array.isArray(raw) ? raw[0] : raw) === "pro" ? "pro" : "starter";

  return <CheckoutClient plan={plan} />;
}
