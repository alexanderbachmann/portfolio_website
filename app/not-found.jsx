import Link from 'next/link';

export default function NotFound() {
  return (
    <main
      className="section"
      style={{
        minHeight: '60vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 'var(--space-md)',
        textAlign: 'center',
      }}
    >
      <p
        style={{
          fontFamily: 'var(--font-mono)',
          color: 'var(--color-muted)',
          fontSize: 'var(--text-sm)',
        }}
      >
        404: page not found
      </p>
      <h1 style={{ fontSize: 'var(--text-3xl)' }}>Nothing at this address.</h1>
      <Link href="/" style={{ color: 'var(--color-accent)' }}>
        Back home →
      </Link>
    </main>
  );
}
