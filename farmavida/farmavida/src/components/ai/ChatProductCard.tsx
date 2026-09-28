import { Link } from "react-router-dom";
import type { Product } from "@/types/product";
import { PriceTag } from "@/components/ui/PriceTag";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/context/ToastContext";
import { Plus } from "lucide-react";

export function ChatProductCard({ product }: { product: Product }) {
  const { addItem } = useCart();
  const { showToast } = useToast();

  return (
    <div className="flex items-center gap-3 rounded-xl border border-line bg-white p-2.5 w-64 shrink-0">
      <Link to={`/produto/${product.id}`} className="shrink-0">
        <img src={product.images[0]} alt={product.name} className="w-14 h-14 rounded-lg object-cover" />
      </Link>
      <div className="min-w-0 flex-1">
        <Link to={`/produto/${product.id}`} className="text-xs font-medium text-ink leading-snug line-clamp-2 hover:underline">
          {product.name}
        </Link>
        <div className="mt-1">
          <PriceTag product={product} size="sm" />
        </div>
      </div>
      <button
        onClick={() => {
          addItem(product, 1);
          showToast(`${product.name} adicionado ao carrinho`);
        }}
        aria-label={`Adicionar ${product.name} ao carrinho`}
        className="shrink-0 w-8 h-8 rounded-full bg-forest-700 text-paper flex items-center justify-center hover:bg-forest-800"
      >
        <Plus size={14} />
      </button>
    </div>
  );
}
