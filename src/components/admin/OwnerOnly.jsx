'use client';

import { useEffect, useState } from 'react';

/* Renders children only when the owner hint cookie is present. It is set
   next to the httpOnly session at login and cleared at logout. Purely
   cosmetic: the admin routes it links to are gated server-side. */
export default function OwnerOnly({ children }) {
  const [owner, setOwner] = useState(false);

  useEffect(() => {
    const hint = document.cookie
      .split('; ')
      .some((cookie) => cookie === 'jmb_owner=1');
    setOwner(hint);
  }, []);

  return owner ? children : null;
}
