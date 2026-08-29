import { redirect } from 'next/navigation';
import { getSession } from '@/lib/auth';
import AdminBar from '@/components/admin/AdminBar';
import { UnsavedChangesProvider } from '@/components/admin/UnsavedChanges';

/* Second gate behind proxy.js. Pages read cookies, so they render dynamically. */
export default async function DashboardLayout({ children }) {
  if (!(await getSession())) redirect('/admin/login');

  return (
    <UnsavedChangesProvider>
      <AdminBar />
      {children}
    </UnsavedChangesProvider>
  );
}
