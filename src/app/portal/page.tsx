"use client";

export default function PortalPage() {
  async function openPortal() {
    const res = await fetch("/api/checkout/portal", { method: "POST" });
    const data = await res.json();
    if (data?.url) window.location.href = data.url;
  }

  return (
    <main className="px-6 py-16">
      <h1 className="text-2xl font-bold">Manage billing</h1>
      <button
        onClick={openPortal}
        className="mt-6 rounded-xl border px-5 py-3 hover:bg-slate-50"
      >
        Open Billing Portal
      </button>
    </main>
  );
}
