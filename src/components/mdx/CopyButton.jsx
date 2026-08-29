'use client';

import { useState, useRef } from 'react';
import { Check, Copy } from 'lucide-react';

const CopyButton = ({ children, ...props }) => {
  const [copied, setCopied] = useState(false);
  const preRef = useRef(null);

  const copy = async () => {
    const text = preRef.current?.innerText ?? '';
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      /* clipboard unavailable — ignore */
    }
  };

  return (
    <div className="prose-pre-wrapper">
      <button
        type="button"
        className="prose-pre-copy"
        onClick={copy}
        aria-label="Copy code"
      >
        {copied ? <Check size={14} /> : <Copy size={14} />}
      </button>
      <pre ref={preRef} {...props}>
        {children}
      </pre>
    </div>
  );
};

export default CopyButton;
