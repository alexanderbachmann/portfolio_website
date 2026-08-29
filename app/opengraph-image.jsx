import { ImageResponse } from 'next/og';
import { site } from '@/data/site';

export const alt = `${site.name} — ${site.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '80px',
          background:
            'linear-gradient(135deg, hsl(222, 47%, 6%) 0%, hsl(222, 45%, 10%) 100%)',
          color: 'white',
          fontFamily: 'sans-serif',
        }}
      >
        <div
          style={{
            fontSize: 28,
            color: 'hsl(220, 12%, 62%)',
            letterSpacing: 4,
            textTransform: 'uppercase',
            marginBottom: 24,
          }}
        >
          {site.role}
        </div>
        <div style={{ fontSize: 76, fontWeight: 700, lineHeight: 1.1 }}>
          {site.name}
        </div>
        <div
          style={{
            width: 140,
            height: 8,
            background: 'hsl(20, 88%, 52%)',
            borderRadius: 4,
            marginTop: 36,
          }}
        />
      </div>
    ),
    { ...size }
  );
}
