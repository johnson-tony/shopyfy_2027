'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import ProductCard from '@/components/ProductCard';
import RestaurantCard from '@/components/RestaurantCard';
import CategoryScroll from '@/components/CategoryScroll';
import {
  initialProducts,
  initialCategories,
  initialRestaurants,
  MockProduct,
  MockCategory,
  MockRestaurant,
} from '@/lib/mockData';

function HomeContent() {
  const searchParams = useSearchParams();
  const urlMode = searchParams.get('mode');
  const urlSearch = searchParams.get('search');

  const { activeMode, setActiveMode } = useCart();
  const [products, setProducts] = useState<MockProduct[]>([]);
  const [categories, setCategories] = useState<MockCategory[]>([]);
  const [restaurants, setRestaurants] = useState<MockRestaurant[]>([]);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<string>('default');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (urlMode && (urlMode === 'shopy' || urlMode === 'food' || urlMode === 'minutes')) {
      setActiveMode(urlMode);
    }
  }, [urlMode, setActiveMode]);

  useEffect(() => {
    setActiveCategory(null);
  }, [activeMode]);

  useEffect(() => {
    setIsLoading(true);
    const searchParam = urlSearch ? `&search=${encodeURIComponent(urlSearch)}` : '';
    fetch(`/api/products?mode=${activeMode}${activeCategory ? `&category=${activeCategory}` : ''}${sortBy !== 'default' ? `&sort=${sortBy}` : ''}${searchParam}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.products) setProducts(data.products);
        else {
          let filtered = initialProducts.filter((p) => p.mode_slug === activeMode);
          if (activeCategory) filtered = filtered.filter((p) => p.category_slug === activeCategory);
          if (urlSearch) {
            const q = urlSearch.toLowerCase();
            filtered = filtered.filter((p) => p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q));
          }
          setProducts(filtered);
        }
      })
      .catch(() => {
        let filtered = initialProducts.filter((p) => p.mode_slug === activeMode);
        if (activeCategory) filtered = filtered.filter((p) => p.category_slug === activeCategory);
        if (urlSearch) {
          const q = urlSearch.toLowerCase();
          filtered = filtered.filter((p) => p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q));
        }
        setProducts(filtered);
      })
      .finally(() => setIsLoading(false));

    fetch(`/api/categories?mode=${activeMode}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.categories) setCategories(data.categories);
        else setCategories(initialCategories.filter((c) => c.mode_slug === activeMode));
      })
      .catch(() => {
        setCategories(initialCategories.filter((c) => c.mode_slug === activeMode));
      });

    if (activeMode === 'food') {
      fetch('/api/restaurants')
        .then((res) => res.json())
        .then((data) => {
          if (data.restaurants) setRestaurants(data.restaurants);
          else setRestaurants(initialRestaurants);
        })
        .catch(() => setRestaurants(initialRestaurants));
    }
  }, [activeMode, activeCategory, sortBy, urlSearch]);

  // Mode-specific hero banners
  const getHeroContent = () => {
    if (activeMode === 'food') {
      return {
        badge: 'Top Chef & Biryani Specials',
        title: 'Craving Legendary Food? Delivered Hot in 30 Mins.',
        subtitle: 'Authentic Dindigul Biryani, Buhari classics, sizzlers & wood-fired pizza from city icons.',
        gradient: 'from-orange-600 via-amber-600 to-rose-700',
        cta: 'Explore Menus',
        icon: 'fa-utensils',
      };
    }
    if (activeMode === 'minutes') {
      return {
        badge: '⚡ Instant Quick Commerce',
        title: 'Daily Groceries & Essentials in 10 Minutes Flat.',
        subtitle: 'Farm-fresh veggies, dairy milk, crisp fruits, snacks and household cleaning gear right to your door.',
        gradient: 'from-emerald-600 via-teal-600 to-cyan-700',
        cta: 'Shop 10-Min Essentials',
        icon: 'fa-bolt',
      };
    }
    return {
      badge: '✨ Flagship Season Collection 2027',
      title: 'Discover Premium Retail & Trending Fashion Tech.',
      subtitle: 'Oxford cotton shirts, noise-cancelling audio, titanium smartphones, and designer home gear.',
      gradient: 'from-blue-600 via-indigo-600 to-purple-700',
      cta: 'Shop Latest Arrivals',
      icon: 'fa-bag-shopping',
    };
  };

  const hero = getHeroContent();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-8">
      {/* 1. Hero Dynamic Banner */}
      <section className={`relative rounded-3xl overflow-hidden bg-gradient-to-r ${hero.gradient} text-white p-6 sm:p-12 shadow-2xl`}>
        <div className="relative z-10 max-w-2xl space-y-4">
          <span className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
            <i className={`fa-solid ${hero.icon}`}></i>
            {hero.badge}
          </span>
          <h1 className="text-2xl sm:text-4xl md:text-5xl font-black tracking-tight leading-tight">
            {hero.title}
          </h1>
          <p className="text-sm sm:text-base text-white/90 leading-relaxed max-w-xl">
            {hero.subtitle}
          </p>
          <div className="pt-2 flex flex-wrap items-center gap-4">
            <a
              href="#catalog"
              className="bg-white text-slate-900 hover:bg-slate-100 font-extrabold text-xs sm:text-sm px-6 py-3 rounded-xl shadow-lg transition"
            >
              {hero.cta}
            </a>
            <Link
              href="/coupons"
              className="inline-flex items-center gap-2 bg-black/30 hover:bg-black/40 backdrop-blur-md text-white font-bold text-xs sm:text-sm px-5 py-3 rounded-xl border border-white/20 transition"
            >
              <i className="fa-solid fa-ticket text-amber-300"></i>
              View Discounts
            </Link>
          </div>
        </div>

        {/* Decorative background glow */}
        <div className="absolute right-0 bottom-0 translate-x-12 translate-y-12 w-96 h-96 bg-white/10 rounded-full blur-3xl pointer-events-none"></div>
      </section>

      {/* 2. Category Chips Filter */}
      <section>
        <div className="flex items-center justify-between mb-1">
          <h2 className="text-lg font-black tracking-tight text-slate-900 dark:text-white flex items-center gap-2">
            <i className="fa-solid fa-list-check text-blue-600"></i>
            Categories
          </h2>
          <span className="text-xs text-slate-500 font-semibold">{categories.length} categories</span>
        </div>
        <CategoryScroll
          categories={categories}
          activeCategory={activeCategory}
          onSelectCategory={(slug) => setActiveCategory(slug)}
        />
      </section>

      {/* 3. Restaurant Spotlight (Only in Food Mode) */}
      {activeMode === 'food' && (
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-black tracking-tight text-slate-900 dark:text-white flex items-center gap-2">
                <i className="fa-solid fa-fire-burner text-orange-500"></i>
                Popular Restaurants
              </h2>
              <p className="text-xs text-slate-500">Curated dining partners with guaranteed swift delivery</p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
            {restaurants.map((r) => (
              <RestaurantCard key={r._id} restaurant={r} />
            ))}
          </div>
        </section>
      )}

      {/* 4. Products Catalog Section */}
      <section id="catalog" className="space-y-4 pt-2">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 dark:border-slate-800 pb-3">
          <div>
            <h2 className="text-xl font-black tracking-tight text-slate-900 dark:text-white">
              {activeCategory
                ? categories.find((c) => c.slug === activeCategory)?.name || 'Filtered Products'
                : activeMode === 'food'
                ? 'Signature Dishes & Combos'
                : activeMode === 'minutes'
                ? 'Instant 10-Minute Catalog'
                : 'Featured Catalog'}
            </h2>
            <p className="text-xs text-slate-500">
              Showing {products.length} {products.length === 1 ? 'item' : 'items'} available for instant order
            </p>
          </div>

          {/* Sorting controls */}
          <div className="flex items-center gap-2 text-xs">
            <span className="text-slate-400 font-semibold">Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg px-3 py-1.5 text-xs text-slate-700 dark:text-slate-300 font-semibold focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              <option value="default">Recommended</option>
              <option value="price_asc">Price: Low to High</option>
              <option value="price_desc">Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* Product Grid */}
        {isLoading ? (
          <div className="py-20 text-center space-y-3">
            <i className="fa-solid fa-spinner fa-spin text-3xl text-blue-600"></i>
            <p className="text-xs text-slate-400">Loading catalog items...</p>
          </div>
        ) : products.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {products.map((p) => (
              <ProductCard key={p._id} product={p} />
            ))}
          </div>
        ) : (
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl py-16 text-center space-y-3">
            <div className="w-16 h-16 rounded-full bg-slate-100 dark:bg-slate-800 mx-auto flex items-center justify-center text-slate-400 text-2xl">
              <i className="fa-solid fa-box-open"></i>
            </div>
            <h3 className="font-bold text-sm text-slate-800 dark:text-slate-200">No items found</h3>
            <p className="text-xs text-slate-400 max-w-sm mx-auto">
              We couldn't find any items matching your selected category. Try switching categories or clearing filters.
            </p>
            <button
              onClick={() => setActiveCategory(null)}
              className="bg-blue-600 text-white font-bold text-xs px-4 py-2 rounded-xl"
            >
              View All Items
            </button>
          </div>
        )}
      </section>
    </div>
  );
}

export default function HomePage() {
  return (
    <Suspense
      fallback={
        <div className="py-24 text-center">
          <i className="fa-solid fa-spinner fa-spin text-3xl text-blue-600"></i>
        </div>
      }
    >
      <HomeContent />
    </Suspense>
  );
}
