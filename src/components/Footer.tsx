/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { MapPin, Phone, Instagram, Clock, ExternalLink, ShieldCheck } from 'lucide-react';
import { trackEvent } from '../lib/analytics';

export default function Footer() {
  const MAPS_URL = 'https://share.google/knnXvTBmZGfuxo7Dt';
  // Free, high performance non-blocking embed query matching Casa Alba, Puerto Ordaz, Venezuela
  const MAPS_EMBED_URL = 'https://maps.google.com/maps?q=Casa%20Alba,%20La%20Cornisa,%20Puerto%20Ordaz,%20Venezuela&t=&z=16&ie=UTF8&iwloc=&output=embed';

  const handleMapsClick = () => {
    trackEvent('open_google_maps', { url: MAPS_URL });
  };

  const handleInstagramClick = () => {
    trackEvent('open_instagram', { username: '@monalisa.rest' });
  };

  return (
    <footer className="bg-zinc-950 border-t border-zinc-900 py-12 px-4 text-zinc-400" id="pie-pagina">
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10" id="footer-layout">
        
        {/* Contacts & Information Section */}
        <div className="space-y-6" id="footer-branding-info">
          <div>
            <h3 className="text-lg font-black text-white tracking-widest uppercase">
              Mona<span className="text-pink-500">lisa</span>
            </h3>
            <p className="text-xs text-zinc-500 font-mono tracking-wide mt-1 uppercase">
              Una auténtica obra de arte para tu paladar
            </p>
          </div>

          {/* Location and Address Details */}
          <div className="space-y-4" id="address-and-hours">
            <div className="flex items-start space-x-3 text-sm">
              <MapPin className="w-5 h-5 text-pink-500 shrink-0 mt-0.5" />
              <div>
                <p className="text-zinc-200 font-semibold text-xs uppercase tracking-wider">Dirección de la Galería</p>
                <p className="mt-1 text-xs text-zinc-400 leading-relaxed">
                  Casa Alba, la Cornisa, Puerto Ordaz, Estado Bolívar, Venezuela.
                </p>
                <a
                  href={MAPS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={handleMapsClick}
                  className="mt-2.5 inline-flex items-center text-[10px] uppercase font-bold tracking-widest text-pink-400 hover:text-pink-300 hover:underline transition-all"
                  id="link-google-maps"
                >
                  📍 Abrir ubicación original
                  <ExternalLink className="w-3 h-3 ml-1" />
                </a>
              </div>
            </div>

            {/* Business hours details */}
            <div className="flex items-start space-x-3 text-sm">
              <Clock className="w-5 h-5 text-purple-500 shrink-0 mt-0.5" />
              <div className="space-y-2">
                <p className="text-zinc-200 font-semibold text-xs uppercase tracking-wider">Horarios de Exposición</p>
                <div className="text-xs space-y-1 text-zinc-400">
                  <p className="flex justify-between gap-6">
                    <span className="font-medium">Domingo a Miércoles:</span> 
                    <span className="font-mono text-zinc-300">12:00 m. a 11:30 pm.</span>
                  </p>
                  <p className="flex justify-between gap-6">
                    <span className="font-medium">Jueves:</span> 
                    <span className="font-mono text-zinc-300">12:00 m. a 12:00 am.</span>
                  </p>
                  <p className="flex justify-between gap-6">
                    <span className="font-medium">Viernes y Sábado:</span> 
                    <span className="font-mono text-zinc-300 font-semibold text-pink-400">12:00 m. a 01:30 am.</span>
                  </p>
                </div>
              </div>
            </div>

            {/* Direct Phone order and Social Handles */}
            <div className="flex items-center space-x-6 pt-2" id="social-handles-container">
              <a
                href="https://instagram.com/monalisa.rest"
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleInstagramClick}
                className="flex items-center space-x-2 text-xs font-semibold text-zinc-300 hover:text-pink-400 transition"
                id="link-instagram"
              >
                <Instagram className="w-5 h-5 text-pink-500" />
                <span>@monalisa.rest</span>
              </a>
              <div className="flex items-center space-x-2 text-xs" id="phone-display">
                <Phone className="w-4 h-4 text-cyan-500" />
                <span className="font-mono text-zinc-300">+58 414 8632644</span>
              </div>
            </div>
          </div>
        </div>

        {/* Lightweight Embedded map preview (Non-blocking Google map load) */}
        <div className="relative rounded-2xl overflow-hidden border border-zinc-900 h-52 bg-zinc-900" id="footer-map-frame">
          <iframe
            title="Ubicación de Monalisa en Casa Alba"
            src={MAPS_EMBED_URL}
            width="100%"
            height="100%"
            style={{ border: 0, filter: 'grayscale(0.8) invert(0.9) contrast(1.1)' }}
            loading="lazy"
            referrerPolicy="no-referrer"
            id="iframe-google-maps"
          ></iframe>
          <div className="absolute bottom-3 right-3 bg-black/85 backdrop-blur-sm border border-zinc-900/40 rounded px-2.5 py-1 flex items-center space-x-1.5 shadow-md">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
            <span className="text-[9px] font-mono tracking-widest uppercase text-zinc-300 font-bold">Pto Ordaz, Venezuela</span>
          </div>
        </div>

      </div>

      <div className="max-w-5xl mx-auto border-t border-zinc-900 mt-10 pt-6 flex flex-col md:flex-row items-center justify-between text-[11px] text-zinc-650" id="footer-notes">
        <p className="font-mono text-center md:text-left">
          © {new Date().getFullYear()} Monalisa Restaurante Bistro. Todos los derechos reservados.
        </p>
        <p className="flex items-center space-x-1.5 mt-2.5 md:mt-0 font-mono tracking-wide">
          <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>Diseño Sencillo y Súper Rápido optimizado para conexiones móviles lentas.</span>
        </p>
      </div>
    </footer>
  );
}
