"use client";

import React, { createContext, useContext, useState } from "react";

interface CartItem {
  id: string;
  name: string;
  price: string;
  image: string;
}

interface AppContextType {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  isAuthModalOpen: boolean;
  setAuthModalOpen: (open: boolean) => void;
  isCartOpen: boolean;
  setCartOpen: (open: boolean) => void;
  notifications: string[];
  addNotification: (msg: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isAuthModalOpen, setAuthModalOpen] = useState(false);
  const [isCartOpen, setCartOpen] = useState(false);
  const [notifications, setNotifications] = useState<string[]>([]);

  const addToCart = (item: CartItem) => {
    setCart((prev) => [...prev, item]);
    addNotification(`Added ${item.name} to cart!`);
  };

  const addNotification = (msg: string) => {
    setNotifications((prev) => [...prev, msg]);
    setTimeout(() => {
      setNotifications((prev) => prev.filter((n) => n !== msg));
    }, 3000);
  };

  return (
    <AppContext.Provider
      value={{
        cart,
        addToCart,
        isAuthModalOpen,
        setAuthModalOpen,
        isCartOpen,
        setCartOpen,
        notifications,
        addNotification,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error("useAppContext must be used within AppProvider");
  return context;
};
