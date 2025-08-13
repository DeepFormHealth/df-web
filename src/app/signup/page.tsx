export default function SignupPage() {
  return (
    <main style={{ padding: '2rem', color: '#fff', backgroundColor: '#000', minHeight: '100vh' }}>
      <h1>Sign Up</h1>
      <p>Fill in your details to start your fitness journey with DeepForm Health.</p>

      <form style={{ marginTop: '2rem', display: 'flex', flexDirection: 'column', maxWidth: '400px' }}>
        <label htmlFor="email">Email</label>
        <input id="email" type="email" placeholder="you@example.com" style={{ marginBottom: '1rem', padding: '0.5rem' }} />

        <label htmlFor="name">Name</label>
        <input id="name" type="text" placeholder="Your Name" style={{ marginBottom: '1rem', padding: '0.5rem' }} />

        <button type="submit" style={{ padding: '0.75rem', background: '#4CAF50', color: '#fff', border: 'none' }}>
          Create Account
        </button>
      </form>
    </main>
  );
}
