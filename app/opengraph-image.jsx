import { ImageResponse } from 'next/og';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { metrics, site } from '@/data/site';
import { experiences } from '@/data/experiences';

export const alt = `${site.name}, ${site.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

const NAVY = 'hsl(222, 47%, 6%)';
const ORANGE = 'hsl(20, 88%, 52%)';
const OFF_WHITE = 'hsl(220, 20%, 88%)';
const MUTED = 'hsl(220, 12%, 62%)';
const LINE = 'hsla(220, 30%, 70%, 0.16)';
const GRID = 'hsla(220, 30%, 70%, 0.06)';

/* Satori cannot synthesize bold and passing `fonts` replaces the bundled
   default font, so both weights ship as static WOFF files (Satori reads
   TTF, OTF and WOFF, not WOFF2). A missing file falls back to the default
   font instead of failing the build. */
async function loadFonts() {
  const dir = join(process.cwd(), 'src/assets/fonts');
  try {
    const [regular, bold] = await Promise.all([
      readFile(join(dir, 'SpaceGrotesk-Regular.woff')),
      readFile(join(dir, 'SpaceGrotesk-Bold.woff')),
    ]);
    return [
      { name: 'Space Grotesk', data: regular, weight: 400, style: 'normal' },
      { name: 'Space Grotesk', data: bold, weight: 700, style: 'normal' },
    ];
  } catch {
    return null;
  }
}

export default async function OpenGraphImage() {
  const fonts = await loadFonts();
  const employers = experiences.map((exp) => exp.company);
  const nameParts = site.name.split(' ');
  const surname = nameParts.pop();
  const givenNames = nameParts.join(' ');
  const summary = metrics
    .map((m) => `${m.value}${m.suffix} ${m.label}`)
    .join('  ·  ');

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '72px 80px',
          background: NAVY,
          color: 'white',
          fontFamily: fonts ? 'Space Grotesk' : 'sans-serif',
        }}
      >
        {/* Faint grid: one layer per axis */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: 1200,
            height: 630,
            backgroundImage: `repeating-linear-gradient(0deg, ${GRID} 0px, ${GRID} 1px, transparent 1px, transparent 48px)`,
          }}
        />
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: 1200,
            height: 630,
            backgroundImage: `repeating-linear-gradient(90deg, ${GRID} 0px, ${GRID} 1px, transparent 1px, transparent 48px)`,
          }}
        />
        {/* Blooms: navy top-right, warm bottom-left */}
        <div
          style={{
            position: 'absolute',
            top: -240,
            right: -180,
            width: 760,
            height: 760,
            borderRadius: 380,
            background:
              'radial-gradient(circle at center, hsla(222, 45%, 20%, 0.95) 0%, hsla(222, 45%, 20%, 0) 65%)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: -280,
            left: -220,
            width: 680,
            height: 680,
            borderRadius: 340,
            background:
              'radial-gradient(circle at center, hsla(20, 88%, 52%, 0.16) 0%, hsla(20, 88%, 52%, 0) 65%)',
          }}
        />

        {/* Top: kicker + name */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 14,
              fontSize: 24,
              color: MUTED,
              letterSpacing: 4,
              textTransform: 'uppercase',
            }}
          >
            <div style={{ width: 10, height: 10, borderRadius: 5, background: ORANGE }} />
            {site.role}
          </div>
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              marginTop: 28,
              fontSize: 88,
              fontWeight: 700,
              lineHeight: 1.02,
              letterSpacing: -3,
            }}
          >
            <span>{givenNames}&nbsp;</span>
            <span style={{ color: ORANGE }}>{surname}</span>
          </div>
        </div>

        {/* Bottom: employer pills + location + headline metrics */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 26 }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
            {employers.map((name) => (
              <div
                key={name}
                style={{
                  display: 'flex',
                  padding: '8px 18px',
                  borderRadius: 999,
                  border: `1px solid ${LINE}`,
                  background: 'hsla(0, 0%, 100%, 0.04)',
                  fontSize: 20,
                  color: OFF_WHITE,
                }}
              >
                {name}
              </div>
            ))}
          </div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              fontSize: 20,
              color: MUTED,
              letterSpacing: 1,
            }}
          >
            <span>{experiences[0].location}</span>
            <span>{summary}</span>
          </div>
        </div>
      </div>
    ),
    { ...size, ...(fonts ? { fonts } : {}) }
  );
}
