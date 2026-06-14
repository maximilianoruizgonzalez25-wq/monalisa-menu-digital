/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Dish, CartItem, OperationType } from '../types';
import { DEFAULT_PLATES } from '../data/defaultMenu';
import { db, handleFirestoreError, isFirebaseConfigPlaceholder } from '../lib/firebase';
import { collection, getDocs, setDoc, doc } from 'firebase/firestore';
import { Search, SlidersHorizontal, ShoppingCart, Check, Star, RefreshCw } from 'lucide-react';
import { trackEvent } from '../lib/analytics';

interface MenuGridProps {
  onAddToCart: (dish: Dish, quantity: number, selectedOption?: string) => void;
  cartItems: CartItem[];
  usdToVes: number;
  isRealTimeRate?: boolean;
  onRefreshRate?: () => void;
}

const CATEGORIES = [
  'Todos',
  'Entradas',
  'Ensaladas',
  'Principales',
  'Pastas',
  'Hamburguesas',
  'Infantil',
  'Bebidas',
  'Postres'
];

export default function MenuGrid({
  onAddToCart,
  cartItems,
  usdToVes,
  isRealTimeRate = false,
  onRefreshRate
}: MenuGridProps) {
  const [plates, setPlates] = useState<Dish[]>(DEFAULT_PLATES);
  const [loading, setLoading] = useState<boolean>(false);
  const [usingFirebase, setUsingFirebase] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('Todos');
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>({});
  const [justAddedId, setJustAddedId] = useState<string | null>(null);

  // Load menu items from Firebase (if configured) or fallback to default
  useEffect(() => {
    async function fetchMenu() {
      // If Firebase config is a placeholder, strictly stay on default plates (no error)
      if (isFirebaseConfigPlaceholder()) {
        console.log('ℹ️ Using local optimized menu data. Firebase is in placeholder mode.');
        setPlates(DEFAULT_PLATES);
        setUsingFirebase(false);
        return;
      }

      setLoading(true);
      const collectionPath = 'plates';
      try {
        // Strict 3.5-second connection timeout guard to prevent indefinite loading on throttled/blocked networks
        const timeoutPromise = new Promise<never>((_, reject) =>
          setTimeout(() => reject(new Error('Firestore connection timeout')), 3500)
        );

        const querySnapshot = await Promise.race([
          getDocs(collection(db, collectionPath)),
          timeoutPromise
        ]);

        const loadedPlates: Dish[] = [];
        const loadedIds = new Set<string>();

        if (!querySnapshot.empty) {
          querySnapshot.forEach((docSnap) => {
            const data = docSnap.data() as Dish;
            loadedPlates.push({ id: docSnap.id, ...data } as Dish);
            loadedIds.add(docSnap.id);
          });
        }

        // Smart merge: Include all default plates, then override/add any fetched from Firestore.
        // This guarantees that all foods and drinks always appear, even if the database sync is incomplete or slow.
        const platesMap = new Map<string, Dish>();
        DEFAULT_PLATES.forEach(p => platesMap.set(p.id, p));
        loadedPlates.forEach(p => platesMap.set(p.id, p));
        const mergedPlates = Array.from(platesMap.values());

        const missingPlates = DEFAULT_PLATES.filter(plate => !loadedIds.has(plate.id));
        if (missingPlates.length > 0) {
          console.log(`Auto-seeding ${missingPlates.length} missing dishes to Firestore...`);
          // Seed in the background to not block initial render of the merged menu
          missingPlates.forEach(async (plate) => {
            try {
              await setDoc(doc(db, collectionPath, plate.id), plate);
            } catch (err) {
              console.warn(`Failed to background-seed plate ${plate.id} to Firestore:`, err);
            }
          });
        }

        setPlates(mergedPlates);
        setUsingFirebase(true);
        console.log(`✅ Loaded and merged ${mergedPlates.length} dishes successfully with Firestore`);
      } catch (error) {
        console.warn('⚠️ Unable to connect to cloud Firestore. Falling back to robust local static menu.', error);
        // Do not throw fatal error, use fallback local plates so users still have a perfect experience
        setPlates(DEFAULT_PLATES);
        setUsingFirebase(false);
      } finally {
        setLoading(false);
      }
    }

    fetchMenu();
  }, []);

  // Set default options for dishes on load
  useEffect(() => {
    const initialOptions: Record<string, string> = {};
    plates.forEach((dish) => {
      if (dish.options && dish.options.length > 0) {
        initialOptions[dish.id] = dish.options[0];
      }
    });
    setSelectedOptions(initialOptions);
  }, [plates]);

  const handleOptionChange = (dishId: string, option: string) => {
    setSelectedOptions(prev => ({ ...prev, [dishId]: option }));
    trackEvent('change_dish_option', { dish_id: dishId, option_selected: option });
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setSearchQuery(val);
    if (val.trim() !== '') {
      trackEvent('search_dish', { query: val });
    }
  };

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    trackEvent('filter_category', { category });
  };

  const handleAddClick = (dish: Dish) => {
    const option = selectedOptions[dish.id];
    onAddToCart(dish, 1, option);
    
    // Play quick feedback animation
    setJustAddedId(dish.id);
    setTimeout(() => setJustAddedId(null), 1200);

    trackEvent('add_to_cart', {
      dish_id: dish.id,
      dish_name: dish.name,
      dish_price: dish.price,
      option_selected: option || 'none'
    });
  };

  // Filter plates matching query and selected category
  const filteredPlates = plates.filter((dish) => {
    const matchesCategory = selectedCategory === 'Todos' || dish.category === selectedCategory;
    const matchesSearch = dish.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          dish.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const getAdjustedPrice = (dish: Dish): number => {
    const option = selectedOptions[dish.id];
    if (!option) return dish.price;

    // Standardized option additional pricing increments
    if (option.includes('+ $2.00')) return dish.price + 2.0;
    if (option.includes('+ $3.00')) return dish.price + 3.0;
    if (option.includes('+ $3.50')) return dish.price + 3.5;
    if (option.includes('+ $4.50')) return dish.price + 4.5;
    return dish.price;
  };

  const USD_TO_VES = usdToVes;

  return (
    <section className="py-12 max-w-5xl mx-auto px-4" id="seccion-menu">
      {/* Search and Filters Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8" id="menu-filters-controls">
        <h2 className="text-xl md:text-2xl font-black text-white flex items-center gap-2 flex-wrap tracking-tight">
          Nuestra Galería de Sabores
          {usingFirebase && (
            <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-mono tracking-widest bg-pink-950/40 text-pink-400 border border-pink-500/20">
              Firestore conectado
            </span>
          )}
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10.5px] font-mono bg-zinc-900 border border-zinc-850 text-zinc-400">
            <span className={`w-1.5 h-1.5 rounded-full ${isRealTimeRate ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'}`}></span>
            Tasa: 1$ = {USD_TO_VES.toFixed(2)} Bs
            {onRefreshRate && (
              <button 
                onClick={onRefreshRate} 
                className="ml-1 text-pink-500 hover:text-pink-400 font-bold hover:scale-105 transition-all cursor-pointer select-none"
                title="Actualizar Tasa en Tiempo Real"
              >
                🔄
              </button>
            )}
          </span>
        </h2>

        <div className="relative w-full md:w-80" id="search-input-field">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
          <input
            type="text"
            placeholder="Buscar hamburguesa, tequeños, risotto..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="w-full pl-10 pr-4 py-2.5 rounded-full text-zinc-200 bg-zinc-900 border border-zinc-800 text-sm focus:border-pink-500 focus:ring-1 focus:ring-pink-500/20 focus:outline-none transition-all duration-200"
          />
        </div>
      </div>

      {/* Category Slider - Optimised for swift touch swipe on mobile screen */}
      <div 
        className="flex overflow-x-auto gap-2 pb-4 scrollbar-none snap-x snap-mandatory -mx-4 px-4 md:mx-0 md:px-0 mb-8"
        id="category-chips-list"
      >
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => handleCategorySelect(cat)}
            className={`px-5 py-2 rounded-full text-xs font-semibold tracking-wide snap-start shrink-0 transition-all duration-200 cursor-pointer ${
              selectedCategory === cat
                ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-md'
                : 'bg-zinc-900 hover:bg-zinc-850 text-zinc-400 hover:text-white border border-zinc-850'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Empty States */}
      {filteredPlates.length === 0 && (
        <div className="py-12 text-center bg-zinc-950 rounded-2xl border border-zinc-900 p-8" id="empty-search-state">
          <SlidersHorizontal className="w-10 h-10 text-zinc-600 mx-auto mb-3" />
          <p className="text-zinc-400 text-sm font-medium">No encontramos platos que coincidan con tu búsqueda</p>
          <button 
            onClick={() => { setSearchQuery(''); setSelectedCategory('Todos'); }}
            className="mt-4 px-4 py-1.5 bg-zinc-900 border border-zinc-800 rounded-full text-xs text-pink-400 hover:bg-zinc-850 font-semibold"
          >
            Restaurar Filtros
          </button>
        </div>
      )}

      {/* Loading States */}
      {loading ? (
        <div className="py-24 text-center" id="loading-plates-fallback">
          <RefreshCw className="w-8 h-8 text-pink-500 mx-auto animate-spin mb-4" />
          <p className="text-zinc-500 font-mono text-xs">Cargando menú desde Firebase...</p>
        </div>
      ) : (
        /* Plates Catalog Grid */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" id="dishes-catalog-grid">
          {filteredPlates.map((dish) => {
            const hasOptions = dish.options && dish.options.length > 0;
            const currentOption = selectedOptions[dish.id] || '';
            const finalPrice = getAdjustedPrice(dish);
            const isAdded = justAddedId === dish.id;

            return (
              <div
                key={dish.id}
                className="bg-zinc-900/40 border border-zinc-850 rounded-2xl p-5 flex flex-col justify-between hover:border-zinc-800 transition-all duration-300 relative group overflow-hidden"
                id={`dish-item-${dish.id}`}
              >
                {/* Popularity Badge */}
                {dish.popular && (
                  <span className="absolute top-4 right-4 flex items-center px-1.5 py-0.5 text-[9px] font-bold tracking-widest text-yellow-500 bg-yellow-500/10 border border-yellow-500/20 rounded uppercase">
                    <Star className="w-2.5 h-2.5 fill-current mr-0.5" />
                    Recomendado
                  </span>
                )}

                <div>
                  {/* Category breadcrumb */}
                  <span className="text-[10px] font-semibold text-zinc-500 uppercase tracking-wider block mb-1">
                    {dish.category}
                  </span>

                  {/* Title */}
                  <h3 className="text-base font-bold text-zinc-100 group-hover:text-pink-400 transition-colors duration-200 leading-tight">
                    {dish.name}
                  </h3>

                  {/* Description */}
                  <p className="text-xs text-zinc-400 leading-relaxed mt-2.5 mb-4">
                    {dish.description}
                  </p>
                </div>

                <div>
                  {/* Options select if available (e.g. classical/double or proteins) */}
                  {hasOptions && (
                    <div className="mb-4" id={`dish-options-${dish.id}`}>
                      <label className="text-[10px] font-mono tracking-wider text-zinc-500 block mb-1.5 uppercase font-medium">
                        Opciones disponibles:
                      </label>
                      <select
                        value={currentOption}
                        onChange={(e) => handleOptionChange(dish.id, e.target.value)}
                        className="w-full text-xs text-zinc-300 bg-zinc-950 border border-zinc-800 rounded px-2.5 py-1.5 focus:border-pink-500/50 focus:outline-none focus:ring-0"
                      >
                        {dish.options?.map((opt) => (
                          <option key={opt} value={opt}>
                            {opt}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}

                  {/* Pricing and Action Section */}
                  <div className="flex items-center justify-between border-t border-zinc-850/50 pt-4 mt-auto" id={`dish-pricing-${dish.id}`}>
                    <div className="flex flex-col">
                      <span className="text-lg font-black text-zinc-100 font-mono tracking-tight">
                        ${finalPrice.toFixed(2)}
                      </span>
                      {/* Venezuelan local conversion helper for low connectivity contexts */}
                      <span className="text-[10px] text-zinc-500 font-mono">
                        ~ {(finalPrice * USD_TO_VES).toFixed(1)} Bs
                      </span>
                    </div>

                    <button
                      onClick={() => handleAddClick(dish)}
                      disabled={isAdded}
                      className={`px-4 py-2 rounded-full text-xs font-semibold flex items-center transition-all duration-350 cursor-pointer ${
                        isAdded
                          ? 'bg-emerald-600 text-white scale-98'
                          : 'bg-zinc-800 hover:bg-pink-600 text-zinc-300 hover:text-white shadow-sm'
                      }`}
                      id={`btn-add-item-${dish.id}`}
                    >
                      {isAdded ? (
                        <>
                          <Check className="w-3.5 h-3.5 mr-1" />
                          Agregado
                        </>
                      ) : (
                        <>
                          <ShoppingCart className="w-3.5 h-3.5 mr-1" />
                          Pedir
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}
