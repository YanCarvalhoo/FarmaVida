import { Link } from "react-router-dom";
import { ShoppingBag } from "lucide-react";
import type { Product } from "@/types/product";
import { PriceTag } from "@/components/ui/PriceTag";
import { StarRating } from "@/components/ui/StarRating";
import { Badge } from "@/components/ui/Badge";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/context/ToastContext";

export function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart();
  const { showToast } = useToast();
  const lowStock = product.stock > 0 && product.stock <= 10;
  const outOfStock = product.stock === 0;

  function handleAdd(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    addItem(product, 1);
    showToast(`${product.name} adicionado ao carrinho`);
  }

  return (
    <Link
      to={`/produto/${product.id}`}
      className="group relative flex flex-col rounded-xl2 border border-line bg-white p-3 shadow-card transition-transform duration-200 hover:-translate-y-0.5 hover:shadow-lift focus-visible:outline focus-visible:outline-2 focus-visible:outline-forest-700"
    >
      <div className="relative aspect-square rounded-lg overflow-hidden bg-paper mb-3">
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
        />
        {product.promotionalPrice && (
          <div className="absolute top-2 left-2">
            <Badge tone="amber">Oferta</Badge>
          </div>
        )}
      </div>
      <span className="text-xs text-ink/50 mb-0.5">{product.brand}</span>
      <h3 className="text-sm font-medium text-ink leading-snug mb-1.5 line-clamp-2">{product.name}</h3>
      <StarRating rating={product.rating} count={product.reviewCount} />
      <div className="mt-2 flex items-end justify-between gap-2">
        <PriceTag product={product} size="sm" />
        <button
          onClick={handleAdd}
          disabled={outOfStock}
          aria-label={`Adicionar ${product.name} ao carrinho`}
          className="shrink-0 w-9 h-9 rounded-full bg-forest-700 text-paper flex items-center justify-center transition-colors hover:bg-forest-800 disabled:bg-line disabled:text-ink/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest-700"
        >
          <ShoppingBag size={15} />
        </button>
      </div>
      {lowStock && <span className="text-xs text-amber-600 mt-1">Últimas unidades</span>}
      {outOfStock && <span className="text-xs text-ink/40 mt-1">Esgotado</span>}
    </Link>
  );
}
