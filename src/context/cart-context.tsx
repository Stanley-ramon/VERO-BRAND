"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";

export type CartItem = {
  variantId: string;
  productName: string;
  color: string;
  imageUrl: string;
  priceInCents: number;
  quantity: number;
};

type CartContextType = {
  items: CartItem[];
  totalItems: number;

  addItem: (item: CartItem) => void;
  removeItem: (variantId: string) => void;
  clearCart: () => void;
  updateQuantity: (variantId: string, quantity: number) => void;

  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
};

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  function openCart() {
    setIsCartOpen(true);
  }

  function closeCart() {
    setIsCartOpen(false);
  }

  // ✅ carregar do localStorage (sanitizado, sem "any")
  useEffect(() => {
    const stored = localStorage.getItem("cart");
    if (!stored) return;

    try {
      const parsed: unknown = JSON.parse(stored);
      if (!Array.isArray(parsed)) return;

      const sanitized: CartItem[] = parsed
        .map((raw): CartItem | null => {
          if (typeof raw !== "object" || raw === null) return null;

          const i = raw as Record<string, unknown>;

          const variantId = String(i.variantId ?? "");
          const productName = String(i.productName ?? "Produto");
          const color = String(i.color ?? "");
          const imageUrl = String(i.imageUrl ?? "");
          const priceInCents = Number(i.priceInCents ?? 0);
          const quantity = Number(i.quantity ?? 1);

          if (
            !variantId ||
            !imageUrl ||
            !Number.isFinite(priceInCents) ||
            !Number.isFinite(quantity) ||
            quantity <= 0
          ) {
            return null;
          }

          return {
            variantId,
            productName,
            color,
            imageUrl,
            priceInCents,
            quantity,
          };
        })
        .filter((x): x is CartItem => x !== null);

      setItems(sanitized);
    } catch {
      setItems([]);
    }
  }, []);

  // ✅ salvar no localStorage
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(items));
  }, [items]);

  const totalItems = useMemo(
    () => items.reduce((acc, item) => acc + Number(item.quantity || 0), 0),
    [items],
  );

  function addItem(newItem: CartItem) {
    setItems((prev) => {
      const existing = prev.find((i) => i.variantId === newItem.variantId);

      if (existing) {
        return prev.map((i) =>
          i.variantId === newItem.variantId
            ? { ...i, quantity: i.quantity + newItem.quantity }
            : i,
        );
      }

      return [...prev, newItem];
    });
  }

  function updateQuantity(variantId: string, quantity: number) {
    setItems((prev) =>
      prev
        .map((i) => {
          if (i.variantId !== variantId) return i;
          const nextQty = Math.max(1, Number(quantity));
          return { ...i, quantity: nextQty };
        })
        .filter((i) => i.quantity > 0),
    );
  }

  function removeItem(variantId: string) {
    setItems((prev) => prev.filter((i) => i.variantId !== variantId));
  }

  function clearCart() {
    setItems([]);
  }

  return (
    <CartContext.Provider
      value={{
        items,
        totalItems,
        addItem,
        removeItem,
        clearCart,
        updateQuantity,
        isCartOpen,
        openCart,
        closeCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}
