import { useState } from 'react';
import type { FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';
import { Logo } from '../components/common/Logo';

type Mode = 'signin' | 'signup';

export function LoginPage() {
  const { signin, signup } = useAuth();
  const nav = useNavigate();
  const [mode, setMode] = useState<Mode>('signup');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [pw, setPw] = useState('');
  const [error, setError] = useState<string | null>(null);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const err = mode === 'signup' ? signup(name, email, pw) : signin(email, pw);
    if (err) {
      setError(err);
      return;
    }
    nav('/dashboard');
  };

  return (
    <section className="login">
      <div className="login__card" data-reveal>
        <Logo />
        <h1 className="login__title">
          {mode === 'signup' ? 'Begin your ascent.' : 'Welcome back.'}
        </h1>
        <p className="login__lede">
          {mode === 'signup'
            ? 'Create your account — your first cohort is waiting.'
            : 'Your ascent continues where you left it.'}
        </p>
        <div className="login__modes" role="tablist" aria-label="Authentication mode">
          <button
            className={`login__mode mono${mode === 'signup' ? ' is-active' : ''}`}
            onClick={() => { setMode('signup'); setError(null); }}
          >
            Sign up
          </button>
          <button
            className={`login__mode mono${mode === 'signin' ? ' is-active' : ''}`}
            onClick={() => { setMode('signin'); setError(null); }}
          >
            Sign in
          </button>
        </div>
        <form onSubmit={submit} className="login__form">
          {mode === 'signup' && (
            <>
              <label className="login__label mono" htmlFor="name">Full name</label>
              <input
                id="name"
                className="login__input"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ayesha Rahman"
              />
            </>
          )}
          <label className="login__label mono" htmlFor="email">Email</label>
          <input
            id="email"
            className="login__input"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
          />
          <label className="login__label mono" htmlFor="pw">Password</label>
          <input
            id="pw"
            className="login__input"
            type="password"
            required
            minLength={6}
            value={pw}
            onChange={(e) => setPw(e.target.value)}
            placeholder="At least 6 characters"
          />
          {error && <p className="login__error" role="alert">{error}</p>}
          <button className="btn btn--primary btn--md login__btn" type="submit">
            <span>{mode === 'signup' ? 'Create account' : 'Enter dashboard'}</span>
          </button>
        </form>
        <p className="login__note mono">
          {mode === 'signup'
            ? 'Demo auth — data stays in your browser'
            : 'New here? Switch to Sign up'}
        </p>
      </div>
    </section>
  );
}
