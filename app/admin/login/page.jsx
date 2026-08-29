import { redirect } from 'next/navigation';
import { getSession } from '@/lib/auth';
import LoginForm from '@/components/admin/LoginForm';

export default async function LoginPage({ searchParams }) {
  if (await getSession()) redirect('/admin');

  const params = await searchParams;
  const next = typeof params?.next === 'string' ? params.next : '/admin';

  return (
    <main className="admin-login">
      <div className="admin-login-card">
        <p className="admin-kicker">Private area</p>
        <h1>Owner sign in</h1>
        <LoginForm next={next} />
      </div>
    </main>
  );
}
