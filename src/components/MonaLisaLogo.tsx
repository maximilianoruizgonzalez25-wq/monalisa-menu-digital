/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export default function MonaLisaLogo({ className = '', size = 'md' }: LogoProps) {
  const containerClasses = {
    sm: 'w-16 h-16',
    md: 'w-28 h-28 md:w-36 md:h-36',
    lg: 'w-48 h-48 md:w-56 md:h-56',
  };

  const frameBorderClasses = {
    sm: 'border-2 shadow-[0_0_10px_#db2777]',
    md: 'border-4 shadow-[0_0_20px_#db2777,0_0_5px_#06b6d4]',
    lg: 'border-[6px] shadow-[0_0_35px_#db2777,0_0_10px_#06b6d4]',
  };

  return (
    <div className={`relative flex flex-col items-center justify-center ${className}`} id="logo-monalisa-container">
      {/* Decorative Golden Gilded Frame with Neon Backlight */}
      <div 
        className={`relative ${containerClasses[size]} bg-neutral-900 overflow-hidden border-yellow-500 rounded-md transition-transform duration-300 hover:scale-105 select-none ${frameBorderClasses[size]}`}
        id="antique-frame"
      >
        {/* Artistic Renaissance Monalisa Vector/CSS with Neon Pink Bubble Gum */}
        <div className="absolute inset-0 flex items-center justify-center p-2 bg-gradient-to-t from-black via-zinc-900 to-neutral-850" id="canvas-bg">
          <svg
            viewBox="0 0 100 100"
            className="w-full h-full opacity-90"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {/* Dark Hair Silhouette */}
            <path d="M25,85 C22,40 32,15 50,15 C68,15 78,40 75,85" fill="#18181b" stroke="#334155" strokeWidth="1" />
            
            {/* Veil outline */}
            <path d="M26,50 Q15,65 24,85" stroke="#db2777" strokeWidth="0.5" opacity="0.4" />
            <path d="M74,50 Q85,65 76,85" stroke="#db2777" strokeWidth="0.5" opacity="0.4" />

            {/* Shoulders & Clothing */}
            <path d="M15,90 C25,80 35,78 50,82 C65,78 75,80 85,90" fill="#27272a" stroke="#ca8a04" strokeWidth="1" />
            <path d="M38,81 C42,75 58,75 62,81" fill="#71717a" stroke="#ca8a04" strokeWidth="0.5" />
            
            {/* Oval Face */}
            <path d="M35,35 C33,18 67,18 65,35 C64,52 36,52 35,35 Z" fill="#ffd1a9" stroke="#b45309" strokeWidth="0.5" />
            
            {/* Monalisa Hair locks framing face */}
            <path d="M34,25 Q38,40 36,50" stroke="#18181b" strokeWidth="3" />
            <path d="M66,25 Q62,40 64,50" stroke="#18181b" strokeWidth="3" />
            
            {/* Delicate Eyes */}
            <path d="M42,33 Q46,31 50,33" stroke="#451a03" strokeWidth="1" />
            <path d="M58,33 Q54,31 50,33" stroke="#451a03" strokeWidth="1" />
            <circle cx="45" cy="35" r="1.5" fill="#1e293b" />
            <circle cx="55" cy="35" r="1.5" fill="#1e293b" />
            
            {/* Sfumato Nose & Brows */}
            <path d="M50,28 L50,42" stroke="#b45309" strokeWidth="0.75" opacity="0.7" />
            <path d="M47,43 C49,44 51,44 53,43" stroke="#b45309" strokeWidth="1" opacity="0.7" />

            {/* Iconic Subtle Renaissance Smile */}
            <path d="M44,48 Q50,51 56,48" stroke="#ca8a04" strokeWidth="1.2" />
            
            {/* Hands crossed silhouettes at the bottom */}
            <ellipse cx="50" cy="85" rx="15" ry="6" fill="#ffd1a9" stroke="#b45309" strokeWidth="0.5" />

            {/* Glowing Pink Bubble Gum (The Restaurant Core Identity Logo) */}
            <circle cx="50" cy="48" r="9" fill="#f472b6" className="animate-pulse" />
            {/* Bubble shine */}
            <circle cx="47" cy="45" r="2.5" fill="#ffffff" opacity="0.8" />
          </svg>
        </div>

        {/* Vintage Frame Corner Highlights */}
        <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-yellow-300"></div>
        <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-yellow-300"></div>
        <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-yellow-300"></div>
        <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-yellow-300"></div>
      </div>
    </div>
  );
}
