/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { WEEKLY_PROMS, LUNCH_MENU } from '../data/defaultMenu';
import { Sparkles, Calendar, Clock, Disc, ArrowRight } from 'lucide-react';
import { trackEvent } from '../lib/analytics';

export default function Promos() {
  const [activeTab, setActiveTab] = useState<'promos' | 'lunch'>('promos');

  const handleTabChange = (tab: 'promos' | 'lunch') => {
    setActiveTab(tab);
    trackEvent('view_promos_tab', { tab_name: tab });
  };

  const getDayColor = (day: string) => {
    switch (day) {
      case 'Lunes': return 'from-pink-500 to-rose-600 shadow-pink-500/20';
      case 'Martes': return 'from-purple-500 to-indigo-600 shadow-purple-500/20';
      case 'Miércoles': return 'from-cyan-500 to-blue-600 shadow-cyan-500/20';
      case 'Jueves': return 'from-emerald-500 to-teal-600 shadow-emerald-500/20';
      default: return 'from-fuchsia-500 to-pink-600 shadow-fuchsia-500/20';
    }
  };

  return (
    <section className="py-12 px-4 bg-zinc-950 border-y border-zinc-900" id="promociones-restaurante">
      <div className="max-w-5xl mx-auto" id="promos-content">
        
        {/* Toggle Controls */}
        <div className="flex justify-center mb-8" id="promos-toggle">
          <div className="bg-zinc-900 p-1 rounded-full border border-zinc-800 flex items-center space-x-1">
            <button
              onClick={() => handleTabChange('promos')}
              className={`px-6 py-2.5 rounded-full text-xs md:text-sm font-semibold transition-all duration-300 flex items-center ${
                activeTab === 'promos'
                  ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-md'
                  : 'text-zinc-400 hover:text-white'
              }`}
              id="btn-tab-promos"
            >
              <Calendar className="w-4 h-4 mr-1.5" />
              Promos de la Semana
            </button>
            <button
              onClick={() => handleTabChange('lunch')}
              className={`px-6 py-2.5 rounded-full text-xs md:text-sm font-semibold transition-all duration-300 flex items-center ${
                activeTab === 'lunch'
                  ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-md'
                  : 'text-zinc-400 hover:text-white'
              }`}
              id="btn-tab-almuerzo"
            >
              <Clock className="w-4 h-4 mr-1.5" />
              Menú Ejecutivo Almuerzo
            </button>
          </div>
        </div>

        {/* Dynamic Display Area */}
        {activeTab === 'promos' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6" id="promos-grid">
            {WEEKLY_PROMS.map((promo, idx) => (
              <div
                key={idx}
                className="relative bg-zinc-900/60 rounded-2xl p-6 border border-zinc-800/80 hover:border-pink-500/40 transition-all duration-300 group overflow-hidden"
                id={`promo-card-${promo.day.toLowerCase()}`}
              >
                {/* Glowing Corner */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-pink-500/5 rounded-full blur-2xl group-hover:bg-pink-500/10 transition-all duration-300"></div>

                <div className="flex justify-between items-start mb-4" id="promo-header">
                  <span className={`px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-white bg-gradient-to-r shadow-lg ${getDayColor(promo.day)}`}>
                    {promo.day}
                  </span>
                  {promo.badge && (
                    <span className="text-[10px] font-mono tracking-widest text-pink-400 font-semibold px-2 py-0.5 border border-pink-500/30 rounded bg-pink-950/20">
                      {promo.badge}
                    </span>
                  )}
                </div>

                <h3 className="text-lg font-bold text-zinc-100 mb-2 group-hover:text-pink-400 transition-colors duration-200">
                  {promo.title}
                </h3>
                
                <p className="text-zinc-400 text-sm leading-relaxed mb-4">
                  {promo.description}
                </p>

                <div className="flex items-center justify-between border-t border-zinc-800/50 pt-4" id="promo-footer">
                  <span className="text-xs text-zinc-500 flex items-center">
                    <Disc className="w-3.5 h-3.5 text-zinc-600 animate-spin mr-1.5" />
                    Monalisa Experiencia
                  </span>
                  <span className="text-xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-500">
                    {promo.price}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div
            className="bg-zinc-900/40 rounded-2xl p-6 md:p-8 border border-zinc-800 hover:border-purple-500/30 transition-all duration-300"
            id="lunch-menu-container"
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-zinc-800 pb-6 mb-6" id="lunch-header">
              <div>
                <h3 className="text-2xl font-black tracking-tight text-white flex items-center">
                  <Sparkles className="w-5 h-5 text-yellow-500 mr-2 animate-bounce" />
                  Menú Ejecutivo Completo
                </h3>
                <p className="text-zinc-400 text-sm mt-1 flex items-center">
                  <Calendar className="w-4 h-4 text-purple-400 mr-1.5" />
                  {LUNCH_MENU.hours}
                </p>
              </div>
              <div className="mt-4 md:mt-0 flex items-baseline" id="lunch-price">
                <span className="text-zinc-400 text-sm mr-2 font-medium">Todo por solo</span>
                <span className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">
                  {LUNCH_MENU.price}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6" id="lunch-sections">
              {/* Entradas */}
              <div className="bg-zinc-950/60 p-5 rounded-xl border border-zinc-850" id="lunch-entradas">
                <h4 className="text-xs font-mono tracking-widest text-pink-400 uppercase font-bold mb-4 pb-2 border-b border-pink-500/20">
                  1. Entrada a Elegir
                </h4>
                <ul className="space-y-3">
                  {LUNCH_MENU.entradas.map((val, idx) => (
                    <li key={idx} className="text-zinc-300 text-xs md:text-sm flex items-start">
                      <ArrowRight className="w-3.5 h-3.5 text-zinc-600 mr-2 mt-0.5" />
                      <span>{val}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Principales */}
              <div className="bg-zinc-950/60 p-5 rounded-xl border border-zinc-850 md:col-span-1" id="lunch-principales">
                <h4 className="text-xs font-mono tracking-widest text-purple-400 uppercase font-bold mb-4 pb-2 border-b border-purple-500/20">
                  2. Plato de Fondo
                </h4>
                <ul className="space-y-3">
                  {LUNCH_MENU.principales.map((val, idx) => (
                    <li key={idx} className="text-zinc-300 text-xs md:text-sm flex items-start">
                      <ArrowRight className="w-3.5 h-3.5 text-zinc-600 mr-2 mt-0.5" />
                      <span>{val}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Bebidas */}
              <div className="bg-zinc-950/60 p-5 rounded-xl border border-zinc-850" id="lunch-bebidas">
                <h4 className="text-xs font-mono tracking-widest text-cyan-400 uppercase font-bold mb-4 pb-2 border-b border-cyan-500/20">
                  3. Acompañante Líquido
                </h4>
                <ul className="space-y-3">
                  {LUNCH_MENU.bebidas.map((val, idx) => (
                    <li key={idx} className="text-zinc-300 text-xs md:text-sm flex items-start">
                      <ArrowRight className="w-3.5 h-3.5 text-zinc-600 mr-2 mt-0.5" />
                      <span>{val}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <p className="text-[10px] text-zinc-500 font-mono mt-6 text-center">
              * Válido únicamente para consumo dentro del local. Sujeto a disponibilidad de ingredientes diarios.
            </p>
          </div>
        )}

      </div>
    </section>
  );
}
