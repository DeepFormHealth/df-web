export default function CheckoutCancelPage() {
  return (
    <main className="px-6 py-16">
      <h1 className="text-2xl font-bold">Checkout canceled</h1>
      <p className="mt-2">No worries—nothing was charged.</p>
      <a href="/pricing" className="mt-6 inline-block rounded-lg border px-4 py-2">
        Try again
      </a>
    </main>
  );
}
