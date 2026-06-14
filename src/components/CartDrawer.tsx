/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { CartItem } from '../types';
import { ShoppingBag, X, Send, AlertCircle, Trash2, Plus, Minus } from 'lucide-react';
import { trackEvent } from '../lib/analytics';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (dishId: string, quantity: number, selectedOption?: string) => void;
  onClearCart: () => void;
  usdToVes: number;
  exchangeRateInfo?: { rate: number; source: string; lastUpdated: string; isRealTime: boolean };
}

export default function CartDrawer({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onClearCart,
  usdToVes,
  exchangeRateInfo
}: CartDrawerProps) {
  // Configurable restaurant WhatsApp contact number in Venezuela (starts with 58)
  const WHATSAPP_PHONE = '584148632644'; // Example authentic Puerto Ordaz contact WhatsApp

  const [deliveryType, setDeliveryType] = useState<'delivery' | 'pickup'>('pickup');
  const [customerName, setCustomerName] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');
  const [customerNotes, setCustomerNotes] = useState('');

  const USD_TO_VES = usdToVes;

  const getAdjustedPrice = (item: CartItem): number => {
    const { dish, selectedOption } = item;
    if (!selectedOption) return dish.price;

    if (selectedOption.includes('+ $2.00')) return dish.price + 2.0;
    if (selectedOption.includes('+ $3.00')) return dish.price + 3.0;
    if (selectedOption.includes('+ $3.50')) return dish.price + 3.5;
    if (selectedOption.includes('+ $4.50')) return dish.price + 4.5;
    return dish.price;
  };

  const calculateSubtotal = () => {
    return cartItems.reduce((acc, item) => acc + (getAdjustedPrice(item) * item.quantity), 0);
  };

  const handleSendOrder = () => {
    if (cartItems.length === 0) return;
    if (!customerName.trim()) {
      alert('Por favor, indica tu nombre para procesar el pedido.');
      return;
    }
    if (deliveryType === 'delivery' && !customerAddress.trim()) {
      alert('Por favor, ingresa tu dirección de entrega.');
      return;
    }

    const subtotal = calculateSubtotal();
    const subtotalVes = subtotal * USD_TO_VES;

    // Format highly professional WhatsApp order notification, custom-designed to delight the kitchen staff!
    let message = `🎨 *MONALISA RESTAURANTE* 🎨\n`;
    message += `_¡Una auténtica obra de arte para tu paladar!_\n\n`;
    message += `📝 *NUEVO PEDIDO DIGITAL*\n`;
    message += `*Cliente:* ${customerName.trim()}\n`;
    message += `*Tipo:* ${deliveryType === 'delivery' ? '🛵 Delivery a domicilio' : '🎒 Retiro en local (Casa Alba)'}\n`;
    
    if (deliveryType === 'delivery') {
      message += `*Dirección:* ${customerAddress.trim()}\n`;
    }
    
    if (customerNotes.trim()) {
      message += `*Notas:* _"${customerNotes.trim()}"_\n`;
    }
    
    message += `\n🛒 *DETALLE DEL PEDIDO:*\n`;

    cartItems.forEach((item, index) => {
      const unitPrice = getAdjustedPrice(item);
      const totalItem = unitPrice * item.quantity;
      const optionStr = item.selectedOption ? ` (${item.selectedOption})` : '';
      message += `${index + 1}. *${item.quantity}x* _${item.dish.name}_${optionStr} ~ $${unitPrice.toFixed(2)} c/u\n   └ Total: *$${totalItem.toFixed(2)}*\n`;
    });

    message += `\n💎 *TOTALES:*\n`;
    message += `*Monto en Divisas:* **$${subtotal.toFixed(2)}**\n`;
    message += `*Monto en Bolívares:* **${subtotalVes.toLocaleString('es-VE', { minimumFractionDigits: 1, maximumFractionDigits: 1 })} Bs**\n`;
    message += `_(Tasa en tiempo real: ${USD_TO_VES.toFixed(2)} Bs/$; Fuente: ${exchangeRateInfo?.source || 'API'})_\n\n`;
    message += `_Pedido realizado desde la Landing Page oficial._`;

    // Track checkout action Google Analytics 4 as requested
    trackEvent('checkout_whatsapp', {
      customer_name: customerName,
      delivery_type: deliveryType,
      items_count: cartItems.length,
      total_usd: subtotal,
      total_ves: subtotalVes
    });

    const encodedText = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${WHATSAPP_PHONE}?text=${encodedText}`;
    
    // Open WhatsApp checkout link securely
    window.open(whatsappUrl, '_blank');
  };

  if (!isOpen) return null;

  const totalUsd = calculateSubtotal();

  return (
    <div 
      className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-sm transition-opacity"
      onClick={onClose}
      id="cart-drawer-overlay"
    >
      {/* Sliding Sheet */}
      <div 
        className="w-full max-w-md h-full bg-zinc-950 border-l border-zinc-900 flex flex-col justify-between shadow-2xl relative"
        onClick={(e) => e.stopPropagation()}
        id="cart-drawer-panel"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-zinc-900 p-4 shrink-0 bg-zinc-900/40" id="cart-header">
          <div className="flex items-center space-x-2">
            <ShoppingBag className="w-5 h-5 text-pink-500" />
            <h3 className="text-base font-bold text-white tracking-tight">Tu Pedido</h3>
            <span className="bg-pink-600/20 text-pink-400 font-mono text-xs font-bold px-2 py-0.5 rounded-full">
              {cartItems.reduce((acc, item) => acc + item.quantity, 0)}
            </span>
          </div>
          <button 
            onClick={onClose}
            className="p-1 rounded-full text-zinc-400 hover:bg-zinc-900 hover:text-white transition-colors"
            id="btn-close-cart"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-4 space-y-5" id="cart-drawer-body">
          {cartItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-24 text-center space-y-4" id="empty-cart-view">
              <div className="w-16 h-16 bg-zinc-900/80 rounded-full flex items-center justify-center border border-zinc-850">
                <ShoppingBag className="w-6 h-6 text-zinc-650" />
              </div>
              <div>
                <p className="text-zinc-300 font-medium text-sm">Tu carrito está vacío</p>
                <p className="text-zinc-500 text-xs mt-1">Explora nuestro menú y agrega tus platos y cervezas favoritas.</p>
              </div>
              <button 
                onClick={onClose}
                className="px-5 py-2 bg-pink-600 hover:bg-pink-700 text-white font-semibold rounded-full text-xs transition-colors shadow-lg shadow-pink-500/10"
              >
                Ver Galería de Platos
              </button>
            </div>
          ) : (
            <>
              {/* Product list */}
              <div className="space-y-3" id="cart-products-list">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono tracking-widest text-zinc-500 uppercase">Selección de platos</span>
                  <button
                    onClick={() => { onClearCart(); trackEvent('clear_cart'); }}
                    className="text-xs text-rose-500 hover:text-rose-400 font-medium flex items-center space-x-1 hover:underline"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Vaciar</span>
                  </button>
                </div>

                <div className="divide-y divide-zinc-900 border-t border-b border-zinc-900" id="cart-item-scroller">
                  {cartItems.map((item, idx) => {
                    const price = getAdjustedPrice(item);
                    return (
                      <div key={idx} className="py-3 flex justify-between gap-3" id={`cart-row-${idx}`}>
                        <div className="flex-1">
                          <h4 className="text-sm font-bold text-zinc-100">{item.dish.name}</h4>
                          {item.selectedOption && (
                            <span className="text-[10px] font-mono tracking-wide text-pink-400 bg-pink-950/20 px-1.5 py-0.5 rounded border border-pink-500/10 mt-1 inline-block">
                              {item.selectedOption}
                            </span>
                          )}
                          <p className="text-xs text-zinc-400 font-mono mt-1">${price.toFixed(2)} c/u</p>
                        </div>

                        {/* Quantity Counter */}
                        <div className="flex items-center space-x-2 shrink-0 self-center">
                          <button
                            onClick={() => onUpdateQuantity(item.dish.id, item.quantity - 1, item.selectedOption)}
                            className="w-6 h-6 rounded bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-400 hover:text-white flex items-center justify-center transition-colors"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="text-xs font-mono font-bold text-zinc-200 w-4 text-center">{item.quantity}</span>
                          <button
                            onClick={() => onUpdateQuantity(item.dish.id, item.quantity + 1, item.selectedOption)}
                            className="w-6 h-6 rounded bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-400 hover:text-white flex items-center justify-center transition-colors"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Delivery Settings */}
              <div className="space-y-3 bg-zinc-900/20 p-3 rounded-xl border border-zinc-900" id="cart-checkout-form">
                <span className="text-xs font-mono tracking-widest text-zinc-500 uppercase block mb-1">Detalles de Entrega</span>
                
                {/* Method selector */}
                <div className="grid grid-cols-2 gap-2" id="delivery-method-grid">
                  <button
                    onClick={() => setDeliveryType('pickup')}
                    className={`py-2 rounded-lg text-xs font-semibold border transition-all ${
                      deliveryType === 'pickup'
                        ? 'bg-zinc-900 text-white border-pink-500'
                        : 'bg-transparent text-zinc-400 border-zinc-850 hover:text-zinc-200'
                    }`}
                  >
                    Retiro en local
                  </button>
                  <button
                    onClick={() => setDeliveryType('delivery')}
                    className={`py-2 rounded-lg text-xs font-semibold border transition-all ${
                      deliveryType === 'delivery'
                        ? 'bg-zinc-900 text-white border-pink-500'
                        : 'bg-transparent text-zinc-400 border-zinc-850 hover:text-zinc-200'
                    }`}
                  >
                    🛵 Delivery
                  </button>
                </div>

                {/* Form Inputs with fast response focus handles */}
                <div className="space-y-2.5 mt-2" id="fields-inputs">
                  <div>
                    <input
                      type="text"
                      placeholder="Tu Nombre Especial (Ej: Max Ruiz)"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className="w-full text-xs text-zinc-300 bg-zinc-950 border border-zinc-850 rounded-lg px-3 py-2.5 focus:border-pink-500 focus:outline-none transition-all"
                    />
                  </div>

                  {deliveryType === 'delivery' && (
                    <div id="delivery-address-wrapper">
                      <input
                        type="text"
                        placeholder="Dirección exacta de entrega (ej: Alta Vista)"
                        value={customerAddress}
                        onChange={(e) => setCustomerAddress(e.target.value)}
                        className="w-full text-xs text-zinc-300 bg-zinc-950 border border-zinc-850 rounded-lg px-3 py-2.5 focus:border-pink-500 focus:outline-none transition-all"
                      />
                    </div>
                  )}

                  <div>
                    <textarea
                      placeholder="Instrucciones adicionales (ej: Tequeños bien tostados, sin cebolla, etc.)"
                      value={customerNotes}
                      onChange={(e) => setCustomerNotes(e.target.value)}
                      rows={2}
                      className="w-full text-xs text-zinc-300 bg-zinc-950 border border-zinc-850 rounded-lg px-3 py-2.5 focus:border-pink-500 focus:outline-none transition-all resize-none"
                    />
                  </div>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Pricing Summary and WhatsApp Checkout Footer */}
        {cartItems.length > 0 && (
          <div className="border-t border-zinc-900 p-4 space-y-4 bg-zinc-900/60 shrink-0" id="cart-checkout-footer">
            <div className="space-y-1.5" id="total-breaks">
              <div className="flex justify-between items-center text-xs text-zinc-400">
                <span>Subtotal en Divisas:</span>
                <span className="font-mono text-zinc-200 font-bold">${totalUsd.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-semibold text-white">Total a Enviar:</span>
                <div className="text-right">
                  <span className="text-xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-500">
                    ${totalUsd.toFixed(2)}
                  </span>
                  {/* Local Venezuelan conversion with standard indicator */}
                  <div className="text-[10px] text-zinc-400 font-mono">
                    ~ {(totalUsd * USD_TO_VES).toLocaleString('es-VE', { minimumFractionDigits: 1, maximumFractionDigits: 1 })} Bs
                  </div>
                  {exchangeRateInfo && (
                    <div className="text-[9px] text-zinc-500 font-mono" title={`Última actualización: ${exchangeRateInfo.lastUpdated}`}>
                      Tasa: {exchangeRateInfo.rate.toFixed(2)} Bs ({exchangeRateInfo.isRealTime ? 'Tiempo Real' : 'Local'})
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Warning Venezuela low connectivity fast flow indicator */}
            <div className="flex items-center space-x-2 text-[10px] text-zinc-500 bg-zinc-950/40 border border-zinc-900 p-2 rounded-lg" id="cart-disclaimer">
              <AlertCircle className="w-3.5 h-3.5 shrink-0 text-pink-500" />
              <span>
                Para conexiones móviles lentas: El pedido se procesará al instante abriendo tu WhatsApp para confirmar tu orden en la cocina.
              </span>
            </div>

            {/* SEND BY WHATSAPP METHOD BANNER */}
            <button
              onClick={handleSendOrder}
              className="w-full py-3 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-bold rounded-full text-sm flex items-center justify-center space-x-2 shadow-lg shadow-pink-500/10 cursor-pointer active:scale-98 transition-all"
              id="btn-checkout-send"
            >
              <Send className="w-4 h-4" />
              <span>Enviar Pedido por WhatsApp</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
