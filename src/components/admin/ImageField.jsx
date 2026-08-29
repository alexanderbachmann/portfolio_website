'use client';

import { useRef, useState } from 'react';
import { uploadFile } from '@/lib/upload-file';

export default function ImageField({ label, value, onChange, slug }) {
  const inputRef = useRef(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState(null);

  const onFile = async (event) => {
    const file = event.target.files?.[0];
    event.target.value = '';
    if (!file) return;
    setBusy(true);
    setError(null);
    try {
      onChange(await uploadFile(file, slug));
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="admin-field admin-field--wide">
      <span className="admin-label">{label}</span>
      <div className="admin-cover">
        {value ? (
          <img src={value} alt="" />
        ) : (
          <span className="admin-cover-empty">No image</span>
        )}
        <div className="admin-cover-actions">
          <button
            type="button"
            className="admin-btn admin-btn--ghost"
            onClick={() => inputRef.current?.click()}
            disabled={busy}
          >
            {busy ? 'Uploading' : value ? 'Replace' : 'Upload image'}
          </button>
          {value && (
            <button
              type="button"
              className="admin-btn admin-btn--danger"
              onClick={() => onChange(null)}
              disabled={busy}
            >
              Remove
            </button>
          )}
        </div>
        <input
          ref={inputRef}
          type="file"
          accept="image/png,image/jpeg,image/webp,image/gif,image/avif"
          onChange={onFile}
          hidden
        />
      </div>
      {error && (
        <p className="admin-error" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
