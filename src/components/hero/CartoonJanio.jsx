import React from 'react';

const CartoonJanio = ({ className }) => (
  <svg
    viewBox="0 0 200 300"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
    role="img"
  >
{/* === Legs (seated, dangling) === */}
    <path
      d="M72,205 Q70,230 66,258 Q64,270 68,275"
      stroke="hsl(220, 48%, 16%)"
      strokeWidth="20"
      strokeLinecap="round"
      fill="none"
    />
    <path
      d="M128,205 Q130,230 134,258 Q136,270 132,275"
      stroke="hsl(220, 48%, 16%)"
      strokeWidth="20"
      strokeLinecap="round"
      fill="none"
    />

    {/* Dark dress shoes */}
    <ellipse cx="68" cy="280" rx="14" ry="7" fill="hsl(0, 0%, 15%)" />
    <ellipse cx="132" cy="280" rx="14" ry="7" fill="hsl(0, 0%, 15%)" />
    {/* Sole accent */}
    <ellipse cx="68" cy="283" rx="13" ry="3" fill="hsl(0, 0%, 10%)" />
    <ellipse cx="132" cy="283" rx="13" ry="3" fill="hsl(0, 0%, 10%)" />

    {/* === Torso (dark navy suit jacket) === */}
    <rect
      x="58"
      y="128"
      width="84"
      height="82"
      rx="22"
      fill="hsl(220, 50%, 18%)"
    />
    {/* Suit lapels */}
    <path
      d="M82,128 L92,152 L100,138"
      fill="hsl(220, 55%, 15%)"
      stroke="hsl(220, 45%, 12%)"
      strokeWidth="0.8"
    />
    <path
      d="M118,128 L108,152 L100,138"
      fill="hsl(220, 55%, 15%)"
      stroke="hsl(220, 45%, 12%)"
      strokeWidth="0.8"
    />
    {/* White shirt visible between lapels */}
    <path
      d="M92,132 L100,155 L108,132"
      fill="hsl(0, 0%, 96%)"
    />
    {/* Shirt collar points */}
    <path
      d="M88,129 L94,138 L100,129"
      fill="hsl(0, 0%, 98%)"
      stroke="hsl(0, 0%, 88%)"
      strokeWidth="0.5"
    />
    <path
      d="M100,129 L106,138 L112,129"
      fill="hsl(0, 0%, 98%)"
      stroke="hsl(0, 0%, 88%)"
      strokeWidth="0.5"
    />
    {/* Red tie */}
    <path
      d="M97,136 L100,132 L103,136 L101,168 L100,170 L99,168Z"
      fill="hsl(0, 80%, 45%)"
    />
    {/* Tie knot */}
    <path
      d="M97,133 L100,130 L103,133 L101,137 L99,137Z"
      fill="hsl(0, 75%, 40%)"
    />
    {/* Tie highlight */}
    <path
      d="M99.5,138 L100.5,138 L100.5,160 L99.5,160Z"
      fill="hsl(0, 85%, 52%)"
      opacity="0.3"
    />


    {/* === Left arm (resting on surface) === */}
    <path
      d="M58,148 Q36,168 40,198"
      stroke="hsl(220, 50%, 18%)"
      strokeWidth="18"
      strokeLinecap="round"
      fill="none"
    />
    {/* Left hand */}
    <circle cx="40" cy="200" r="9" fill="hsl(25, 40%, 78%)" />

    {/* === Right arm (waving!) === */}
    <path
      d="M142,148 Q164,132 162,105"
      stroke="hsl(220, 50%, 18%)"
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

    {/* === Hair (side-parted, short brown, neat) === */}
    {/* Left section of part — thinner volume */}
    <path
      d="M62,82 Q62,42 85,36 L88,34 Q64,38 62,82Z"
      fill="hsl(25,35%,22%)"
    />
    {/* Right section of part — fuller swept mass */}
    <path
      d="M88,34 Q100,28 132,34 Q144,42 140,82 Q134,68 112,64 Q94,62 88,34Z"
      fill="hsl(25,35%,22%)"
    />
    {/* Fringe sweeping across forehead */}
    <path
      d="M86,38 Q95,50 108,52 Q118,52 128,46"
      fill="hsl(25,35%,22%)"
      stroke="hsl(25,35%,22%)"
      strokeWidth="6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    {/* Side crop — left (shorter, tighter to head) */}
    <path
      d="M62,82 Q60,72 64,62 Q66,56 70,52"
      stroke="hsl(25,30%,18%)"
      strokeWidth="5"
      strokeLinecap="round"
      fill="none"
    />
    {/* Side crop — right */}
    <path
      d="M138,82 Q140,70 136,60"
      stroke="hsl(25,30%,18%)"
      strokeWidth="4"
      strokeLinecap="round"
      fill="none"
    />
    {/* Hair swept volume highlight on top-right */}
    <path
      d="M92,38 Q112,30 134,40"
      stroke="hsl(25,32%,30%)"
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
      stroke="hsl(25,35%,22%)"
      strokeWidth="2.8"
      strokeLinecap="round"
      fill="none"
    />
    <path
      d="M108,77 Q116,73 124,80"
      stroke="hsl(25,35%,22%)"
      strokeWidth="2.8"
      strokeLinecap="round"
      fill="none"
    />

    {/* Smile with teeth */}
    <path
      d="M88,104 Q100,116 112,104"
      stroke="hsl(222,47%,8%)"
      strokeWidth="2.5"
      strokeLinecap="round"
      fill="none"
    />
    {/* Teeth showing */}
    <path
      d="M91,105 Q100,112 109,105"
      fill="hsl(0, 0%, 97%)"
    />

    {/* Rosy cheeks */}
    <circle cx="76" cy="100" r="7" fill="hsla(0,55%,62%,0.2)" />
    <circle cx="124" cy="100" r="7" fill="hsla(0,55%,62%,0.2)" />

  </svg>
);

export default CartoonJanio;
