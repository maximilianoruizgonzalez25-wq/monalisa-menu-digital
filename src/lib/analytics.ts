/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

// Simple Google Analytics 4 lightweight tracking helper
// Specially optimized for slow Venezuelan mobile networks (asynchronous, non-blocking)

declare global {
  interface Window {
    dataLayer: any[];
    gtag: (...args: any[]) => void;
  }
}

const DEFAULT_GA_ID = 'G-M5N4L1S4'; // Fallback GA4 Measurement ID for Monalisa Restaurant

export function initializeGA4() {
  if (typeof window === 'undefined') return;

  try {
    // Check if script is already injected
    if (document.getElementById('google-analytics')) return;

    const gaId = DEFAULT_GA_ID;

    // Create script element
    const script = document.createElement('script');
    script.id = 'google-analytics';
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`;
    
    script.onload = () => {
      window.dataLayer = window.dataLayer || [];
      window.gtag = function (...args: any[]) {
        window.dataLayer.push(args);
      };
      window.gtag('js', new Date());
      window.gtag('config', gaId, {
        page_title: 'Monalisa Menú Digital - Landing Page',
        page_path: window.location.pathname,
        // Venezuela slow connections setting: transport beacon
        transport_type: 'beacon',
      });
      console.log('✅ Google Analytics 4 Initialized Asynchronously with ID:', gaId);
    };

    document.head.appendChild(script);
  } catch (error) {
    console.warn('⚠️ Google Analytics injection failed or blocked by client:', error);
  }
}

// Track custom event with GA4
export function trackEvent(eventName: string, params?: Record<string, any>) {
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    try {
      window.gtag('event', eventName, params);
      console.log(`📊 GA4 Event Tracked: "${eventName}"`, params);
    } catch (e) {
      console.warn('Google Analytics event tracking error:', e);
    }
  } else {
    // Fallback console log in dev
    console.log(`📊 [Dev-Analíticas] Evento "${eventName}" registrado en consola local:`, params);
  }
}
