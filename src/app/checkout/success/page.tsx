export const dynamic = "force-dynamic";

type SP = Record<string, string | string[] | undefined>;

export default async function SuccessPage({
  searchParams,
}: {
  searchParams?: SP | Promise<SP>;
}) {
  const sp = (await searchParams) ?? {};
  const sessionId = Array.isArray(sp.session_id) ? sp.session_id[0] : sp.session_id;

  return (
    <main className="px-6 py-16">
      <h1 className="text-2xl font-bold">Payment successful 🎉</h1>
      <p className="mt-2 text-slate-700">
        Thanks! Your subscription is now active.
      </p>

      {sessionId && (
        <p className="mt-4 text-sm text-slate-500">
          Session: <span className="font-mono">{sessionId}</span>
        </p>
      )}

      <a
        href="/app"
        className="mt-6 inline-flex rounded-xl bg-slate-900 px-5 py-3 text-white hover:opacity-90"
      >
        Go to the app
      </a>
    </main>
  );
}
