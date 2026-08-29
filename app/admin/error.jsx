'use client';

/* Without this, anything that throws under /admin (a misconfigured
   AUTH_SECRET, an unreachable database) renders a blank page with no way
   to tell what went wrong. Next masks server error messages in production,
   so show the digest instead: it matches the entry in the Vercel logs. */
export default function AdminError({ error, reset, retry }) {
  /* `reset` only clears the boundary's local state, so it re-renders the
     same already-failed server payload and throws again. `retry` refreshes
     the route first, which is what actually recovers here. */
  const recover = retry ?? reset;

  return (
    <main className="admin-login">
      <div className="admin-login-card">
        <p className="admin-kicker">Something broke</p>
        <h1>The admin area could not load</h1>
        <p className="admin-error" role="alert">
          The page failed to render. Your posts are not affected.
        </p>
        <p className="admin-hint">
          Usually this means DATABASE_URL, AUTH_SECRET, or ADMIN_PASSWORD is
          missing for this environment in Vercel.
          {error?.digest ? ` Log reference: ${error.digest}.` : ''}
        </p>
        <button
          type="button"
          className="admin-btn admin-btn--primary"
          onClick={recover}
        >
          Try again
        </button>
      </div>
    </main>
  );
}
