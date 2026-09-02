'use client';

import { useEffect } from 'react';

const SELECTOR = '[data-spotlight], .card';

/* Writes --mx / --my (pointer offset in px from the card's border box)
   onto whichever card the pointer is over. One document listener, at
   most one style write per frame, nothing rendered. Hover-capable fine
   pointers only; touch devices never pay for it. */
export default function Spotlight() {
  useEffect(() => {
    const query = window.matchMedia('(hover: hover) and (pointer: fine)');
    let frame = 0;
    let pending = null;

    const paint = () => {
      frame = 0;
      const { card, x, y } = pending;
      pending = null;
      const rect = card.getBoundingClientRect();
      card.style.setProperty('--mx', `${x - rect.left}px`);
      card.style.setProperty('--my', `${y - rect.top}px`);
    };

    const onMove = (event) => {
      const card =
        event.target instanceof Element ? event.target.closest(SELECTOR) : null;
      if (!card) return;
      pending = { card, x: event.clientX, y: event.clientY };
      if (!frame) frame = requestAnimationFrame(paint);
    };

    const attach = () =>
      document.addEventListener('pointermove', onMove, { passive: true });
    const detach = () => {
      document.removeEventListener('pointermove', onMove);
      if (frame) cancelAnimationFrame(frame);
      frame = 0;
      pending = null;
    };

    const sync = () => (query.matches ? attach() : detach());
    sync();
    query.addEventListener('change', sync);
    return () => {
      query.removeEventListener('change', sync);
      detach();
    };
  }, []);

  return null;
}
