/* Client-safe helper shared by the BlockNote editor and the cover field. */

export const MAX_UPLOAD_BYTES = 4 * 1024 * 1024; // Vercel function body cap is 4.5 MB

export async function uploadFile(file, slug = '') {
  if (!file?.type?.startsWith('image/')) {
    throw new Error('Only images can be uploaded.');
  }
  if (file.size > MAX_UPLOAD_BYTES) {
    throw new Error('Image is larger than 4 MB.');
  }

  const body = new FormData();
  body.append('file', file, file.name);
  if (slug) body.append('slug', slug);

  const res = await fetch('/api/admin/upload', { method: 'POST', body });
  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.error || `Upload failed (${res.status})`);
  }

  const { url } = await res.json();
  if (!url) throw new Error('Upload did not return a URL.');
  return url;
}
