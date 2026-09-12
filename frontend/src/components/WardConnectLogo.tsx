'use client';

import React from 'react';

interface Props {
  className?: string;
  size?: number;
  animated?: boolean;
}

export const WardConnectLogo: React.FC<Props> = ({ className = '', size = 36, animated = true }) => {
  return (
    <div className={`inline-flex items-center justify-center ${className}`} style={{ width: size, height: size }}>
      <svg
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        <style>{`
          @keyframes arcGlow {
            0%, 100% { stroke: #059669; opacity: 1; }
            50% { stroke: #10B981; opacity: 0.85; }
          }
          @keyframes dotPulse1 {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.15); }
          }
          @keyframes dotPulse2 {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.15); }
          }
          @keyframes dotPulse3 {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.15); }
          }
          .animate-arc {
            animation: arcGlow 3s ease-in-out infinite;
          }
          .animate-dot-1 {
            transform-origin: 36px 50px;
            animation: dotPulse1 2.4s ease-in-out infinite 0s;
          }
          .animate-dot-2 {
            transform-origin: 56px 50px;
            animation: dotPulse2 2.4s ease-in-out infinite 0.4s;
          }
          .animate-dot-3 {
            transform-origin: 76px 50px;
            animation: dotPulse3 2.4s ease-in-out infinite 0.8s;
          }
        `}</style>

        {/* Outer Protective Embrace Arc (Emerald Green) */}
        <path
          d="M 68 20 A 38 38 0 1 0 68 80"
          stroke="#059669"
          strokeWidth="11"
          strokeLinecap="round"
          className={animated ? 'animate-arc' : ''}
        />
        <path
          d="M 62 26 A 31 31 0 1 0 62 74"
          stroke="#10B981"
          strokeWidth="4"
          strokeLinecap="round"
          opacity="0.6"
        />

        {/* 3 Distinct Colored Community Dots with Staggered Pulsing */}
        {/* Dot 1: Amber Gold - Ward Member */}
        <circle
          cx="36"
          cy="50"
          r="8"
          fill="#F59E0B"
          className={animated ? 'animate-dot-1' : ''}
        />

        {/* Dot 2: Ocean Blue - Ward Residents */}
        <circle
          cx="56"
          cy="50"
          r="8"
          fill="#0284C7"
          className={animated ? 'animate-dot-2' : ''}
        />

        {/* Dot 3: Crimson Rose - Volunteer Task Force */}
        <circle
          cx="76"
          cy="50"
          r="8"
          fill="#E11D48"
          className={animated ? 'animate-dot-3' : ''}
        />
      </svg>
    </div>
  );
};
