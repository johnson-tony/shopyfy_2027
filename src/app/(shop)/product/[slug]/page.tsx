'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { MockProduct, initialProducts } from '@/lib/mockData';

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params?.slug as string;

  const { addItem } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  const [product, setProduct] = useState<MockProduct | null>(null);
  const [reviews, setReviews] = useState<any[]>([]);
  const [selectedImage, setSelectedImage] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedAddons, setSelectedAddons] = useState<Array<{ name: string; price: number }>>([]);
  const [quantity, setQuantity] = useState<number>(1);
  const [addedToast, setAddedToast] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!slug) return;
    setIsLoading(true);
    fetch(`/api/products/${slug}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.product) {
          setProduct(data.product);
          setSelectedImage(data.product.image);
          if (data.product.colors?.length > 0) setSelectedColor(data.product.colors[0]);
          if (data.product.sizes?.length > 0) setSelectedSize(data.product.sizes[0]);
          setReviews(data.reviews || []);
        } else {
          const fallback = initialProducts.find((p) => p.slug === slug) || initialProducts[0];
          setProduct(fallback);
          setSelectedImage(fallback.image);
          if (fallback.colors?.length > 0) setSelectedColor(fallback.colors[0]);
          if (fallback.sizes?.length > 0) setSelectedSize(fallback.sizes[0]);
        }
      })
      .catch(() => {
        const fallback = initialProducts.find((p) => p.slug === slug) || initialProducts[0];
        setProduct(fallback);
        setSelectedImage(fallback.image);
        if (fallback.colors?.length > 0) setSelectedColor(fallback.colors[0]);
        if (fallback.sizes?.length > 0) setSelectedSize(fallback.sizes[0]);
      })
      .finally(() => setIsLoading(false));
  }, [slug]);

  if (isLoading || !product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-24 text-center">
        <i className="fa-solid fa-spinner fa-spin text-3xl text-blue-600"></i>
        <p className="text-xs text-slate-400 mt-2">Loading product specifications...</p>
      </div>
    );
  }

  const wishlisted = isInWishlist(product._id);
  const basePrice = product.sale_price ?? product.price;
  const addonsTotal = selectedAddons.reduce((acc, curr) => acc + curr.price, 0);
  const currentPrice = basePrice + addonsTotal;
  const originalPrice = product.sale_price ? product.price + addonsTotal : null;

  const handleAddonToggle = (addon: { name: string; price: number }) => {
    if (selectedAddons.some((a) => a.name === addon.name)) {
      setSelectedAddons(selectedAddons.filter((a) => a.name !== addon.name));
    } else {
      setSelectedAddons([...selectedAddons, addon]);
    }
  };

  const handleAddToCart = () => {
    addItem(product, quantity, selectedColor, selectedSize, selectedAddons);
    setAddedToast(true);
    setTimeout(() => setAddedToast(false), 3000);
  };

  const handleBuyNow = () => {
    addItem(product, quantity, selectedColor, selectedSize, selectedAddons);
    router.push('/checkout');
  };

  const allImages = [product.image, ...(product.gallery || [])].filter(Boolean);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-12">
      {/* Toast Notification */}
      {addedToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-950 text-white border border-slate-700 px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-3 animate-bounce">
          <div className="w-8 h-8 rounded-full bg-emerald-600 flex items-center justify-center text-white">
            <i className="fa-solid fa-check text-xs"></i>
          </div>
          <div>
            <h4 className="font-bold text-xs">Added to Cart!</h4>
            <p className="text-[10px] text-slate-400">Item successfully added to your shopping bag.</p>
          </div>
          <Link href="/cart" className="ml-2 text-xs font-bold text-blue-400 underline">
            View Cart
          </Link>
        </div>
      )}

      {/* Breadcrumb Navigation */}
      <nav className="flex items-center gap-2 text-xs text-slate-500">
        <Link href="/" className="hover:text-blue-600 transition">Home</Link>
        <span>/</span>
        <span className="capitalize">{product.mode_slug}</span>
        <span>/</span>
        <span className="text-slate-900 dark:text-white font-semibold truncate max-w-xs">{product.name}</span>
      </nav>

      {/* Main Product Showcase Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
        {/* Left: Product Images Gallery */}
        <div className="lg:col-span-6 space-y-4">
          <div className="relative aspect-square w-full rounded-3xl overflow-hidden bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-800 shadow-md">
            <img
              src={selectedImage || product.image}
              alt={product.name}
              className="w-full h-full object-cover transition-all duration-300"
            />
            {product.sale_price && (
              <span className="absolute top-4 left-4 bg-emerald-600 text-white font-black text-xs px-3 py-1 rounded-full shadow-lg">
                SAVE ₹{(product.price - product.sale_price).toLocaleString('en-IN')}
              </span>
            )}
            <button
              onClick={() => toggleWishlist(product)}
              className={`absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center shadow-lg transition ${
                wishlisted
                  ? 'bg-rose-500 text-white'
                  : 'bg-white/90 dark:bg-slate-800/90 text-slate-600 hover:text-rose-500'
              }`}
            >
              <i className={`fa-${wishlisted ? 'solid' : 'regular'} fa-heart text-sm`}></i>
            </button>
          </div>

          {/* Thumbnails */}
          {allImages.length > 1 && (
            <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-none">
              {allImages.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(img)}
                  className={`relative w-20 h-20 rounded-2xl overflow-hidden border-2 flex-shrink-0 transition ${
                    selectedImage === img ? 'border-blue-600 scale-105 shadow-md' : 'border-transparent opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt={`Thumb ${idx}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right: Product Specifications & Order Actions */}
        <div className="lg:col-span-6 space-y-6">
          <div>
            {product.restaurant_name && (
              <div className="inline-flex items-center gap-1.5 bg-orange-500/10 text-orange-600 dark:text-orange-400 text-xs font-bold px-2.5 py-1 rounded-md mb-2">
                <i className="fa-solid fa-utensils text-[10px]"></i>
                {product.restaurant_name}
              </div>
            )}
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white leading-tight">
              {product.name}
            </h1>
            <div className="flex items-center gap-4 mt-2">
              <span className="inline-flex items-center gap-1.5 bg-amber-500 text-slate-950 font-black text-xs px-2.5 py-0.5 rounded-md">
                <i className="fa-solid fa-star text-[10px]"></i> {product.rating || 4.8}
              </span>
              <span className="text-xs text-slate-500">
                {product.ratings_count || 1420} verified customer ratings
              </span>
              {product.sku && (
                <span className="text-xs text-slate-400 font-mono">SKU: {product.sku}</span>
              )}
            </div>
          </div>

          {/* Price Box */}
          <div className="p-4 rounded-2xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-baseline gap-3">
            <span className="text-3xl font-black text-slate-900 dark:text-white">
              ₹{currentPrice.toLocaleString('en-IN')}
            </span>
            {originalPrice && (
              <span className="text-base text-slate-400 line-through">
                ₹{originalPrice.toLocaleString('en-IN')}
              </span>
            )}
            <span className="text-xs font-bold text-emerald-600 ml-auto">
              Inclusive of all taxes
            </span>
          </div>

          {/* Color Selection */}
          {product.colors && product.colors.length > 0 && (
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Color: <span className="text-slate-900 dark:text-white">{selectedColor}</span>
              </label>
              <div className="flex flex-wrap gap-2">
                {product.colors.map((c) => (
                  <button
                    key={c}
                    onClick={() => setSelectedColor(c)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition border ${
                      selectedColor === c
                        ? 'border-blue-600 bg-blue-50 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300 ring-2 ring-blue-500'
                        : 'border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-slate-400'
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Size / Portion Selection */}
          {product.sizes && product.sizes.length > 0 && (
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Size / Variant: <span className="text-slate-900 dark:text-white">{selectedSize}</span>
              </label>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSelectedSize(s)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition border ${
                      selectedSize === s
                        ? 'border-blue-600 bg-blue-50 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300 ring-2 ring-blue-500'
                        : 'border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-slate-400'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Food Addons Selection */}
          {product.addons && product.addons.length > 0 && (
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-orange-600 dark:text-orange-400">
                Customize with Add-ons
              </label>
              <div className="space-y-2">
                {product.addons.map((a) => {
                  const isChecked = selectedAddons.some((addon) => addon.name === a.name);
                  return (
                    <label
                      key={a.name}
                      onClick={() => handleAddonToggle(a)}
                      className={`flex items-center justify-between p-3 rounded-xl border text-xs font-semibold cursor-pointer transition ${
                        isChecked
                          ? 'border-orange-500 bg-orange-50/50 dark:bg-orange-950/20 text-orange-900 dark:text-orange-200'
                          : 'border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <input
                          type="checkbox"
                          checked={isChecked}
                          readOnly
                          className="w-4 h-4 rounded text-orange-600"
                        />
                        <span>{a.name}</span>
                      </div>
                      <span className="font-bold">+₹{a.price}</span>
                    </label>
                  );
                })}
              </div>
            </div>
          )}

          {/* Delivery & Warranty info */}
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 flex items-center gap-3">
              <i className="fa-solid fa-truck-ramp-box text-blue-500 text-lg"></i>
              <div>
                <p className="font-bold text-slate-900 dark:text-white">Delivery Time</p>
                <p className="text-[11px] text-slate-500">{product.delivery_time}</p>
              </div>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 flex items-center gap-3">
              <i className="fa-solid fa-arrow-rotate-left text-emerald-500 text-lg"></i>
              <div>
                <p className="font-bold text-slate-900 dark:text-white">Return Policy</p>
                <p className="text-[11px] text-slate-500">{product.return_policy}</p>
              </div>
            </div>
          </div>

          {/* Quantity Stepper & Buttons */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center gap-4">
              <span className="text-xs font-bold text-slate-500 uppercase">Quantity:</span>
              <div className="flex items-center border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-900">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-1.5 text-slate-600 dark:text-slate-300 hover:text-black font-bold"
                >
                  -
                </button>
                <span className="px-4 py-1.5 text-xs font-black text-slate-900 dark:text-white">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3 py-1.5 text-slate-600 dark:text-slate-300 hover:text-black font-bold"
                >
                  +
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-2">
              <button
                onClick={handleAddToCart}
                className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 active:scale-95 text-white font-extrabold text-sm py-3.5 px-6 rounded-2xl shadow-lg shadow-blue-500/25 transition"
              >
                <i className="fa-solid fa-cart-plus"></i>
                <span>Add to Bag</span>
              </button>
              <button
                onClick={handleBuyNow}
                className="flex items-center justify-center gap-2 bg-slate-900 hover:bg-black dark:bg-white dark:text-slate-900 active:scale-95 text-white font-extrabold text-sm py-3.5 px-6 rounded-2xl shadow-lg transition"
              >
                <i className="fa-solid fa-bolt"></i>
                <span>Buy Now</span>
              </button>
            </div>
          </div>

          {/* Description */}
          <div className="border-t border-slate-200 dark:border-slate-800 pt-6 space-y-2">
            <h3 className="font-extrabold text-sm text-slate-900 dark:text-white">
              Product Overview
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              {product.description}
            </p>
          </div>
        </div>
      </div>

      {/* Customer Reviews Section */}
      <section className="border-t border-slate-200 dark:border-slate-800 pt-10 space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-black tracking-tight text-slate-900 dark:text-white flex items-center gap-2">
            <i className="fa-solid fa-comments text-blue-600"></i>
            Verified Customer Reviews ({reviews.length})
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {reviews.map((rev) => (
            <div
              key={rev._id}
              className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-xs text-slate-900 dark:text-white">{rev.user_name}</h4>
                  <div className="flex items-center gap-1 text-amber-500 text-xs mt-0.5">
                    {[...Array(5)].map((_, i) => (
                      <i
                        key={i}
                        className={`fa-star ${i < rev.rating ? 'fa-solid' : 'fa-regular text-slate-300'}`}
                      ></i>
                    ))}
                  </div>
                </div>
                <span className="text-[10px] bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                  <i className="fa-solid fa-circle-check text-[9px]"></i> Verified Buyer
                </span>
              </div>
              <h5 className="font-bold text-xs text-slate-800 dark:text-slate-200">{rev.title}</h5>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">{rev.comment}</p>
              {rev.images && rev.images.length > 0 && (
                <div className="flex items-center gap-2 pt-1">
                  {rev.images.map((img: string, i: number) => (
                    <img
                      key={i}
                      src={img}
                      alt="Review attachment"
                      className="w-14 h-14 rounded-lg object-cover border border-slate-200 dark:border-slate-700"
                    />
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
