import { randomBytes } from 'node:crypto';
import { put } from '@vercel/blob';
import { requireOwner } from '@/lib/auth';
import { findEnv } from '@/lib/env';

const MAX_BYTES = 4 * 1024 * 1024; // Vercel function body cap is 4.5 MB
const TYPES = {
  'image/png': 'png',
  'image/jpeg': 'jpg',
  'image/webp': 'webp',
  'image/gif': 'gif',
  'image/avif': 'avif',
};

export async function POST(request) {
  try {
    await requireOwner();
  } catch {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const form = await request.formData();
  const file = form.get('file');
  const slug =
    String(form.get('slug') ?? '')
      .toLowerCase()
      .replace(/[^a-z0-9-]/g, '') || 'unsorted';

  if (!(file instanceof File)) {
    return Response.json({ error: 'No file received.' }, { status: 400 });
  }
  const ext = TYPES[file.type];
  if (!ext) {
    return Response.json(
      { error: 'Unsupported image type. Use PNG, JPEG, WebP, GIF, or AVIF.' },
      { status: 415 }
    );
  }
  if (file.size > MAX_BYTES) {
    return Response.json(
      { error: 'Image must be 4 MB or smaller.' },
      { status: 413 }
    );
  }

  const name = `blog/${slug}/${randomBytes(8).toString('hex')}.${ext}`;
  /* The SDK finds BLOB_READ_WRITE_TOKEN (or OIDC on Vercel) by itself;
     the explicit token only covers a store connected under a custom prefix. */
  const token = findEnv('BLOB_READ_WRITE_TOKEN');
  const blob = await put(name, file, {
    access: 'public',
    addRandomSuffix: true,
    contentType: file.type,
    ...(token ? { token } : {}),
  });

  return Response.json({ url: blob.url });
}
