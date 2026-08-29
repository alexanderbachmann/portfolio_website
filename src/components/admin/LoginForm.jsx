'use client';

import { useActionState } from 'react';
import { login } from '@/lib/admin/actions';

const initialState = { error: null };

export default function LoginForm({ next = '/admin' }) {
  const [state, action, pending] = useActionState(login, initialState);

  return (
    <form action={action} className="admin-login-form">
      <input type="hidden" name="next" value={next} />
      <label className="admin-field">
        <span className="admin-label">Password</span>
        <input
          className="admin-input"
          type="password"
          name="password"
          autoComplete="current-password"
          autoFocus
          required
        />
      </label>
      {state?.error && (
        <p className="admin-error" role="alert">
          {state.error}
        </p>
      )}
      <button
        type="submit"
        className="admin-btn admin-btn--primary"
        disabled={pending}
      >
        {pending ? 'Signing in' : 'Sign in'}
      </button>
    </form>
  );
}
