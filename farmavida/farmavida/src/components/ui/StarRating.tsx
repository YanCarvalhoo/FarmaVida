import { Star } from "lucide-react";

export function StarRating({ rating, count, size = 14 }: { rating: number; count?: number; size?: number }) {
  return (
    <div className="flex items-center gap-1" aria-label={`Avaliação ${rating.toFixed(1)} de 5`}>
      <div className="flex items-center">
        {Array.from({ length: 5 }).map((_, i) => {
          const filled = i + 1 <= Math.round(rating);
          return (
            <Star
              key={i}
              width={size}
              height={size}
              className={filled ? "fill-amber-500 text-amber-500" : "fill-transparent text-line"}
              strokeWidth={1.5}
            />
          );
        })}
      </div>
      <span className="text-xs text-ink/60">
        {rating.toFixed(1)}
        {typeof count === "number" ? ` (${count})` : ""}
      </span>
    </div>
  );
}
