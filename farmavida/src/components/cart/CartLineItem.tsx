import { Minus, Plus, X } from "lucide-react";
import type { CartItem } from "@/types/cart";
import { formatPrice } from "@/services/aiService";
import { useCart } from "@/context/CartContext";

export function CartLineItem({ item }: { item: CartItem }) {
  const { setQuantity, removeItem } = useCart();
  const unitPrice = item.product.promotionalPrice ?? item.product.price;

  return (
    <div className="flex gap-3 py-4 border-b border-line last:border-b-0">
      <img src={item.product.images[0]} alt={item.product.name} className="w-16 h-16 rounded-lg object-cover shrink-0" />
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <p className="text-sm text-ink font-medium leading-snug line-clamp-2">{item.product.name}</p>
          <button
            onClick={() => removeItem(item.product.id)}
            aria-label={`Remover ${item.product.name}`}
            className="shrink-0 text-ink/30 hover:text-ink/60 p-0.5"
          >
            <X size={15} />
          </button>
        </div>
        <p className="text-xs text-ink/40 mt-0.5">{item.product.brand}</p>
        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center border border-line rounded-full">
            <button
              onClick={() => setQuantity(item.product.id, item.quantity - 1)}
              className="w-7 h-7 flex items-center justify-center text-ink/60 hover:text-ink"
              aria-label="Diminuir quantidade"
            >
              <Minus size={12} />
            </button>
            <span className="w-6 text-center text-sm">{item.quantity}</span>
            <button
              onClick={() => setQuantity(item.product.id, item.quantity + 1)}
              disabled={item.quantity >= item.product.stock}
              className="w-7 h-7 flex items-center justify-center text-ink/60 hover:text-ink disabled:opacity-30"
              aria-label="Aumentar quantidade"
            >
              <Plus size={12} />
            </button>
          </div>
          <span className="text-sm font-medium text-ink">{formatPrice(unitPrice * item.quantity)}</span>
        </div>
      </div>
    </div>
  );
}
