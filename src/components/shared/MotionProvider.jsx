'use client';

import { MotionConfig } from 'motion/react';

/* One config for every motion component in the app. "user" honours
   prefers-reduced-motion: transform and layout animations are skipped,
   opacity and colour still animate. */
export default function MotionProvider({ children }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
