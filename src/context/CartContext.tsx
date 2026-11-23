'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { MockProduct } from '@/lib/mockData';

export interface CartItem {
  id: string;
  productId: string;
  name: string;
  slug: string;
  image: string;
  price: number;
  quantity: number;
  color?: string;
  size?: string;
  selectedAddons?: Array<{ name: string; price: number }>;
  modeSlug: string;
  restaurantName?: string;
}

export interface AppliedCoupon {
  code: string;
  discount: number;
  type: string;
  name: string;
}

interface CartContextType {
  items: CartItem[];
  activeMode: string;
  setActiveMode: (mode: string) => void;
  addItem: (product: MockProduct, quantity?: number, color?: string, size?: string, addons?: Array<{ name: string; price: number }>) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  removeItem: (itemId: string) => void;
  clearCart: () => void;
  totalQuantity: number;
  subtotal: number;
  discountAmount: number;
  deliveryFee: number;
  grandTotal: number;
  appliedCoupon: AppliedCoupon | null;
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [activeMode, setActiveModeState] = useState<string>('shopy');
  const [appliedCoupon, setAppliedCoupon] = useState<AppliedCoupon | null>(null);

  useEffect(() => {
    try {
      const storedItems = localStorage.getItem('shopy_cart_items');
      if (storedItems) setItems(JSON.parse(storedItems));

      const storedMode = localStorage.getItem('shopy_active_mode');
      if (storedMode) setActiveModeState(storedMode);

      const storedCoupon = localStorage.getItem('shopy_applied_coupon');
      if (storedCoupon) setAppliedCoupon(JSON.parse(storedCoupon));
    } catch {}
  }, []);

  const setActiveMode = (mode: string) => {
    setActiveModeState(mode);
    localStorage.setItem('shopy_active_mode', mode);
  };

  const saveItems = (newItems: CartItem[]) => {
    setItems(newItems);
    localStorage.setItem('shopy_cart_items', JSON.stringify(newItems));
  };

  const addItem = (
    product: MockProduct,
    quantity: number = 1,
    color?: string,
    size?: string,
    addons?: Array<{ name: string; price: number }>
  ) => {
    const addonsTotal = (addons || []).reduce((acc, curr) => acc + curr.price, 0);
    const unitPrice = (product.sale_price ?? product.price) + addonsTotal;
    const itemId = `${product._id}_${color || 'def'}_${size || 'def'}_${(addons || []).map((a) => a.name).join('-')}`;

    const existingIndex = items.findIndex((i) => i.id === itemId);

    if (existingIndex > -1) {
      const updated = [...items];
      updated[existingIndex].quantity += quantity;
      saveItems(updated);
    } else {
      const newItem: CartItem = {
        id: itemId,
        productId: product._id,
        name: product.name,
        slug: product.slug,
        image: product.image,
        price: unitPrice,
        quantity,
        color,
        size,
        selectedAddons: addons,
        modeSlug: product.mode_slug || activeMode,
        restaurantName: product.restaurant_name,
      };
      saveItems([...items, newItem]);
    }
  };

  const updateQuantity = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(itemId);
      return;
    }
    const updated = items.map((i) => (i.id === itemId ? { ...i, quantity } : i));
    saveItems(updated);
  };

  const removeItem = (itemId: string) => {
    const updated = items.filter((i) => i.id !== itemId);
    saveItems(updated);
  };

  const clearCart = () => {
    saveItems([]);
    setAppliedCoupon(null);
    localStorage.removeItem('shopy_applied_coupon');
  };

  // Filter items matching active mode
  const modeItems = items.filter((i) => i.modeSlug === activeMode);

  const totalQuantity = modeItems.reduce((acc, curr) => acc + curr.quantity, 0);
  const subtotal = modeItems.reduce((acc, curr) => acc + curr.price * curr.quantity, 0);

  // Delivery fee rules (free for > ₹500 or Free Shipping coupon)
  let deliveryFee = subtotal > 0 ? (subtotal >= 499 ? 0 : 40) : 0;
  if (appliedCoupon?.type === 'free_delivery') {
    deliveryFee = 0;
  }

  let discountAmount = 0;
  if (appliedCoupon) {
    if (appliedCoupon.type === 'fixed') {
      discountAmount = appliedCoupon.discount;
    } else if (appliedCoupon.type === 'percentage') {
      discountAmount = Math.round((subtotal * appliedCoupon.discount) / 100);
    }
  }

  const grandTotal = Math.max(0, subtotal + deliveryFee - discountAmount);

  const applyCoupon = (code: string) => {
    const trimmed = code.trim().toUpperCase();
    if (trimmed === 'WELCOME50') {
      if (subtotal < 199) return { success: false, message: 'Minimum order amount for WELCOME50 is ₹199' };
      const coupon: AppliedCoupon = { code: 'WELCOME50', discount: 50, type: 'fixed', name: '₹50 Flat Off' };
      setAppliedCoupon(coupon);
      localStorage.setItem('shopy_applied_coupon', JSON.stringify(coupon));
      return { success: true, message: 'Coupon WELCOME50 applied! ₹50 saved.' };
    }
    if (trimmed === 'SAVE10') {
      if (subtotal < 499) return { success: false, message: 'Minimum order amount for SAVE10 is ₹499' };
      const coupon: AppliedCoupon = { code: 'SAVE10', discount: 10, type: 'percentage', name: '10% Super Discount' };
      setAppliedCoupon(coupon);
      localStorage.setItem('shopy_applied_coupon', JSON.stringify(coupon));
      return { success: true, message: 'Coupon SAVE10 applied! 10% discount added.' };
    }
    if (trimmed === 'MINUTES20') {
      if (activeMode !== 'minutes') return { success: false, message: 'MINUTES20 is only valid in Minutes Mode' };
      const coupon: AppliedCoupon = { code: 'MINUTES20', discount: 20, type: 'percentage', name: '20% Off Groceries' };
      setAppliedCoupon(coupon);
      localStorage.setItem('shopy_applied_coupon', JSON.stringify(coupon));
      return { success: true, message: 'Coupon MINUTES20 applied! 20% discount added.' };
    }
    if (trimmed === 'FREESHIP') {
      const coupon: AppliedCoupon = { code: 'FREESHIP', discount: 0, type: 'free_delivery', name: 'Free Delivery' };
      setAppliedCoupon(coupon);
      localStorage.setItem('shopy_applied_coupon', JSON.stringify(coupon));
      return { success: true, message: 'Coupon FREESHIP applied! Zero delivery fee.' };
    }
    return { success: false, message: 'Invalid or expired coupon code' };
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    localStorage.removeItem('shopy_applied_coupon');
  };

  return (
    <CartContext.Provider
      value={{
        items: modeItems,
        activeMode,
        setActiveMode,
        addItem,
        updateQuantity,
        removeItem,
        clearCart,
        totalQuantity,
        subtotal,
        discountAmount,
        deliveryFee,
        grandTotal,
        appliedCoupon,
        applyCoupon,
        removeCoupon,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
