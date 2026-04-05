import { useState } from 'react';
import { signup, login } from '../utils/api';

export default function AuthScreen({ onAuth, onSkip }) {
  const [mode, setMode] = useState('login');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      let data;
      if (mode === 'signup') {
        data = await signup(username, email, password, username);
      } else {
        data = await login(username, password);
      }
      onAuth(data.user, data.token);
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  }

  return (
    <div className="h-full flex items-center justify-center p-6 bg-slate-900">
      <div className="w-full max-w-sm animate-slide-in-up">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold">
            <span className="text-primary">Code</span><span className="text-slate-100">Forge</span>
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            {mode === 'login' ? 'Welcome back, builder.' : 'Join the forge.'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            value={username}
            onChange={e => setUsername(e.target.value)}
            placeholder={mode === 'login' ? 'Username or email' : 'Username'}
            className="w-full bg-slate-800 text-slate-100 rounded-xl px-4 py-3 outline-none border border-slate-700 focus:border-primary text-sm"
            required
            autoComplete="username"
          />

          {mode === 'signup' && (
            <input
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="Email"
              type="email"
              className="w-full bg-slate-800 text-slate-100 rounded-xl px-4 py-3 outline-none border border-slate-700 focus:border-primary text-sm"
              required
              autoComplete="email"
            />
          )}

          <input
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="Password"
            type="password"
            className="w-full bg-slate-800 text-slate-100 rounded-xl px-4 py-3 outline-none border border-slate-700 focus:border-primary text-sm"
            required
            minLength={6}
            autoComplete={mode === 'signup' ? 'new-password' : 'current-password'}
          />

          {error && (
            <div className="bg-danger/10 border border-danger/30 rounded-lg px-3 py-2 text-sm text-danger">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full px-6 py-3 bg-primary text-slate-900 rounded-xl font-bold text-sm hover:bg-primary-dark transition-colors disabled:opacity-50"
          >
            {loading ? 'Loading...' : mode === 'login' ? 'Log In' : 'Create Account'}
          </button>
        </form>

        <div className="text-center mt-4 space-y-2">
          <button
            onClick={() => { setMode(mode === 'login' ? 'signup' : 'login'); setError(''); }}
            className="text-sm text-primary hover:text-primary-dark transition-colors"
          >
            {mode === 'login' ? "Don't have an account? Sign up" : 'Already have an account? Log in'}
          </button>

          <div>
            <button
              onClick={onSkip}
              className="text-xs text-slate-500 hover:text-slate-400 transition-colors"
            >
              Continue without account →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
