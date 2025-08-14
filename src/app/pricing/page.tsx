import Link from "next/link";

const tiers = [
  {
    id: "starter",
    name: "Starter",
    price: "$29/mo",
    blurb: "Adaptive plan, cues, progress tracking.",
    features: ["Weekly auto-adjustments", "Form cues & demos", "Basic progress"],
  },
  {
    id: "pro",
    name: "Pro",
    price: "$69/mo",
    blurb: "Everything in Starter plus advanced recovery logic.",
    features: ["All Starter features", "Recovery-aware deloads", "Priority support"],
    highlight: true,
  },
];

export default function PricingPage() {
  return (
    <main className="px-6 py-16 bg-gradient-to-b from-white to-slate-50">
      <div className="mx-auto max-w-7xl">
        <h1 className="text-4xl font-extrabold tracking-tight text-slate-900">Pricing</h1>
        <p className="mt-3 text-lg text-slate-600">Simple monthly plans. Cancel anytime.</p>

        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          {tiers.map((t) => (
            <div
              key={t.id}
              className={`rounded-2xl border p-6 bg-white shadow-sm ${
                t.highlight ? "border-slate-900" : "border-slate-200"
              }`}
            >
              <h2 className="text-xl font-semibold">{t.name}</h2>
              <p className="mt-1 text-3xl font-bold">{t.price}</p>
              <p className="mt-2 text-slate-600">{t.blurb}</p>
              <ul className="mt-4 grid gap-2 text-sm text-slate-700">
                {t.features.map((f) => (
                  <li key={f} className="flex gap-2">
                    <span className="mt-1 inline-block h-4 w-4 rounded-full bg-slate-900" />
                    {f}
                  </li>
                ))}
              </ul>
              <Link
                href={`/checkout?plan=${t.id}`}
                className="mt-6 inline-flex items-center justify-center rounded-xl bg-slate-900 px-5 py-3 text-white font-medium hover:opacity-90"
              >
                Choose {t.name}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
