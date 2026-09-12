'use client';

import React from 'react';

interface Props {
  className?: string;
  size?: number;
}

export const WardConnectAnimatedLoader: React.FC<Props> = ({ className = '', size = 120 }) => {
  return (
    <div className={`inline-flex flex-col items-center justify-center ${className}`} style={{ width: size, height: size }}>
      <svg
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        <style>{`
          @keyframes orbitDots {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
          @keyframes glowArc {
            0%, 100% { stroke: #059669; opacity: 1; }
            50% { stroke: #10B981; opacity: 0.8; }
          }
          .orbit-group {
            transform-origin: 50px 50px;
            animation: orbitDots 3.5s linear infinite;
          }
          .embrace-arc {
            animation: glowArc 3s ease-in-out infinite;
          }
        `}</style>

        {/* Outer Protective Embrace Arc */}
        <path
          d="M 68 20 A 38 38 0 1 0 68 80"
          stroke="#059669"
          strokeWidth="10"
          strokeLinecap="round"
          className="embrace-arc"
        />
        <path
          d="M 62 26 A 31 31 0 1 0 62 74"
          stroke="#10B981"
          strokeWidth="3.5"
          strokeLinecap="round"
          opacity="0.6"
        />

        {/* Orbiting 3 Colored Dots Group traveling around the arc */}
        <g className="orbit-group">
          {/* Dot 1: Amber Gold - Member */}
          <circle cx="50" cy="18" r="7" fill="#F59E0B" />

          {/* Dot 2: Ocean Blue - Residents */}
          <circle cx="82" cy="50" r="7" fill="#0284C7" />

          {/* Dot 3: Crimson Rose - Volunteers */}
          <circle cx="50" cy="82" r="7" fill="#E11D48" />
        </g>
      </svg>
    </div>
  );
};
