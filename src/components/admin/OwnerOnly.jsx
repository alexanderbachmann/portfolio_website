'use client';

import { useEffect, useState } from 'react';

const OWNER_HINT = 'jmb_owner=1';

function readOwnerHint() {
  if (typeof document === 'undefined') return false;
  return document.cookie.split(';').some((c) => c.trim() === OWNER_HINT);
}

/* Reads the owner hint cookie that is set next to the httpOnly session at
   login and cleared at logout. It starts false so the server-rendered,
   CDN-cached HTML never differs from the first client render, then flips
   on after mount. Purely cosmetic: every admin route, server action, and
   route handler is gated server-side by requireOwner(). */
export function useOwner() {
  const [owner, setOwner] = useState(false);

  useEffect(() => {
    setOwner(readOwnerHint());
    /* The session and the hint expire together, and a sign-out in another
       tab should hide these links here too. */
    const recheck = () => setOwner(readOwnerHint());
    window.addEventListener('focus', recheck);
    return () => window.removeEventListener('focus', recheck);
  }, []);

  return owner;
}

export default function OwnerOnly({ children }) {
  return useOwner() ? children : null;
}
