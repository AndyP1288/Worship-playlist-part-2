import AuthForm from '../components/AuthForm';

function AuthPage() {
  return (
    <main className="container">
      <section className="card">
        <h2>Welcome</h2>
        <p>Sign in to manage your worship song library and chord sheet PDFs.</p>
      </section>
      <AuthForm />
    </main>
  );
}

export default AuthPage;
