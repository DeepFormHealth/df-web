"use client";

export default function PortalPage() {
  const go = async () => {
    const res = await fetch("/api/stripe/portal", { method: "POST" });
    const data = await res.json();
    if (data?.url) window.location.href = data.url;
  };

  return (
    <main className="px-6 py-16">
      <h1 className="text-2xl font-bold">Manage billing</h1>
      <button onClick={go} className="mt-6 rounded-lg border px-4 py-2">
        Open Billing Portal
      </button>
    </main>
  );
}
