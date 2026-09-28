import type { Product } from "@/types/product";
import { StarRating } from "@/components/ui/StarRating";
import { Badge } from "@/components/ui/Badge";

export function ReviewsSection({ product }: { product: Product }) {
  if (product.reviews.length === 0) {
    return (
      <div className="py-6 text-sm text-ink/50">Este produto ainda não tem avaliações.</div>
    );
  }

  return (
    <div>
      <div className="flex items-center gap-3 mb-5">
        <span className="font-display text-3xl text-ink">{product.rating.toFixed(1)}</span>
        <div>
          <StarRating rating={product.rating} size={16} />
          <p className="text-xs text-ink/50 mt-0.5">{product.reviewCount} avaliações</p>
        </div>
      </div>
      <div className="space-y-5">
        {product.reviews.map((r) => (
          <div key={r.id} className="border-b border-line pb-5 last:border-b-0">
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm font-medium text-ink">{r.author}</span>
              <span className="text-xs text-ink/40">{r.date}</span>
            </div>
            <div className="flex items-center gap-2 mb-1.5">
              <StarRating rating={r.rating} size={12} />
              {r.verified && <Badge tone="forest">Compra verificada</Badge>}
            </div>
            <p className="text-sm text-ink/70 leading-relaxed">{r.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
