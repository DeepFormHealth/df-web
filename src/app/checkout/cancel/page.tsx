export const dynamic = "force-dynamic";

type SP = Record<string, string | string[] | undefined>;

export default async function CancelPage({
  searchParams,
}: {
  searchParams?: SP | Promise<SP>;
}) {
  const sp = (await searchParams) ?? {};
  const reason = Array.isArray(sp.reason) ? sp.reason[0] : sp.reason;

  return (
    <main className="px-6 py-16">
      <h1 className="text-2xl font-bold">Checkout canceled</h1>
      <p className="mt-2 text-slate-700">
        No charge was made{reason ? ` (${reason})` : ""}. You can try again anytime.
      </p>

      <a
        href="/pricing"
        className="mt-6 inline-flex rounded-xl bg-slate-900 px-5 py-3 text-white hover:opacity-90"
      >
        Back to pricing
      </a>
    </main>
  );
}
