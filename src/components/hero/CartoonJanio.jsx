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
      stroke="hsl(222,35%,22%)"
      strokeWidth="20"
      strokeLinecap="round"
      fill="none"
    />
    <path
      d="M128,205 Q130,230 134,258 Q136,270 132,275"
      stroke="hsl(222,35%,22%)"
      strokeWidth="20"
      strokeLinecap="round"
      fill="none"
    />

    {/* Shoes */}
    <ellipse cx="68" cy="280" rx="14" ry="7" fill="hsl(222,28%,15%)" />
    <ellipse cx="132" cy="280" rx="14" ry="7" fill="hsl(222,28%,15%)" />

    {/* === Torso (navy sweater) === */}
    <rect
      x="58"
      y="128"
      width="84"
      height="82"
      rx="22"
      fill="hsl(222,42%,20%)"
    />

    {/* White collar peek */}
    <path
      d="M90,130 L100,144 L110,130"
      fill="hsl(0,0%,92%)"
      stroke="hsl(0,0%,85%)"
      strokeWidth="0.5"
    />

    {/* === Left arm (resting on surface) === */}
    <path
      d="M58,148 Q36,168 40,198"
      stroke="hsl(222,42%,20%)"
      strokeWidth="18"
      strokeLinecap="round"
      fill="none"
    />
    {/* Left hand */}
    <circle cx="40" cy="200" r="9" fill="hsl(25,45%,70%)" />

    {/* === Right arm (waving!) === */}
    <path
      d="M142,148 Q164,132 162,105"
      stroke="hsl(222,42%,20%)"
      strokeWidth="18"
      strokeLinecap="round"
      fill="none"
    />
    {/* Right hand (open wave) */}
    <circle cx="162" cy="102" r="9" fill="hsl(25,45%,70%)" />
    {/* Little wave fingers */}
    <path
      d="M155,94 Q154,86 156,82"
      stroke="hsl(25,45%,70%)"
      strokeWidth="4"
      strokeLinecap="round"
      fill="none"
    />
    <path
      d="M161,92 Q161,84 162,79"
      stroke="hsl(25,45%,70%)"
      strokeWidth="4"
      strokeLinecap="round"
      fill="none"
    />
    <path
      d="M167,94 Q168,86 167,82"
      stroke="hsl(25,45%,70%)"
      strokeWidth="4"
      strokeLinecap="round"
      fill="none"
    />

    {/* === Head === */}
    <ellipse cx="100" cy="90" rx="40" ry="44" fill="hsl(25,45%,70%)" />

    {/* === Hair (short, cropped sides, fuller on top) === */}
    <path
      d="M60,82 Q60,38 100,34 Q140,38 140,82 Q132,66 100,62 Q68,66 60,82Z"
      fill="hsl(20,30%,18%)"
    />
    {/* Hair side trim (cropped look) */}
    <path
      d="M62,82 Q60,70 64,60"
      stroke="hsl(20,25%,14%)"
      strokeWidth="4"
      strokeLinecap="round"
      fill="none"
    />
    <path
      d="M138,82 Q140,70 136,60"
      stroke="hsl(20,25%,14%)"
      strokeWidth="4"
      strokeLinecap="round"
      fill="none"
    />
    {/* Hair highlight */}
    <path
      d="M78,46 Q100,40 122,46"
      stroke="hsl(20,28%,26%)"
      strokeWidth="3"
      strokeLinecap="round"
      fill="none"
    />

    {/* === Face === */}

    {/* Eyes */}
    <ellipse cx="84" cy="88" rx="5" ry="5.5" fill="hsl(222,47%,8%)" />
    <ellipse cx="116" cy="88" rx="5" ry="5.5" fill="hsl(222,47%,8%)" />
    {/* Eye highlights */}
    <circle cx="86" cy="86" r="2" fill="white" opacity="0.9" />
    <circle cx="118" cy="86" r="2" fill="white" opacity="0.9" />

    {/* Eyebrows */}
    <path
      d="M76,78 Q84,74 92,78"
      stroke="hsl(20,30%,18%)"
      strokeWidth="2.5"
      strokeLinecap="round"
      fill="none"
    />
    <path
      d="M108,78 Q116,74 124,78"
      stroke="hsl(20,30%,18%)"
      strokeWidth="2.5"
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
    <circle cx="74" cy="100" r="7" fill="hsla(0,55%,62%,0.2)" />
    <circle cx="126" cy="100" r="7" fill="hsla(0,55%,62%,0.2)" />

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
