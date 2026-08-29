'use client';

/* Loaded only on admin routes through next/dynamic (ssr: false), so this
   stylesheet never ships to the public site. */
import '@blocknote/mantine/style.css';

import { useEffect, useRef } from 'react';
import { BlockNoteSchema, createCodeBlockSpec } from '@blocknote/core';
import { codeBlockOptions, syntaxHighlighter } from '@blocknote/code-block';
import { useCreateBlockNote } from '@blocknote/react';
import { BlockNoteView } from '@blocknote/mantine';

/* Default blocks plus code blocks with a language picker and highlighting. */
const schema = BlockNoteSchema.create().extend({
  blockSpecs: {
    codeBlock: createCodeBlockSpec(codeBlockOptions),
  },
});

export default function BlockEditor({
  initialContent,
  uploadFile,
  onReady,
  onChange,
}) {
  /* The editor is created once; read the latest upload handler via a ref. */
  const uploadRef = useRef(uploadFile);
  uploadRef.current = uploadFile;

  const editor = useCreateBlockNote({
    schema,
    extensions: [syntaxHighlighter],
    initialContent:
      Array.isArray(initialContent) && initialContent.length > 0
        ? initialContent
        : undefined,
    uploadFile: (file) => uploadRef.current(file),
    tables: { splitCells: true, headers: true },
  });

  useEffect(() => {
    onReady?.(editor);
  }, [editor, onReady]);

  return (
    <BlockNoteView
      editor={editor}
      theme="dark"
      onChange={onChange}
      className="admin-editor-view"
    />
  );
}
