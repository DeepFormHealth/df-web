export default function Home() {
  return (
    <main style={{ fontFamily: 'sans-serif', padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>DeepForm Health</h1>
      <p style={{ fontSize: '1.2rem', marginBottom: '2rem' }}>
        DeepForm Health delivers AI-powered, personalized fitness coaching for men in their 20s and 30s
        who want to achieve aesthetic, athletic physiques. Our adaptive training plans adjust weekly
        based on your progress, equipment, and recovery.
      </p>
      <section style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>What We Offer</h2>
        <ul style={{ lineHeight: '1.6' }}>
          <li>Custom AI-generated workout plans</li>
          <li>Form cues and exercise demos</li>
          <li>Weekly auto-updates based on performance</li>
          <li>Goal tracking and progress logging</li>
        </ul>
      </section>
      <section>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Contact Us</h2>
        <p>
          Email: <a href="mailto:support@deepformhealth.com">support@deepformhealth.com</a>
        </p>
      </section>
    </main>
  );
}
