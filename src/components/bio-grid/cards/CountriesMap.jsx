import React, { useState } from 'react';
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  Line,
} from '@vnedyalk0v/react19-simple-maps';
import { Tooltip } from 'react-tooltip';
import { countries } from '../../../data/bio-metrics';
import geoData from 'world-atlas/land-110m.json';

const CountriesMap = () => {
  const [active, setActive] = useState(null);

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-sm)' }}>
        <span style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
          Journey
        </span>
        <span style={{ fontSize: 'var(--text-sm)', color: 'var(--color-accent)' }}>
          5 countries &middot; 6 cities
        </span>
      </div>

      <div style={{ flex: 1, minHeight: 160 }}>
        <ComposableMap
          projection="geoEqualEarth"
          projectionConfig={{
            center: [-30, 38],
            scale: 180,
          }}
          style={{ width: '100%', height: '100%' }}
        >
          <Geographies geography={geoData}>
            {({ geographies }) =>
              geographies.map((geo) => (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill="hsla(222, 38%, 18%, 0.9)"
                  stroke="hsla(220, 20%, 35%, 0.4)"
                  strokeWidth={0.5}
                  style={{
                    default: { outline: 'none' },
                    hover: { outline: 'none', fill: 'hsla(222, 38%, 22%, 0.9)' },
                    pressed: { outline: 'none' },
                  }}
                />
              ))
            }
          </Geographies>

          {/* Dashed flight path connecting pins */}
          <Line
            coordinates={countries.map((c) => c.coordinates)}
            stroke="var(--color-accent)"
            strokeWidth={1.5}
            strokeDasharray="6 4"
            strokeOpacity={0.5}
            fill="none"
          />

          {/* Pin markers */}
          {countries.map((pin, i) => (
            <Marker
              key={pin.city}
              coordinates={pin.coordinates}
              onMouseEnter={() => setActive(i)}
              onMouseLeave={() => setActive(null)}
            >
              {/* Pulse ring — static glow, no continuous animation */}
              <circle r={8} fill="var(--color-accent)" opacity={0.12} />
              {/* Solid dot */}
              <circle
                r={active === i ? 6 : 4.5}
                fill="var(--color-accent)"
                stroke="var(--color-bg-deep)"
                strokeWidth={2}
                style={{ transition: 'all 0.2s ease', cursor: 'pointer' }}
                data-tooltip-id="map-tooltip"
                data-tooltip-content={`${pin.city} — ${pin.years}`}
              />
              {/* Step number */}
              <text
                textAnchor="middle"
                y={1.5}
                style={{
                  fontSize: 6,
                  fill: 'white',
                  fontWeight: 700,
                  pointerEvents: 'none',
                }}
              >
                {i + 1}
              </text>
            </Marker>
          ))}
        </ComposableMap>
      </div>

      <Tooltip
        id="map-tooltip"
        style={{
          backgroundColor: 'var(--color-bg-raised)',
          color: 'var(--color-text-primary)',
          borderRadius: 'var(--radius-md)',
          fontSize: 'var(--text-sm)',
          padding: '6px 12px',
          border: '1px solid var(--color-border)',
          zIndex: 50,
        }}
      />
    </div>
  );
};

export default CountriesMap;
