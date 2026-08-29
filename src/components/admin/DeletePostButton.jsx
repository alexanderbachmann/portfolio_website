'use client';

import { useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { deletePost } from '@/lib/admin/actions';

export default function DeletePostButton({ id, title }) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  const onClick = () => {
    if (!window.confirm(`Delete "${title}"? This cannot be undone.`)) return;
    startTransition(async () => {
      const result = await deletePost(id);
      if (!result?.ok) {
        window.alert(result?.error ?? 'Could not delete the post.');
        return;
      }
      router.refresh();
    });
  };

  return (
    <button
      type="button"
      className="admin-btn admin-btn--danger"
      onClick={onClick}
      disabled={pending}
    >
      {pending ? 'Deleting' : 'Delete'}
    </button>
  );
}
