// src/app/app/page.tsx
export default function AppHome() {
  return (
    <main className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">Welcome to the app</h1>
      <p className="text-slate-600">You have premium access.</p>

      <div className="flex gap-3">
        <form action="/api/stripe/deactivate" method="POST">
          <button className="rounded-lg border px-4 py-2">Sign out</button>
        </form>

        {/* Keep this hidden until you store Stripe customer IDs via DB gate */}
        {/* <form action="/api/stripe/portal" method="POST">
          <button className="rounded-lg border px-4 py-2">Manage subscription</button>
        </form> */}
      </div>
    </main>
  );
}
