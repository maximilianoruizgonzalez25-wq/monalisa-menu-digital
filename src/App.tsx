/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Promos from './components/Promos';
import MenuGrid from './components/MenuGrid';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';
import { Dish, CartItem } from './types';
import { initializeGA4, trackEvent } from './lib/analytics';
import { fetchExchangeRate, ExchangeRateData } from './lib/exchangeRate';

const CART_STORAGE_KEY = 'monalisa_cart_items';

export default function App() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [exchangeRate, setExchangeRate] = useState<ExchangeRateData>({
    rate: 42.5,
    source: 'Valores locales predeterminados',
    lastUpdated: 'Cargando tasa...',
    isRealTime: false
  });
  const [refreshingRate, setRefreshingRate] = useState(false);

  const loadExchangeRate = async () => {
    setRefreshingRate(true);
    const data = await fetchExchangeRate();
    setExchangeRate(data);
    setRefreshingRate(false);
  };

  // Initialize asynchronously Google Analytics 4 on app boot and fetch rate
  useEffect(() => {
    initializeGA4();
    trackEvent('app_load', { timestamp: new Date().toISOString() });
    loadExchangeRate();
  }, []);

  // Hydrate cart from localStorage on first render
  useEffect(() => {
    try {
      const stored = localStorage.getItem(CART_STORAGE_KEY);
      if (stored) {
        setCartItems(JSON.parse(stored));
      }
    } catch (e) {
      console.warn('Failed to recover cart from localStorage', e);
    }
  }, []);

  // Persist cart additions
  const saveCart = (items: CartItem[]) => {
    setCartItems(items);
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    } catch (e) {
      console.warn('Failed to persist cart to localStorage', e);
    }
  };

  const handleAddToCart = (dish: Dish, quantity: number, selectedOption?: string) => {
    const existingIndex = cartItems.findIndex(
      (item) => item.dish.id === dish.id && item.selectedOption === selectedOption
    );

    let newItems = [...cartItems];
    if (existingIndex > -1) {
      newItems[existingIndex].quantity += quantity;
    } else {
      newItems.push({ dish, quantity, selectedOption });
    }

    saveCart(newItems);
  };

  const handleUpdateProductQuantity = (dishId: string, quantity: number, selectedOption?: string) => {
    let newItems = [...cartItems];
    const index = newItems.findIndex(
      (item) => item.dish.id === dishId && item.selectedOption === selectedOption
    );

    if (index > -1) {
      if (quantity <= 0) {
        newItems.splice(index, 1);
        trackEvent('remove_from_cart', { dish_id: dishId, option: selectedOption || 'none' });
      } else {
        newItems[index].quantity = quantity;
      }
      saveCart(newItems);
    }
  };

  const handleClearCart = () => {
    saveCart([]);
    setIsCartOpen(false);
  };

  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="min-h-screen bg-[#050507] text-[#eaeaea] font-sans antialiased selection:bg-pink-500/30 selection:text-white" id="main-restaurant-application">
      {/* Background Ambience styling overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-zinc-900/40 via-[#050507] to-[#050507] pointer-events-none z-0"></div>

      {/* Structured Single-Screen View Layout (Fully optimized, responsive, mobile prioritized) */}
      <div className="relative z-10" id="spa-content-wrapper">
        <Header 
          cartCount={totalCartCount} 
          onCartClick={() => setIsCartOpen(true)} 
        />

        <main id="main-content-scroller">
          <Promos />
          <MenuGrid 
            onAddToCart={handleAddToCart} 
            cartItems={cartItems} 
            usdToVes={exchangeRate.rate}
            isRealTimeRate={exchangeRate.isRealTime}
            onRefreshRate={loadExchangeRate}
          />
        </main>

        <Footer />
      </div>

      {/* Drawer / Slide-Over cart overlay */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateProductQuantity}
        onClearCart={handleClearCart}
        usdToVes={exchangeRate.rate}
        exchangeRateInfo={exchangeRate}
      />
    </div>
  );
}
