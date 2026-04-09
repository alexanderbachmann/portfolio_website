import React from 'react';

const CartoonJanio = ({ className }) => (
  <svg
    viewBox="0 0 200 300"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
    role="img"
  >
    <defs>
      <linearGradient id="screen-glow" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#818cf8" stopOpacity="0.5" />
        <stop offset="100%" stopColor="hsl(20,88%,48%)" stopOpacity="0.5" />
      </linearGradient>
    </defs>

    {/* === Legs (seated, dangling) === */}
    <path
      d="M72,205 Q70,230 66,258 Q64,270 68,275"
      stroke="hsl(218, 42%, 26%)"
      strokeWidth="20"
      strokeLinecap="round"
      fill="none"
    />
    <path
      d="M128,205 Q130,230 134,258 Q136,270 132,275"
      stroke="hsl(218, 42%, 26%)"
      strokeWidth="20"
      strokeLinecap="round"
      fill="none"
    />

    {/* White sneakers */}
    <ellipse cx="68" cy="280" rx="14" ry="7" fill="hsl(0, 0%, 92%)" />
    <ellipse cx="132" cy="280" rx="14" ry="7" fill="hsl(0, 0%, 92%)" />
    {/* Sole accent */}
    <ellipse cx="68" cy="283" rx="13" ry="3" fill="hsl(0, 0%, 82%)" />
    <ellipse cx="132" cy="283" rx="13" ry="3" fill="hsl(0, 0%, 82%)" />

    {/* === Torso (blue suit jacket) === */}
    <rect
      x="58"
      y="128"
      width="84"
      height="82"
      rx="22"
      fill="hsl(218, 45%, 28%)"
    />
    {/* Suit lapels */}
    <path
      d="M82,128 L92,152 L100,138"
      fill="hsl(218, 50%, 24%)"
      stroke="hsl(218, 40%, 20%)"
      strokeWidth="0.8"
    />
    <path
      d="M118,128 L108,152 L100,138"
      fill="hsl(218, 50%, 24%)"
      stroke="hsl(218, 40%, 20%)"
      strokeWidth="0.8"
    />
    {/* White shirt visible between lapels */}
    <path
      d="M92,132 L100,152 L108,132"
      fill="hsl(0, 0%, 94%)"
    />
    {/* Shirt collar points */}
    <path
      d="M88,130 L94,138 L100,130"
      fill="hsl(0, 0%, 96%)"
      stroke="hsl(0, 0%, 88%)"
      strokeWidth="0.5"
    />
    <path
      d="M100,130 L106,138 L112,130"
      fill="hsl(0, 0%, 96%)"
      stroke="hsl(0, 0%, 88%)"
      strokeWidth="0.5"
    />
    {/* Suit button */}
    <circle cx="100" cy="168" r="2.5" fill="hsl(218, 40%, 20%)" />

    {/* === Left arm (resting on surface) === */}
    <path
      d="M58,148 Q36,168 40,198"
      stroke="hsl(218, 45%, 28%)"
      strokeWidth="18"
      strokeLinecap="round"
      fill="none"
    />
    {/* Left hand */}
    <circle cx="40" cy="200" r="9" fill="hsl(25, 40%, 78%)" />

    {/* === Right arm (waving!) === */}
    <path
      d="M142,148 Q164,132 162,105"
      stroke="hsl(218, 45%, 28%)"
      strokeWidth="18"
      strokeLinecap="round"
      fill="none"
    />
    {/* Right hand (open wave) */}
    <circle cx="162" cy="102" r="9" fill="hsl(25, 40%, 78%)" />
    {/* Little wave fingers */}
    <path
      d="M155,94 Q154,86 156,82"
      stroke="hsl(25, 40%, 78%)"
      strokeWidth="4"
      strokeLinecap="round"
      fill="none"
    />
    <path
      d="M161,92 Q161,84 162,79"
      stroke="hsl(25, 40%, 78%)"
      strokeWidth="4"
      strokeLinecap="round"
      fill="none"
    />
    <path
      d="M167,94 Q168,86 167,82"
      stroke="hsl(25, 40%, 78%)"
      strokeWidth="4"
      strokeLinecap="round"
      fill="none"
    />

    {/* === Head === */}
    <ellipse cx="100" cy="90" rx="36" ry="46" fill="hsl(25, 40%, 78%)" />

    {/* === Hair (side-parted, swept right, covers forehead) === */}
    {/* Left section of part — thinner volume */}
    <path
      d="M62,82 Q62,42 85,36 L88,34 Q64,38 62,82Z"
      fill="hsl(20,30%,18%)"
    />
    {/* Right section of part — fuller swept mass, lower to cover forehead */}
    <path
      d="M88,34 Q100,28 132,34 Q144,42 140,82 Q134,68 112,64 Q94,62 88,34Z"
      fill="hsl(20,30%,18%)"
    />
    {/* Fringe sweeping across forehead */}
    <path
      d="M86,38 Q95,50 108,52 Q118,52 128,46"
      fill="hsl(20,30%,18%)"
      stroke="hsl(20,30%,18%)"
      strokeWidth="6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    {/* Side crop — left (shorter, tighter to head) */}
    <path
      d="M62,82 Q60,72 64,62 Q66,56 70,52"
      stroke="hsl(20,25%,14%)"
      strokeWidth="5"
      strokeLinecap="round"
      fill="none"
    />
    {/* Side crop — right */}
    <path
      d="M138,82 Q140,70 136,60"
      stroke="hsl(20,25%,14%)"
      strokeWidth="4"
      strokeLinecap="round"
      fill="none"
    />
    {/* Hair swept volume highlight on top-right */}
    <path
      d="M92,38 Q112,30 134,40"
      stroke="hsl(20,28%,26%)"
      strokeWidth="3"
      strokeLinecap="round"
      fill="none"
    />
    {/* Part line */}
    <line
      x1="87" y1="36" x2="84" y2="52"
      stroke="hsl(25, 40%, 78%)"
      strokeWidth="1.5"
      opacity="0.35"
    />

    {/* === Face === */}

    {/* Eyes — blue iris */}
    <ellipse cx="84" cy="88" rx="5" ry="5.5" fill="hsl(210, 70%, 55%)" />
    <ellipse cx="116" cy="88" rx="5" ry="5.5" fill="hsl(210, 70%, 55%)" />
    {/* Iris ring for definition */}
    <ellipse cx="84" cy="88" rx="5.5" ry="6" fill="none" stroke="hsl(210, 60%, 35%)" strokeWidth="1" />
    <ellipse cx="116" cy="88" rx="5.5" ry="6" fill="none" stroke="hsl(210, 60%, 35%)" strokeWidth="1" />
    {/* Pupils */}
    <circle cx="84" cy="88" r="2.2" fill="hsl(222, 47%, 8%)" />
    <circle cx="116" cy="88" r="2.2" fill="hsl(222, 47%, 8%)" />
    {/* Eye highlights */}
    <circle cx="86" cy="86" r="2" fill="white" opacity="0.9" />
    <circle cx="118" cy="86" r="2" fill="white" opacity="0.9" />

    {/* Eyebrows — slightly angular */}
    <path
      d="M76,80 Q84,73 92,77"
      stroke="hsl(20,30%,18%)"
      strokeWidth="2.8"
      strokeLinecap="round"
      fill="none"
    />
    <path
      d="M108,77 Q116,73 124,80"
      stroke="hsl(20,30%,18%)"
      strokeWidth="2.8"
      strokeLinecap="round"
      fill="none"
    />

    {/* Smile */}
    <path
      d="M88,104 Q100,116 112,104"
      stroke="hsl(222,47%,8%)"
      strokeWidth="2.5"
      strokeLinecap="round"
      fill="none"
    />

    {/* Rosy cheeks */}
    <circle cx="76" cy="100" r="7" fill="hsla(0,55%,62%,0.2)" />
    <circle cx="124" cy="100" r="7" fill="hsla(0,55%,62%,0.2)" />

    {/* === Laptop on lap === */}
    <g>
      {/* Laptop base */}
      <rect
        x="72"
        y="190"
        width="56"
        height="6"
        rx="2"
        fill="hsl(222,35%,16%)"
      />
      {/* Laptop screen */}
      <rect
        x="74"
        y="170"
        width="52"
        height="22"
        rx="3"
        fill="hsl(222,38%,12%)"
        stroke="hsl(222,30%,22%)"
        strokeWidth="1"
      />
      {/* Screen glow */}
      <rect
        x="77"
        y="173"
        width="46"
        height="16"
        rx="2"
        fill="url(#screen-glow)"
      />
    </g>
  </svg>
);

export default CartoonJanio;
