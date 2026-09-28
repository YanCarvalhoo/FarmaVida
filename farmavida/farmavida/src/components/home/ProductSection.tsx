import type { Product } from "@/types/product";
import { ProductGrid } from "@/components/product/ProductGrid";

export function ProductSection({
  title,
  subtitle,
  products,
}: {
  title: string;
  subtitle?: string;
  products: Product[];
}) {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <div className="mb-5">
        <h2 className="font-display text-2xl text-ink">{title}</h2>
        {subtitle && <p className="text-sm text-ink/50 mt-1">{subtitle}</p>}
      </div>
      <ProductGrid products={products} />
    </section>
  );
}
