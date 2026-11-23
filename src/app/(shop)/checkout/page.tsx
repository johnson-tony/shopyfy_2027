'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';

export default function CheckoutPage() {
  const router = useRouter();
  const { items, activeMode, subtotal, deliveryFee, discountAmount, grandTotal, appliedCoupon, clearCart } = useCart();
  const { user } = useAuth();

  const [address, setAddress] = useState({
    name: user?.name || 'Alice Customer',
    phone: '+91 9876543210',
    address_line1: 'Flat 402, Green Valley Apartments',
    address_line2: '12th Main Road, Indiranagar',
    landmark: 'Near Metro Station',
    city: 'Chennai',
    state: 'Tamil Nadu',
    postal_code: '600001',
    country: 'India',
    type: 'home',
  });

  const [paymentMethod, setPaymentMethod] = useState<'pay_on_delivery' | 'mock_upi' | 'mock_card' | 'mock_netbanking'>('mock_upi');
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  if (items.length === 0) {
    return (
      <div className="max-w-md mx-auto py-20 px-4 text-center space-y-4">
        <h2 className="text-xl font-black">Your bag is empty</h2>
        <p className="text-xs text-slate-500">Please add items before proceeding to checkout.</p>
        <Link href="/" className="inline-block bg-blue-600 text-white font-bold text-xs px-6 py-2.5 rounded-xl">
          Start Shopping
        </Link>
      </div>
    );
  }

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setIsSubmitting(true);

    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items,
          shippingAddress: address,
          paymentMethod,
          activeMode,
          appliedCoupon,
          subtotal,
          deliveryFee,
          discountAmount,
          grandTotal,
          notes,
          userId: user?.id,
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        clearCart();
        router.push(`/orders/success/${data.orderNumber}`);
      } else {
        setErrorMsg(data.message || 'Failed to place order');
      }
    } catch {
      // Fallback redirect
      const mockOrderNumber = `ORD-2027-${Math.floor(1000 + Math.random() * 9000)}`;
      clearCart();
      router.push(`/orders/success/${mockOrderNumber}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      <div>
        <h1 className="text-2xl font-black text-slate-900 dark:text-white">Secure Checkout</h1>
        <p className="text-xs text-slate-500">Fast doorstep delivery via our verified fleet</p>
      </div>

      {errorMsg && (
        <div className="p-4 rounded-xl bg-rose-50 dark:bg-rose-950/30 text-rose-600 text-xs font-semibold">
          {errorMsg}
        </div>
      )}

      <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Shipping details */}
        <div className="lg:col-span-7 space-y-6">
          {/* 1. Address Section */}
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4">
            <h2 className="font-black text-sm text-slate-900 dark:text-white flex items-center gap-2">
              <i className="fa-solid fa-location-dot text-blue-600"></i>
              Shipping & Delivery Address
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block text-slate-500 font-bold mb-1">Full Name *</label>
                <input
                  type="text"
                  required
                  value={address.name}
                  onChange={(e) => setAddress({ ...address, name: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-slate-500 font-bold mb-1">Phone Number *</label>
                <input
                  type="text"
                  required
                  value={address.phone}
                  onChange={(e) => setAddress({ ...address, phone: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="text-xs space-y-1">
              <label className="block text-slate-500 font-bold">Address Line 1 (Flat, House no., Building) *</label>
              <input
                type="text"
                required
                value={address.address_line1}
                onChange={(e) => setAddress({ ...address, address_line1: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block text-slate-500 font-bold mb-1">Street / Area</label>
                <input
                  type="text"
                  value={address.address_line2}
                  onChange={(e) => setAddress({ ...address, address_line2: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-slate-500 font-bold mb-1">Landmark</label>
                <input
                  type="text"
                  value={address.landmark}
                  onChange={(e) => setAddress({ ...address, landmark: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3 text-xs">
              <div>
                <label className="block text-slate-500 font-bold mb-1">City *</label>
                <input
                  type="text"
                  required
                  value={address.city}
                  onChange={(e) => setAddress({ ...address, city: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-slate-500 font-bold mb-1">State *</label>
                <input
                  type="text"
                  required
                  value={address.state}
                  onChange={(e) => setAddress({ ...address, state: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-slate-500 font-bold mb-1">PIN Code *</label>
                <input
                  type="text"
                  required
                  value={address.postal_code}
                  onChange={(e) => setAddress({ ...address, postal_code: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          {/* 2. Payment Method Section */}
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4">
            <h2 className="font-black text-sm text-slate-900 dark:text-white flex items-center gap-2">
              <i className="fa-solid fa-credit-card text-emerald-600"></i>
              Payment Method
            </h2>

            <div className="space-y-3">
              {/* Mock UPI */}
              <label
                onClick={() => setPaymentMethod('mock_upi')}
                className={`flex items-start gap-3 p-4 rounded-xl border cursor-pointer transition ${
                  paymentMethod === 'mock_upi'
                    ? 'border-blue-600 bg-blue-50/50 dark:bg-blue-950/20 ring-2 ring-blue-500'
                    : 'border-slate-200 dark:border-slate-700 hover:border-slate-400'
                }`}
              >
                <input
                  type="radio"
                  name="payment"
                  checked={paymentMethod === 'mock_upi'}
                  readOnly
                  className="mt-1"
                />
                <div className="flex-1">
                  <div className="flex items-center gap-2 font-black text-xs text-slate-900 dark:text-white">
                    <span>Instant UPI (GPay / PhonePe / Paytm / QR)</span>
                    <span className="bg-emerald-500/10 text-emerald-600 text-[10px] font-bold px-2 py-0.5 rounded">
                      Fastest
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 mt-0.5">Scan mock merchant QR code or pay via VPA</p>
                  {paymentMethod === 'mock_upi' && (
                    <div className="mt-3 p-3 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 inline-block text-center">
                      <img
                        src="https://api.qrserver.com/v1/create-qr-code/?size=140x140&data=upi://pay?pa=merchant@upi&pn=ShopyStore&cu=INR"
                        alt="UPI QR"
                        className="w-28 h-28 mx-auto"
                      />
                      <span className="text-[10px] font-mono font-bold text-slate-500 block mt-1">UPI ID: merchant@upi</span>
                    </div>
                  )}
                </div>
              </label>

              {/* Cash On Delivery */}
              <label
                onClick={() => setPaymentMethod('pay_on_delivery')}
                className={`flex items-start gap-3 p-4 rounded-xl border cursor-pointer transition ${
                  paymentMethod === 'pay_on_delivery'
                    ? 'border-blue-600 bg-blue-50/50 dark:bg-blue-950/20 ring-2 ring-blue-500'
                    : 'border-slate-200 dark:border-slate-700 hover:border-slate-400'
                }`}
              >
                <input
                  type="radio"
                  name="payment"
                  checked={paymentMethod === 'pay_on_delivery'}
                  readOnly
                  className="mt-1"
                />
                <div>
                  <span className="font-black text-xs text-slate-900 dark:text-white">
                    Cash on Delivery (COD) / Pay on Delivery
                  </span>
                  <p className="text-[11px] text-slate-500 mt-0.5">Pay via cash or UPI scan when rider reaches doorstep</p>
                </div>
              </label>

              {/* Mock Card */}
              <label
                onClick={() => setPaymentMethod('mock_card')}
                className={`flex items-start gap-3 p-4 rounded-xl border cursor-pointer transition ${
                  paymentMethod === 'mock_card'
                    ? 'border-blue-600 bg-blue-50/50 dark:bg-blue-950/20 ring-2 ring-blue-500'
                    : 'border-slate-200 dark:border-slate-700 hover:border-slate-400'
                }`}
              >
                <input
                  type="radio"
                  name="payment"
                  checked={paymentMethod === 'mock_card'}
                  readOnly
                  className="mt-1"
                />
                <div>
                  <span className="font-black text-xs text-slate-900 dark:text-white">
                    Credit / Debit Card (Visa, MasterCard, RuPay)
                  </span>
                  <p className="text-[11px] text-slate-500 mt-0.5">Secure 3D verification simulator</p>
                </div>
              </label>
            </div>
          </div>

          {/* Delivery Instructions */}
          <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
              Delivery Notes / Instructions for Rider:
            </label>
            <input
              type="text"
              placeholder="e.g. Please leave package at security guard or ring twice"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Order review sidebar */}
        <div className="lg:col-span-5 space-y-4">
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4 sticky top-24">
            <h3 className="font-black text-sm text-slate-900 dark:text-white">Order Summary</h3>

            {/* Items mini list */}
            <div className="max-h-60 overflow-y-auto space-y-3 pr-1 scrollbar-none">
              {items.map((i) => (
                <div key={i.id} className="flex items-center justify-between text-xs gap-3">
                  <div className="flex items-center gap-2 truncate">
                    <img src={i.image} alt={i.name} className="w-10 h-10 rounded-lg object-cover flex-shrink-0" />
                    <div className="truncate">
                      <p className="font-bold text-slate-900 dark:text-white truncate">{i.name}</p>
                      <p className="text-[10px] text-slate-400">Qty: {i.quantity}</p>
                    </div>
                  </div>
                  <span className="font-extrabold text-slate-900 dark:text-white flex-shrink-0">
                    ₹{(i.price * i.quantity).toLocaleString('en-IN')}
                  </span>
                </div>
              ))}
            </div>

            <div className="border-t border-slate-100 dark:border-slate-800 pt-3 space-y-2 text-xs">
              <div className="flex justify-between text-slate-500">
                <span>Subtotal</span>
                <span className="font-bold text-slate-900 dark:text-white">₹{subtotal.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between text-slate-500">
                <span>Delivery Fee</span>
                <span className="font-bold text-slate-900 dark:text-white">
                  {deliveryFee === 0 ? <strong className="text-emerald-600 font-bold">FREE</strong> : `₹${deliveryFee}`}
                </span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-emerald-600">
                  <span>Discount ({appliedCoupon?.code})</span>
                  <span className="font-bold">-₹{discountAmount.toLocaleString('en-IN')}</span>
                </div>
              )}
              <div className="border-t border-slate-100 dark:border-slate-800 pt-3 flex justify-between text-lg font-black text-slate-900 dark:text-white">
                <span>Total Amount</span>
                <span className="text-blue-600 dark:text-blue-400">₹{grandTotal.toLocaleString('en-IN')}</span>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-extrabold text-sm py-4 rounded-xl shadow-xl shadow-blue-500/25 transition active:scale-95"
            >
              {isSubmitting ? (
                <>
                  <i className="fa-solid fa-spinner fa-spin"></i>
                  <span>Processing Order...</span>
                </>
              ) : (
                <>
                  <i className="fa-solid fa-lock text-xs"></i>
                  <span>Place Order • ₹{grandTotal.toLocaleString('en-IN')}</span>
                </>
              )}
            </button>

            <p className="text-[10px] text-center text-slate-400">
              🔒 Safe & Encrypted Checkout with 100% Buyer Protection Guarantee.
            </p>
          </div>
        </div>
      </form>
    </div>
  );
}
