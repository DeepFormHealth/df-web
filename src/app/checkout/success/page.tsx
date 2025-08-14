export const dynamic = 'force-dynamic';

export default function SuccessPage({
  searchParams,
}: {
  searchParams?: Record<string, string | string[] | undefined>;
}) {
  const sp = searchParams ?? {};

  const sessionIdRaw = Array.isArray(sp.session_id) ? sp.session_id[0] : sp.session_id;
  const sessionId = typeof sessionIdRaw === 'string' ? sessionIdRaw : undefined;

  return (
    <main className="px-6 py-16">
      <h1 className="text-2xl font-bold">Payment successful 🎉</h1>
      <p className="mt-2 text-slate-700">Thanks! Your subscription is now active.</p>

      {sessionId && (
        <p className="mt-4 text-sm text-slate-500">
          Session: <span className="font-mono">{sessionId}</span>
        </p>
      )}

      <a href="/app" className="mt-6 inline-flex rounded-xl bg-slate-900 px-5 py-3 text-white hover:opacity-90">
        go to the app
      </a>
    </main>
  );
}
