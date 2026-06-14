/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ShoppingCart, Star, Heart, Flame } from 'lucide-react';
import MonaLisaLogo from './MonaLisaLogo';
import { trackEvent } from '../lib/analytics';

interface HeaderProps {
  cartCount: number;
  onCartClick: () => void;
}

export default function Header({ cartCount, onCartClick }: HeaderProps) {
  const handleLogoClick = () => {
    trackEvent('click_hero_logo');
  };

  const handleFloatingCartClick = () => {
    onCartClick();
    trackEvent('open_cart_drawer', { source: 'floating_header_btn' });
  };

  return (
    <header className="relative bg-zinc-950/70 border-b border-zinc-900 pb-10 overflow-hidden" id="cabecera-principal">
      {/* Radiant Glow Spots in the Back (High aesthetics, lightweight load) */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[30%] bg-pink-600/10 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute top-[20%] right-[-10%] w-[40%] h-[30%] bg-purple-600/10 rounded-full blur-[100px] pointer-events-none"></div>

      {/* Floating Sticky Cart Indicator */}
      <div className="fixed top-5 right-5 z-40" id="floating-cart-badge">
        <button
          onClick={handleFloatingCartClick}
          className="relative p-3.5 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white rounded-full shadow-lg shadow-pink-500/20 active:scale-95 transition-all flex items-center justify-center cursor-pointer"
          id="btn-floating-cart-badge"
          aria-label="Ver Pedido"
        >
          <ShoppingCart className="w-5.5 h-5.5" />
          {cartCount > 0 && (
            <span className="absolute -top-1.5 -right-1.5 w-6 h-6 rounded-full bg-white text-zinc-900 font-mono text-[11px] font-black flex items-center justify-center shadow animate-bounce border-2 border-pink-500">
              {cartCount}
            </span>
          )}
        </button>
      </div>

      <div className="max-w-5xl mx-auto px-4 pt-10 text-center relative z-10" id="header-hero-content">
        
        {/* Restaurant Header visual logo */}
        <div className="mb-4 flex justify-center" onClick={handleLogoClick} id="header-logo-click-box">
          <MonaLisaLogo size="lg" />
        </div>

        {/* Artistic glowing neon typography headers */}
        <div className="space-y-3" id="branding-headers">
          <h1 className="text-4xl md:text-5xl font-black tracking-tight text-white uppercase text-center flex flex-col justify-center items-center">
            <span className="text-sm md:text-base tracking-[0.25em] text-pink-500 font-extrabold uppercase mb-1 drop-shadow-[0_0_5px_rgba(219,39,119,0.5)]">
              Menú Digital
            </span>
            <span className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-zinc-100 via-zinc-200 to-zinc-100 italic font-serif flex items-center gap-1.5 drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
              MONA<span className="text-pink-500 decoration-pink-500 font-bold not-italic">LISA</span>
            </span>
          </h1>

          <div className="max-w-md mx-auto" id="branding-description-block">
            <p className="text-zinc-400 font-medium text-xs md:text-sm tracking-wide leading-relaxed">
              &ldquo;Una auténtica obra de arte para tu paladar&rdquo;
            </p>
            <div className="flex justify-center items-center gap-2 mt-3 text-zinc-500 font-mono text-[10px] tracking-widest uppercase">
              <span className="flex items-center text-pink-500">
                <Flame className="w-3 h-3 mr-1 fill-current animate-pulse" />
                Gastro Bar
              </span>
              <span>•</span>
              <span className="flex items-center text-purple-400">
                <Heart className="w-3 h-3 mr-1 fill-current" />
                Colección Exclusiva
              </span>
              <span>•</span>
              <span className="flex items-center text-yellow-500">
                <Star className="w-3 h-3 mr-1 fill-current" />
                Pto Ordaz
              </span>
            </div>
          </div>
        </div>

        {/* Call to actions */}
        <div className="flex flex-wrap justify-center items-center gap-3 mt-8" id="header-actions">
          <a
            href="#seccion-menu"
            className="px-6 py-2.5 rounded-full text-xs md:text-sm font-bold bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white hover:border-pink-500 transition-all cursor-pointer shadow-sm"
            id="btn-view-menu-direct"
          >
            🍽️ Explorar Carta
          </a>
          <a
            href="#promociones-restaurante"
            className="px-6 py-2.5 rounded-full text-xs md:text-sm font-bold bg-pink-950/20 hover:bg-pink-950/40 border border-pink-500/20 text-pink-400 hover:text-pink-300 transition-all cursor-pointer shadow-sm"
            id="btn-view-promos-direct"
          >
            🔥 Ver Promos de Hoy
          </a>
        </div>

      </div>
    </header>
  );
}
