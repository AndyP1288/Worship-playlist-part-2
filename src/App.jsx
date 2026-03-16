import { useEffect, useState } from 'react';
import { Link, Navigate, Route, Routes } from 'react-router-dom';
import { supabase } from './supabaseClient';
import InstallPrompt from './components/InstallPrompt';
import AuthPage from './pages/AuthPage';
import DashboardPage from './pages/DashboardPage';

function App() {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    supabase.auth.getSession().then(({ data }) => {
      if (!mounted) return;
      setSession(data.session ?? null);
      setLoading(false);
    });

    const {
      data: { subscription }
    } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      setSession(nextSession ?? null);
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  if (loading) {
    return <div className="container">Loading application…</div>;
  }

  return (
    <>
      <header className="header">
        <h1>Worship Song Library</h1>
        <nav>
          <Link to="/">Library</Link>
          {!session ? <Link to="/auth">Login</Link> : null}
        </nav>
      </header>

      <InstallPrompt />

      <Routes>
        <Route
          path="/"
          element={session ? <DashboardPage session={session} /> : <Navigate to="/auth" replace />}
        />
        <Route path="/auth" element={session ? <Navigate to="/" replace /> : <AuthPage />} />
        <Route path="*" element={<Navigate to={session ? '/' : '/auth'} replace />} />
      </Routes>
    </>
  );
}

export default App;
