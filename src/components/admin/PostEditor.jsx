'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import {
  savePost,
  publishPost,
  unpublishPost,
  deletePost,
} from '@/lib/admin/actions';
import { slugify } from '@/lib/slugify';
import { uploadFile } from '@/lib/upload-file';
import { useUnsavedChanges } from './UnsavedChanges';
import ImageField from './ImageField';

/* BlockNote is browser-only; ssr:false is allowed here because this is a
   client component. */
const BlockEditor = dynamic(() => import('./BlockEditor'), {
  ssr: false,
  loading: () => <div className="admin-editor-skeleton" aria-busy="true" />,
});

const toDateInput = (iso) => (iso ? iso.slice(0, 10) : '');
const fromDateInput = (value) => (value ? `${value}T12:00:00.000Z` : null);
const parseTags = (text) => [
  ...new Set(
    text
      .split(',')
      .map((tag) => tag.trim())
      .filter(Boolean)
  ),
];
const timeNow = () =>
  new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

export default function PostEditor({ post }) {
  const router = useRouter();
  const { dirty, setDirty } = useUnsavedChanges();

  const editorRef = useRef(null);
  const readyAtRef = useRef(0);
  const [postId, setPostId] = useState(post?.id ?? null);
  const [status, setStatus] = useState(post?.status ?? 'draft');
  const [slugTouched, setSlugTouched] = useState(Boolean(post?.slug));
  const [fields, setFields] = useState({
    title: post?.title ?? '',
    slug: post?.slug ?? '',
    description: post?.description ?? '',
    tags: (post?.tags ?? []).join(', '),
    coverUrl: post?.coverUrl ?? null,
    publishedAt: toDateInput(post?.publishedAt),
  });
  const [busy, setBusy] = useState(null); // 'save' | 'publish' | 'delete'
  const [notice, setNotice] = useState(null); // { kind: 'ok' | 'error', text }

  const slugRef = useRef(fields.slug);
  slugRef.current = fields.slug;

  const update = (patch) => {
    setFields((current) => ({ ...current, ...patch }));
    setDirty(true);
  };

  const onTitle = (title) =>
    update(slugTouched ? { title } : { title, slug: slugify(title) });

  const onReady = useCallback((editor) => {
    editorRef.current = editor;
    readyAtRef.current = Date.now();
  }, []);

  const onEditorChange = useCallback(() => {
    /* Ignore the normalisation BlockNote performs right after mounting. */
    if (Date.now() - readyAtRef.current < 500) return;
    setDirty(true);
  }, [setDirty]);

  const upload = useCallback((file) => uploadFile(file, slugRef.current), []);

  /* Leaving the editor clears the flag so other admin pages are not blocked. */
  useEffect(() => () => setDirty(false), [setDirty]);

  async function save() {
    const editor = editorRef.current;
    if (!editor) return null;
    if (!fields.title.trim()) {
      setNotice({ kind: 'error', text: 'Title is required.' });
      return null;
    }

    setBusy('save');
    try {
      const contentJson = editor.document;
      const contentHtml = await editor.blocksToHTMLLossy(contentJson);
      const result = await savePost({
        id: postId,
        title: fields.title.trim(),
        slug: slugify(fields.slug || fields.title),
        description: fields.description.trim(),
        tags: parseTags(fields.tags),
        coverUrl: fields.coverUrl,
        publishedAt: fromDateInput(fields.publishedAt),
        contentJson,
        contentHtml,
      });

      if (!result?.ok) {
        setNotice({ kind: 'error', text: result?.error ?? 'Save failed.' });
        return null;
      }

      setDirty(false);
      setPostId(result.id);
      setStatus(result.status);
      setFields((current) => ({
        ...current,
        slug: result.slug,
        publishedAt: toDateInput(result.publishedAt),
      }));
      setNotice({ kind: 'ok', text: `Saved ${timeNow()}` });
      return result;
    } catch (err) {
      setNotice({ kind: 'error', text: err.message });
      return null;
    } finally {
      setBusy(null);
    }
  }

  const saveRef = useRef(save);
  saveRef.current = save;

  useEffect(() => {
    const onKey = (event) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 's') {
        event.preventDefault();
        if (!busy) saveRef.current();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [busy]);

  async function handleSave() {
    if (busy) return;
    const wasNew = !postId;
    const result = await save();
    /* A new post gets its real URL once it exists. */
    if (result && wasNew) router.replace(`/admin/posts/${result.id}`);
  }

  async function togglePublish() {
    if (busy) return;
    const wasNew = !postId;
    const saved = await save();
    if (!saved) return;

    setBusy('publish');
    const result =
      status === 'published'
        ? await unpublishPost(saved.id)
        : await publishPost(saved.id);
    setBusy(null);

    if (!result?.ok) {
      setNotice({
        kind: 'error',
        text: result?.error ?? 'Could not change the status.',
      });
      return;
    }

    setStatus(result.status);
    setFields((current) => ({
      ...current,
      publishedAt: toDateInput(result.publishedAt),
    }));
    setNotice({
      kind: 'ok',
      text: result.status === 'published' ? 'Published' : 'Unpublished',
    });
    if (wasNew) router.replace(`/admin/posts/${saved.id}`);
  }

  async function remove() {
    if (!postId || busy) return;
    if (!window.confirm('Delete this post? This cannot be undone.')) return;

    setBusy('delete');
    const result = await deletePost(postId);
    if (!result?.ok) {
      setBusy(null);
      setNotice({ kind: 'error', text: result?.error ?? 'Could not delete.' });
      return;
    }
    setDirty(false);
    router.push('/admin');
  }

  const canPreview = Boolean(postId) && !dirty;
  const statusText = busy
    ? 'Working'
    : dirty
      ? 'Unsaved changes'
      : (notice?.text ?? (postId ? 'Saved' : 'New draft'));
  const statusKind = dirty ? 'dirty' : (notice?.kind ?? 'clean');
  const slugChanged =
    status === 'published' && post?.slug && fields.slug !== post.slug;

  return (
    <main className="admin-page admin-page--narrow admin-editor">
      <div className="admin-editor-toolbar">
        <span className={`admin-status admin-status--${statusKind}`}>
          {statusText}
          <span className={`admin-pill admin-pill--${status}`}>{status}</span>
        </span>

        <div className="admin-editor-actions">
          <a
            className={`admin-btn admin-btn--ghost${canPreview ? '' : ' is-disabled'}`}
            href={canPreview ? `/admin/preview/${postId}` : undefined}
            target="_blank"
            rel="noreferrer"
            aria-disabled={!canPreview}
            title={canPreview ? 'Open preview in a new tab' : 'Save first to preview'}
          >
            Preview
          </a>
          <button
            type="button"
            className={`admin-btn ${status === 'published' ? 'admin-btn--primary' : 'admin-btn--ghost'}`}
            onClick={handleSave}
            disabled={Boolean(busy)}
          >
            {status === 'published' ? 'Save & update' : 'Save draft'}
          </button>
          <button
            type="button"
            className={`admin-btn ${status === 'published' ? 'admin-btn--ghost' : 'admin-btn--primary'}`}
            onClick={togglePublish}
            disabled={Boolean(busy)}
          >
            {status === 'published' ? 'Unpublish' : 'Publish'}
          </button>
          {postId && (
            <button
              type="button"
              className="admin-btn admin-btn--danger"
              onClick={remove}
              disabled={Boolean(busy)}
            >
              Delete
            </button>
          )}
        </div>
      </div>

      <input
        className="admin-title-input"
        type="text"
        placeholder="Untitled"
        aria-label="Title"
        value={fields.title}
        onChange={(event) => onTitle(event.target.value)}
        onKeyDown={(event) => {
          if (event.key === 'Enter') {
            event.preventDefault();
            editorRef.current?.focus();
          }
        }}
      />

      <div className="admin-meta">
        <label className="admin-field">
          <span className="admin-label">Slug</span>
          <input
            className="admin-input admin-input--mono"
            value={fields.slug}
            onChange={(event) => {
              setSlugTouched(true);
              update({ slug: event.target.value });
            }}
            onBlur={() => update({ slug: slugify(fields.slug) })}
          />
          {slugChanged && (
            <span className="admin-field-hint">
              Changing the slug of a published post changes its URL.
            </span>
          )}
        </label>

        <label className="admin-field">
          <span className="admin-label">Publish date</span>
          <input
            className="admin-input"
            type="date"
            value={fields.publishedAt}
            onChange={(event) => update({ publishedAt: event.target.value })}
          />
        </label>

        <label className="admin-field admin-field--wide">
          <span className="admin-label">Description</span>
          <textarea
            className="admin-input"
            rows={2}
            value={fields.description}
            onChange={(event) => update({ description: event.target.value })}
            placeholder="One or two sentences shown on the blog index and in search results."
          />
        </label>

        <label className="admin-field admin-field--wide">
          <span className="admin-label">Tags (comma separated)</span>
          <input
            className="admin-input"
            value={fields.tags}
            onChange={(event) => update({ tags: event.target.value })}
            placeholder="data products, ownership"
          />
        </label>

        <ImageField
          label="Cover image (optional)"
          value={fields.coverUrl}
          onChange={(url) => update({ coverUrl: url })}
          slug={fields.slug}
        />
      </div>

      <div className="admin-editor-body">
        <BlockEditor
          initialContent={post?.contentJson}
          uploadFile={upload}
          onReady={onReady}
          onChange={onEditorChange}
        />
      </div>

      <p className="admin-editor-help">
        Type <kbd>/</kbd> for blocks (headings, lists, images, code, tables).
        Drag the handle on the left to reorder. <kbd>Cmd</kbd>+<kbd>S</kbd> saves.
      </p>
    </main>
  );
}
