'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { logout } from '@/lib/admin/actions';
import { useUnsavedChanges } from './UnsavedChanges';

const links = [
  { href: '/admin', label: 'Posts', exact: true },
  { href: '/admin/posts/new', label: 'New post' },
];

export default function AdminBar() {
  const pathname = usePathname();
  const { guard } = useUnsavedChanges();

  const isActive = ({ href, exact }) =>
    exact ? pathname === href : pathname.startsWith(href);

  return (
    <header className="admin-bar">
      <div className="admin-bar-inner">
        <Link href="/admin" className="admin-bar-brand" onClick={guard}>
          <strong>JMB</strong> admin
        </Link>

        <nav className="admin-bar-links" aria-label="Admin">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={isActive(link) ? 'active' : ''}
              onClick={guard}
            >
              {link.label}
            </Link>
          ))}
          <a href="/" target="_blank" rel="noreferrer">
            View site
          </a>
          <form action={logout}>
            <button type="submit" className="admin-bar-signout">
              Sign out
            </button>
          </form>
        </nav>
      </div>
    </header>
  );
}
