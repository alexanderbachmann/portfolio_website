import React, { useState } from 'react';
import { BookOpen } from 'lucide-react';
import { currentBook } from '../../../data/bio-metrics';

const BookCard = () => {
  const [flipped, setFlipped] = useState(false);

  return (
    <div
      onClick={() => setFlipped(!flipped)}
      style={{
        height: '100%',
        perspective: '800px',
        cursor: 'pointer',
        minHeight: 'var(--card-min-h)',
      }}
    >
      <div style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        transformStyle: 'preserve-3d',
        transition: 'transform 0.6s ease',
        transform: flipped ? 'rotateY(180deg)' : 'rotateY(0)',
      }}>
        {/* Front */}
        <div style={{
          position: 'absolute',
          inset: 0,
          backfaceVisibility: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          gap: 'var(--space-sm)',
        }}>
          <BookOpen size={32} style={{ color: 'var(--color-accent)', marginBottom: 'var(--space-sm)' }} />
          <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', fontWeight: 600 }}>
            Currently Reading
          </div>
          <div style={{ fontSize: 'var(--text-base)', fontWeight: 600, color: 'var(--color-text-primary)', lineHeight: 1.3 }}>
            {currentBook.title}
          </div>
          <div style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-muted)' }}>
            {currentBook.author}
          </div>
          <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-accent)', marginTop: 'var(--space-sm)' }}>
            {currentBook.booksThisYear} books in 2025
          </div>
          <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)', marginTop: 'var(--space-xs)' }}>
            Click to flip
          </div>
        </div>

        {/* Back */}
        <div style={{
          position: 'absolute',
          inset: 0,
          backfaceVisibility: 'hidden',
          transform: 'rotateY(180deg)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          padding: 'var(--space-md)',
          gap: 'var(--space-md)',
        }}>
          <div style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)', fontStyle: 'italic', lineHeight: 1.5 }}>
            "{currentBook.review}"
          </div>
          <a
            href={currentBook.goodreadsUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            style={{
              fontSize: 'var(--text-xs)',
              color: 'var(--color-accent)',
              textDecoration: 'underline',
            }}
          >
            View on GoodReads
          </a>
        </div>
      </div>
    </div>
  );
};

export default BookCard;
