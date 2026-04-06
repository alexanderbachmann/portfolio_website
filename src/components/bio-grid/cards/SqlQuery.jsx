import React, { useState, useRef } from 'react';
import { sqlQuery } from '../../../data/bio-metrics';

const Keyword = ({ children }) => (
  <span style={{ color: '#c084fc' }}>{children}</span>
);
const Str = ({ children }) => (
  <span style={{ color: 'var(--color-accent)' }}>{children}</span>
);
const Col = ({ children }) => (
  <span style={{ color: '#818cf8' }}>{children}</span>
);

const SqlQuery = () => {
  const [ran, setRan] = useState(false);
  const [typed, setTyped] = useState('');
  const intervalRef = useRef(null);

  const runQuery = () => {
    if (ran) return;
    setRan(true);

    const full = sqlQuery.result.row.join(' | ');
    let i = 0;
    intervalRef.current = setInterval(() => {
      i++;
      setTyped(full.slice(0, i));
      if (i >= full.length) clearInterval(intervalRef.current);
    }, 25);
  };

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', fontFamily: 'var(--font-mono)', fontSize: 'var(--text-sm)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-sm)' }}>
        <span style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', fontFamily: 'var(--font-family)' }}>
          SQL Terminal
        </span>
        <div style={{ display: 'flex', gap: '6px' }}>
          <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#ef4444' }} />
          <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#eab308' }} />
          <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#22c55e' }} />
        </div>
      </div>

      <div style={{
        flex: 1,
        background: 'hsla(222, 47%, 6%, 0.8)',
        borderRadius: 'var(--radius-md)',
        padding: 'var(--space-md)',
        lineHeight: 1.7,
        overflow: 'auto',
      }}>
        <pre style={{ margin: 0, whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
          <Keyword>SELECT</Keyword> <Col>name</Col>, <Col>role</Col>, <Col>passion</Col>{'\n'}
          <Keyword>FROM</Keyword> <Col>data_professionals</Col>{'\n'}
          <Keyword>WHERE</Keyword> <Col>creativity</Col> = <Str>'HIGH'</Str>{'\n'}
          {'  '}<Keyword>AND</Keyword> <Col>location</Col> = <Str>'Barcelona'</Str>;
        </pre>

        {!ran && (
          <button
            onClick={runQuery}
            style={{
              marginTop: 'var(--space-md)',
              padding: '0.35em 0.9em',
              fontSize: 'var(--text-xs)',
              background: 'var(--color-accent)',
              color: 'white',
              border: 'none',
              borderRadius: 'var(--radius-sm)',
              cursor: 'pointer',
              fontFamily: 'var(--font-mono)',
              fontWeight: 600,
            }}
          >
            Run Query
          </button>
        )}

        {ran && (
          <div style={{ marginTop: 'var(--space-md)', borderTop: '1px solid var(--color-border)', paddingTop: 'var(--space-sm)' }}>
            <div style={{ color: 'var(--color-text-muted)', fontSize: 'var(--text-xs)', marginBottom: 4 }}>
              {sqlQuery.result.columns.join(' | ')}
            </div>
            <div style={{ color: 'var(--color-text-primary)' }}>
              {typed}<span style={{ opacity: typed.length < sqlQuery.result.row.join(' | ').length ? 1 : 0, animation: 'blink 1s step-end infinite' }}>|</span>
            </div>
            {typed.length >= sqlQuery.result.row.join(' | ').length && (
              <div style={{ color: 'var(--color-text-muted)', fontSize: 'var(--text-xs)', marginTop: 'var(--space-sm)' }}>
                1 row returned in {sqlQuery.result.executionTime}
              </div>
            )}
          </div>
        )}
      </div>

      <style>{`
        @keyframes blink {
          50% { opacity: 0; }
        }
      `}</style>
    </div>
  );
};

export default SqlQuery;
