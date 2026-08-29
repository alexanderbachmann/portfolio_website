'use client';

import Link from 'next/link';
import { useOwner } from '@/components/admin/OwnerOnly';

/* Shown on the public blog index, but only to the signed-in owner: the
   page itself stays statically cached, so this is decided in the browser
   from the owner hint cookie. Visitors see nothing, and the routes it
   links to are gated server-side. */
export default function BlogOwnerBar() {
  if (!useOwner()) return null;

  return (
    <div className="blog-owner-bar">
      <span>Signed in as the owner.</span>
      <Link href="/admin/posts/new">New post</Link>
      <Link href="/admin">Manage posts</Link>
    </div>
  );
}
