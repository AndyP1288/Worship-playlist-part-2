import { useState } from 'react';
import { supabase } from '../supabaseClient';

function AuthForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mode, setMode] = useState('login');
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    setMessage('');

    try {
      if (mode === 'signup') {
        const { error } = await supabase.auth.signUp({ email, password });
        if (error) throw error;
        setMessage('Account created. Check your email if confirmation is enabled in Supabase.');
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        setMessage('Login successful. Redirecting…');
      }
    } catch (error) {
      setMessage(error.message || 'Authentication error.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form className="card" onSubmit={handleSubmit}>
      <h2>{mode === 'login' ? 'Login' : 'Create Account'}</h2>
      <p className="muted">Use your worship team email and password.</p>

      <label htmlFor="email">Email</label>
      <input
        id="email"
        type="email"
        value={email}
        onChange={(event) => setEmail(event.target.value.trim())}
        autoComplete="email"
        required
      />

      <label htmlFor="password">Password</label>
      <input
        id="password"
        type="password"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
        autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
        minLength={6}
        required
      />

      <button type="submit" disabled={submitting}>
        {submitting ? 'Please wait…' : mode === 'login' ? 'Login' : 'Sign up'}
      </button>

      <button
        type="button"
        className="secondary"
        onClick={() => {
          setMode(mode === 'login' ? 'signup' : 'login');
          setMessage('');
        }}
      >
        Switch to {mode === 'login' ? 'Sign up' : 'Login'}
      </button>

      {message ? <p className="message">{message}</p> : null}
    </form>
  );
}

export default AuthForm;
