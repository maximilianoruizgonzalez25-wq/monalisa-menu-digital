/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { trackEvent } from './analytics';

export interface ExchangeRateData {
  rate: number;
  source: string;
  lastUpdated: string;
  isRealTime: boolean;
}

const LOCAL_STORAGE_KEY = 'monalisa_exchange_rate_data';
const FALLBACK_RATE = 42.5; // Highly realistic default for Venezuela

/**
 * Fetches the USD to VES exchange rate from a safe and secure public API.
 * Uses a cached local copy for instant offline rendering, then updates in the background.
 */
export async function fetchExchangeRate(): Promise<ExchangeRateData> {
  // 1. Try to get cached rate from storage for immediate display
  let cached: ExchangeRateData | null = null;
  try {
    const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (stored) {
      cached = JSON.parse(stored);
    }
  } catch (error) {
    console.warn('Unable to read exchange rate from localStorage', error);
  }

  try {
    // 2. Fetch live rate from a completely free, fast, and secure API
    // ExchangeRate-API is backed by CDN and requires No API keys (unlimited read config proxy)
    const response = await fetch('https://open.er-api.com/v6/latest/USD');
    if (!response.ok) {
      throw new Error(`Exchange rate API responded with status ${response.status}`);
    }

    const data = await response.json();
    if (data && data.rates && typeof data.rates.VES === 'number') {
      const liveRate = data.rates.VES;
      const rateInfo: ExchangeRateData = {
        rate: Number(liveRate.toFixed(2)),
        source: 'Banco Central (BCV) / API Internacional',
        lastUpdated: new Date().toLocaleDateString('es-VE', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit'
        }),
        isRealTime: true
      };

      // Save to cache
      try {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(rateInfo));
      } catch (e) {
        console.warn('Unable to cache exchange rate to localStorage', e);
      }

      trackEvent('fetch_exchange_rate_success', { rate: rateInfo.rate, source: rateInfo.source });
      return rateInfo;
    }

    throw new Error('Invalid rate data inside API response');
  } catch (error) {
    console.warn('⚠️ Real-time exchange rate fetch failed (Network restriction/offline). Using fallback.', error);
    trackEvent('fetch_exchange_rate_failed', { error: String(error) });

    // Return cached value if available, otherwise default
    if (cached) {
      return {
        ...cached,
        isRealTime: false // Mark as staled or loaded offline
      };
    }

    return {
      rate: FALLBACK_RATE,
      source: 'Tasa referencial de la casa (Fijada)',
      lastUpdated: 'Tasa base por defecto (Línea sin conexión)',
      isRealTime: false
    };
  }
}
