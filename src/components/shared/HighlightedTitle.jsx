import React from 'react';

/* Wraps the first occurrence of `highlight` in the section's one gradient
   word. Plain text when the word is absent, so data typos cannot break it. */
const HighlightedTitle = ({ text, highlight }) => {
  const at = highlight ? text.indexOf(highlight) : -1;
  if (at === -1) return text;
  return (
    <>
      {text.slice(0, at)}
      <span className="gradient-text">{highlight}</span>
      {text.slice(at + highlight.length)}
    </>
  );
};

export default HighlightedTitle;
