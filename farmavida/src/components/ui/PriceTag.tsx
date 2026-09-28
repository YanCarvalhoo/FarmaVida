import { formatPrice } from "@/services/aiService";
import type { Product } from "@/types/product";

export function PriceTag({ product, size = "md" }: { product: Product; size?: "sm" | "md" | "lg" }) {
  const hasPromo = typeof product.promotionalPrice === "number" && product.promotionalPrice < product.price;
  const priceClass = { sm: "text-base", md: "text-xl", lg: "text-3xl" }[size];
  const percentOff = hasPromo ? Math.round((1 - product.promotionalPrice! / product.price) * 100) : 0;

  return (
    <div className="flex items-baseline gap-2 flex-wrap">
      {hasPromo && <span className="text-sm text-ink/40 line-through">{formatPrice(product.price)}</span>}
      <span className={`font-display font-medium text-ink ${priceClass}`}>
        {formatPrice(hasPromo ? product.promotionalPrice! : product.price)}
      </span>
      {hasPromo && (
        <span className="text-xs font-medium text-forest-600 bg-forest-50 rounded-full px-2 py-0.5">
          -{percentOff}%
        </span>
      )}
    </div>
  );
}
