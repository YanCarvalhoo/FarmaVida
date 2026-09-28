import { createContext, useContext, useMemo, useState, type ReactNode } from "react";
import type { CartItem, CartTotals } from "@/types/cart";
import type { Product } from "@/types/product";

interface CartContextValue {
  items: CartItem[];
  totals: CartTotals;
  isDrawerOpen: boolean;
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (productId: string) => void;
  setQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  openDrawer: () => void;
  closeDrawer: () => void;
  itemCount: number;
}

const CartContext = createContext<CartContextValue | null>(null);

const FREE_SHIPPING_THRESHOLD = 150;
const SHIPPING_COST = 14.9;

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isDrawerOpen, setDrawerOpen] = useState(false);

  function addItem(product: Product, quantity = 1) {
    setItems((prev) => {
      const existing = prev.find((i) => i.product.id === product.id);
      if (existing) {
        return prev.map((i) =>
          i.product.id === product.id ? { ...i, quantity: Math.min(i.quantity + quantity, product.stock) } : i
        );
      }
      return [...prev, { product, quantity: Math.min(quantity, product.stock) }];
    });
    setDrawerOpen(true);
  }

  function removeItem(productId: string) {
    setItems((prev) => prev.filter((i) => i.product.id !== productId));
  }

  function clearCart() {
    setItems([]);
  }

  function setQuantity(productId: string, quantity: number) {
    setItems((prev) =>
      prev
        .map((i) => (i.product.id === productId ? { ...i, quantity: Math.max(1, Math.min(quantity, i.product.stock)) } : i))
        .filter((i) => i.quantity > 0)
    );
  }

  const totals = useMemo<CartTotals>(() => {
    const subtotal = items.reduce((sum, i) => sum + (i.product.promotionalPrice ?? i.product.price) * i.quantity, 0);
    const discount = items.reduce((sum, i) => {
      if (!i.product.promotionalPrice) return sum;
      return sum + (i.product.price - i.product.promotionalPrice) * i.quantity;
    }, 0);
    const shipping = subtotal === 0 || subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_COST;
    return { subtotal, discount, shipping, total: subtotal + shipping };
  }, [items]);

  const itemCount = items.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        totals,
        isDrawerOpen,
        addItem,
        removeItem,
        setQuantity,
        clearCart,
        openDrawer: () => setDrawerOpen(true),
        closeDrawer: () => setDrawerOpen(false),
        itemCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}

export const FREE_SHIPPING_THRESHOLD_VALUE = FREE_SHIPPING_THRESHOLD;
