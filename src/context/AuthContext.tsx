'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: 'user' | 'admin' | 'partner';
  status?: string;
  vehicleType?: string;
}

interface AuthContextType {
  user: UserProfile | null;
  admin: UserProfile | null;
  partner: UserProfile | null;
  isLoading: boolean;
  loginUser: (data: UserProfile, token: string) => void;
  logoutUser: () => void;
  loginAdmin: (data: UserProfile, token: string) => void;
  logoutAdmin: () => void;
  loginPartner: (data: UserProfile, token: string) => void;
  logoutPartner: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [admin, setAdmin] = useState<UserProfile | null>(null);
  const [partner, setPartner] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem('shopy_user_profile');
      if (storedUser) setUser(JSON.parse(storedUser));

      const storedAdmin = localStorage.getItem('shopy_admin_profile');
      if (storedAdmin) setAdmin(JSON.parse(storedAdmin));

      const storedPartner = localStorage.getItem('shopy_partner_profile');
      if (storedPartner) setPartner(JSON.parse(storedPartner));
    } catch {
      // Ignore parse error
    } finally {
      setIsLoading(false);
    }
  }, []);

  const loginUser = (data: UserProfile, token: string) => {
    setUser(data);
    localStorage.setItem('shopy_user_profile', JSON.stringify(data));
    localStorage.setItem('shopy_user_token', token);
    document.cookie = `shopy_user_token=${token}; path=/; max-age=604800; SameSite=Lax`;
  };

  const logoutUser = () => {
    setUser(null);
    localStorage.removeItem('shopy_user_profile');
    localStorage.removeItem('shopy_user_token');
    document.cookie = 'shopy_user_token=; path=/; max-age=0; SameSite=Lax';
  };

  const loginAdmin = (data: UserProfile, token: string) => {
    setAdmin(data);
    localStorage.setItem('shopy_admin_profile', JSON.stringify(data));
    localStorage.setItem('shopy_admin_token', token);
    document.cookie = `shopy_admin_token=${token}; path=/admin; max-age=604800; SameSite=Lax`;
  };

  const logoutAdmin = () => {
    setAdmin(null);
    localStorage.removeItem('shopy_admin_profile');
    localStorage.removeItem('shopy_admin_token');
    document.cookie = 'shopy_admin_token=; path=/admin; max-age=0; SameSite=Lax';
  };

  const loginPartner = (data: UserProfile, token: string) => {
    setPartner(data);
    localStorage.setItem('shopy_partner_profile', JSON.stringify(data));
    localStorage.setItem('shopy_partner_token', token);
    document.cookie = `shopy_partner_token=${token}; path=/partner; max-age=604800; SameSite=Lax`;
  };

  const logoutPartner = () => {
    setPartner(null);
    localStorage.removeItem('shopy_partner_profile');
    localStorage.removeItem('shopy_partner_token');
    document.cookie = 'shopy_partner_token=; path=/partner; max-age=0; SameSite=Lax';
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        admin,
        partner,
        isLoading,
        loginUser,
        logoutUser,
        loginAdmin,
        logoutAdmin,
        loginPartner,
        logoutPartner,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
