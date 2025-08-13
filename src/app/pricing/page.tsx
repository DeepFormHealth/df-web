export default function PricingPage() {
  return (
    <main style={{ padding: '2rem', color: '#fff', backgroundColor: '#000', minHeight: '100vh' }}>
      <h1>Choose Your Plan</h1>
      <p>Select the plan that’s right for you and get started today.</p>

      <div style={{ marginTop: '2rem' }}>
        <h2>Starter — $29/mo</h2>
        <ul>
          <li>AI-generated workout plans</li>
          <li>Weekly updates</li>
          <li>Exercise demos</li>
        </ul>

        <h2>Pro — $79/mo</h2>
        <ul>
          <li>Everything in Starter</li>
          <li>Coach review + adjustments</li>
          <li>Priority support</li>
        </ul>
      </div>
    </main>
  );
}
