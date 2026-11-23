'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { MockProduct } from '@/lib/mockData';

interface WishlistContextType {
  items: MockProduct[];
  toggleWishlist: (product: MockProduct) => boolean;
  isInWishlist: (productId: string) => boolean;
  clearWishlist: () => void;
  count: number;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<MockProduct[]>([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem('shopy_wishlist_items');
      if (stored) setItems(JSON.parse(stored));
    } catch {}
  }, []);

  const saveItems = (newItems: MockProduct[]) => {
    setItems(newItems);
    localStorage.setItem('shopy_wishlist_items', JSON.stringify(newItems));
  };

  const toggleWishlist = (product: MockProduct): boolean => {
    const exists = items.some((i) => i._id === product._id);
    if (exists) {
      saveItems(items.filter((i) => i._id !== product._id));
      return false;
    } else {
      saveItems([...items, product]);
      return true;
    }
  };

  const isInWishlist = (productId: string) => {
    return items.some((i) => i._id === productId);
  };

  const clearWishlist = () => {
    saveItems([]);
  };

  return (
    <WishlistContext.Provider
      value={{
        items,
        toggleWishlist,
        isInWishlist,
        clearWishlist,
        count: items.length,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
}
