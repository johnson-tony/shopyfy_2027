'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';

export default function CartPage() {
  const {
    items,
    activeMode,
    updateQuantity,
    removeItem,
    clearCart,
    subtotal,
    deliveryFee,
    discountAmount,
    grandTotal,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
  } = useCart();

  const [couponCodeInput, setCouponCodeInput] = useState('');
  const [couponMsg, setCouponMsg] = useState<{ success: boolean; text: string } | null>(null);

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponCodeInput) return;
    const res = applyCoupon(couponCodeInput);
    setCouponMsg({ success: res.success, text: res.message });
    if (res.success) setCouponCodeInput('');
  };

  const freeShippingThreshold = 499;
  const progressPercent = Math.min(100, Math.round((subtotal / freeShippingThreshold) * 100));

  if (items.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center space-y-4">
        <div className="w-20 h-20 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-600 mx-auto flex items-center justify-center text-3xl">
          <i className="fa-solid fa-cart-shopping"></i>
        </div>
        <h2 className="text-2xl font-black text-slate-900 dark:text-white">Your Cart is Empty</h2>
        <p className="text-xs text-slate-500 max-w-sm mx-auto leading-relaxed">
          Looks like you haven't added anything to your cart in {activeMode.toUpperCase()} mode yet. Explore top products and fill your basket!
        </p>
        <div className="pt-2">
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs px-6 py-3 rounded-xl shadow-lg transition"
          >
            <i className="fa-solid fa-arrow-left"></i>
            <span>Continue Shopping</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 dark:text-white">Shopping Bag</h1>
          <p className="text-xs text-slate-500">
            {items.length} {items.length === 1 ? 'item' : 'items'} in {activeMode.toUpperCase()} mode
          </p>
        </div>
        <button
          onClick={clearCart}
          className="text-xs font-semibold text-rose-500 hover:underline flex items-center gap-1"
        >
          <i className="fa-regular fa-trash-can"></i>
          <span>Clear Cart</span>
        </button>
      </div>

      {/* Free shipping progress bar */}
      {subtotal < freeShippingThreshold && (
        <div className="p-4 rounded-2xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900/60 space-y-2">
          <div className="flex justify-between text-xs font-bold text-blue-900 dark:text-blue-300">
            <span>
              Add <strong className="text-blue-600 font-black">₹{freeShippingThreshold - subtotal}</strong> more for Free Delivery!
            </span>
            <span>{progressPercent}%</span>
          </div>
          <div className="w-full h-2 bg-blue-200 dark:bg-blue-900 rounded-full overflow-hidden">
            <div className="h-full bg-blue-600 rounded-full transition-all duration-500" style={{ width: `${progressPercent}%` }}></div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Cart items list */}
        <div className="lg:col-span-8 space-y-4">
          {items.map((item) => (
            <div
              key={item.id}
              className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
            >
              <div className="flex items-center gap-4">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-20 h-20 rounded-xl object-cover border border-slate-200 dark:border-slate-800 flex-shrink-0"
                />
                <div>
                  {item.restaurantName && (
                    <span className="text-[10px] font-bold text-orange-500 uppercase tracking-wide block">
                      {item.restaurantName}
                    </span>
                  )}
                  <Link href={`/product/${item.slug}`} className="font-bold text-sm text-slate-900 dark:text-white hover:text-blue-600 line-clamp-1">
                    {item.name}
                  </Link>

                  {/* Variants */}
                  <div className="flex flex-wrap gap-2 text-[10px] text-slate-500 mt-1">
                    {item.color && <span className="bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded">Color: {item.color}</span>}
                    {item.size && <span className="bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded">Size: {item.size}</span>}
                  </div>

                  {/* Addons */}
                  {item.selectedAddons && item.selectedAddons.length > 0 && (
                    <div className="text-[10px] text-orange-600 mt-1">
                      Add-ons: {item.selectedAddons.map((a) => `${a.name} (+₹${a.price})`).join(', ')}
                    </div>
                  )}

                  <span className="text-sm font-extrabold text-slate-900 dark:text-white block mt-1">
                    ₹{item.price.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              {/* Quantity Stepper & Remove */}
              <div className="flex items-center justify-between w-full sm:w-auto gap-4 pt-2 sm:pt-0 border-t sm:border-0 border-slate-100 dark:border-slate-800">
                <div className="flex items-center border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800">
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="px-2.5 py-1 text-slate-600 dark:text-slate-300 font-bold hover:bg-slate-100 dark:hover:bg-slate-700 rounded-l-xl"
                  >
                    -
                  </button>
                  <span className="px-3 py-1 text-xs font-black text-slate-900 dark:text-white">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="px-2.5 py-1 text-slate-600 dark:text-slate-300 font-bold hover:bg-slate-100 dark:hover:bg-slate-700 rounded-r-xl"
                  >
                    +
                  </button>
                </div>

                <span className="text-sm font-extrabold text-slate-900 dark:text-white w-20 text-right">
                  ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                </span>

                <button
                  onClick={() => removeItem(item.id)}
                  aria-label="Remove item"
                  className="w-8 h-8 rounded-lg text-slate-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/30 flex items-center justify-center transition"
                >
                  <i className="fa-solid fa-xmark text-sm"></i>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary & Coupon box */}
        <div className="lg:col-span-4 space-y-4">
          {/* Coupon Box */}
          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
            <h3 className="font-extrabold text-xs uppercase tracking-wider text-slate-500">
              Apply Promo Code
            </h3>
            {appliedCoupon ? (
              <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 flex items-center justify-between">
                <div>
                  <span className="font-black text-xs text-emerald-700 dark:text-emerald-300">{appliedCoupon.code}</span>
                  <p className="text-[10px] text-emerald-600">{appliedCoupon.name}</p>
                </div>
                <button
                  onClick={removeCoupon}
                  className="text-xs font-bold text-rose-500 hover:underline"
                >
                  Remove
                </button>
              </div>
            ) : (
              <form onSubmit={handleApply} className="flex gap-2">
                <input
                  type="text"
                  placeholder="e.g. WELCOME50, SAVE10"
                  value={couponCodeInput}
                  onChange={(e) => setCouponCodeInput(e.target.value.toUpperCase())}
                  className="flex-1 px-3 py-2 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-bold uppercase placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
                <button
                  type="submit"
                  className="bg-slate-900 hover:bg-black dark:bg-white dark:text-slate-900 text-white font-bold text-xs px-4 py-2 rounded-xl transition"
                >
                  Apply
                </button>
              </form>
            )}

            {couponMsg && (
              <p className={`text-[11px] font-semibold ${couponMsg.success ? 'text-emerald-600' : 'text-rose-500'}`}>
                {couponMsg.text}
              </p>
            )}

            <div className="pt-1 text-[11px] text-slate-400 flex items-center justify-between">
              <span>Have coupons?</span>
              <Link href="/coupons" className="text-blue-500 hover:underline font-bold">
                Browse all coupons
              </Link>
            </div>
          </div>

          {/* Pricing Summary */}
          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4">
            <h3 className="font-black text-sm text-slate-900 dark:text-white">
              Order Summary
            </h3>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between text-slate-600 dark:text-slate-400">
                <span>Subtotal</span>
                <span className="font-bold text-slate-900 dark:text-white">₹{subtotal.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between text-slate-600 dark:text-slate-400">
                <span>Delivery Fee</span>
                <span className="font-bold text-slate-900 dark:text-white">
                  {deliveryFee === 0 ? <strong className="text-emerald-600 font-bold">FREE</strong> : `₹${deliveryFee}`}
                </span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-emerald-600">
                  <span>Coupon Discount</span>
                  <span className="font-bold">-₹{discountAmount.toLocaleString('en-IN')}</span>
                </div>
              )}
              <div className="border-t border-slate-100 dark:border-slate-800 pt-3 flex justify-between text-base font-black text-slate-900 dark:text-white">
                <span>Total Amount</span>
                <span className="text-blue-600 dark:text-blue-400">₹{grandTotal.toLocaleString('en-IN')}</span>
              </div>
            </div>

            <Link
              href="/checkout"
              className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-sm py-3.5 rounded-xl shadow-lg shadow-blue-500/25 transition active:scale-95"
            >
              <span>Proceed to Checkout</span>
              <i className="fa-solid fa-arrow-right text-xs"></i>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
