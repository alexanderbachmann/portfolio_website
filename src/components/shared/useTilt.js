'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'motion/react';

/* Pointer-driven 3D tilt. Off under reduced motion and on touch-only
   devices, where it would only fire on tap. Offset from the centre in
   [-0.5, 0.5] times 2 times maxDeg. */
export default function useTilt(maxDeg = 5, perspective = 700) {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const [canHover, setCanHover] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(hover: hover) and (pointer: fine)');
    const update = () => setCanHover(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  const enabled = canHover && !reduce;

  const onPointerMove = useCallback(
    (e) => {
      const el = ref.current;
      if (!el || !enabled) return;
      const rect = el.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width - 0.5;
      const py = (e.clientY - rect.top) / rect.height - 0.5;
      const ry = (px * 2 * maxDeg).toFixed(2);
      const rx = (-py * 2 * maxDeg).toFixed(2);
      el.style.transform = `perspective(${perspective}px) rotateX(${rx}deg) rotateY(${ry}deg)`;
    },
    [enabled, maxDeg, perspective]
  );

  const onPointerLeave = useCallback(() => {
    if (ref.current) ref.current.style.transform = '';
  }, []);

  return { ref, onPointerMove, onPointerLeave };
}
