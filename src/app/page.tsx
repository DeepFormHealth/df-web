export default function HomePage() {
  return (
    <main className="font-sans p-6 max-w-5xl mx-auto text-white bg-black min-h-screen">
      <h1 className="text-4xl font-bold mb-4">DeepForm Health</h1>
      <p className="mb-6 max-w-2xl">
        DeepForm Health delivers AI-powered, personalized fitness coaching for men in their 20s and 30s 
        who want to achieve aesthetic, athletic physiques. Our adaptive training plans adjust weekly 
        based on your progress, equipment, and recovery.
      </p>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">What We Offer</h2>
        <ul className="list-disc list-inside space-y-1">
          <li>Custom AI-generated workout plans</li>
          <li>Form cues and exercise demos</li>
          <li>Weekly auto-updates based on performance</li>
          <li>Goal tracking and progress logging</li>
        </ul>
      </section>

      <div className="flex gap-4 mt-6">
        <a href="/pricing" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">
          View Pricing
        </a>
        <a href="/signup" className="border border-white hover:bg-white hover:text-black px-4 py-2 rounded">
          Sign Up
        </a>
      </div>

      <footer className="mt-12 border-t border-gray-700 pt-4">
        <p>Contact Us</p>
        <p>Email: support@deepformhealth.com</p>
      </footer>
    </main>
  );
}
