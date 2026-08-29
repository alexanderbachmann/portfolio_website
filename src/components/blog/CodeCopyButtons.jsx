'use client';

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { Check, Copy } from 'lucide-react';

function CopyButton({ pre }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(pre.innerText ?? '');
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      /* clipboard unavailable, ignore */
    }
  };

  return (
    <button
      type="button"
      className="prose-pre-copy"
      onClick={copy}
      aria-label="Copy code"
    >
      {copied ? <Check size={14} /> : <Copy size={14} />}
    </button>
  );
}

/* The article body is server-rendered HTML, so copy buttons are attached
   after hydration with portals into each code block's wrapper. */
export default function CodeCopyButtons() {
  const [targets, setTargets] = useState([]);

  useEffect(() => {
    const pres = Array.from(document.querySelectorAll('article.prose pre'));
    const wrappers = pres.map((pre) => {
      let parent = pre.parentElement;
      if (!parent || parent.tagName !== 'FIGURE') {
        const wrapper = document.createElement('div');
        wrapper.className = 'prose-pre-wrapper';
        pre.replaceWith(wrapper);
        wrapper.appendChild(pre);
        parent = wrapper;
      }
      return { pre, parent };
    });
    setTargets(wrappers);
  }, []);

  return targets.map(({ pre, parent }, i) =>
    createPortal(<CopyButton key={i} pre={pre} />, parent)
  );
}
