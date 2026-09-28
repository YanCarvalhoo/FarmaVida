import { useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { SlidersHorizontal, X } from "lucide-react";
import { getProductsByCategory } from "@/data/products";
import { categoryLabels, type ProductCategory } from "@/types/product";
import { ProductGrid } from "@/components/product/ProductGrid";
import { Filters, type FilterState } from "@/components/search/Filters";
import { EmptyState } from "@/components/ui/Skeleton";

export default function CategoryPage() {
  const { category } = useParams<{ category: string }>();
  const [filterState, setFilterState] = useState<FilterState>({ maxPrice: null, brand: null, inStockOnly: false });
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const cat = category as ProductCategory;
  const baseProducts = getProductsByCategory(cat);
  const brands = useMemo(() => Array.from(new Set(baseProducts.map((p) => p.brand))), [baseProducts]);
  const priceCeiling = useMemo(
    () => Math.ceil(Math.max(...baseProducts.map((p) => p.promotionalPrice ?? p.price), 10) / 10) * 10,
    [baseProducts]
  );

  const filtered = baseProducts.filter((p) => {
    const price = p.promotionalPrice ?? p.price;
    if (filterState.maxPrice !== null && price > filterState.maxPrice) return false;
    if (filterState.brand && p.brand !== filterState.brand) return false;
    if (filterState.inStockOnly && p.stock === 0) return false;
    return true;
  });

  if (!categoryLabels[cat]) {
    return <div className="max-w-3xl mx-auto px-4 py-20 text-center text-ink/50">Categoria não encontrada.</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <h1 className="font-display text-2xl sm:text-3xl text-ink mb-1">{categoryLabels[cat]}</h1>
      <p className="text-sm text-ink/50 mb-6">{filtered.length} produtos</p>

      <div className="lg:hidden mb-4">
        <button
          onClick={() => setMobileFiltersOpen(true)}
          className="inline-flex items-center gap-2 text-sm border border-line rounded-full px-4 py-2"
        >
          <SlidersHorizontal size={14} />
          Filtros
        </button>
      </div>

      <div className="grid lg:grid-cols-[220px_1fr] gap-8">
        <aside className="hidden lg:block">
          <Filters brands={brands} priceCeiling={priceCeiling} state={filterState} onChange={setFilterState} />
        </aside>

        {filtered.length === 0 ? (
          <EmptyState title="Nenhum produto encontrado" description="Tente ajustar os filtros selecionados." />
        ) : (
          <ProductGrid products={filtered} />
        )}
      </div>

      {mobileFiltersOpen && (
        <div className="fixed inset-0 z-[90] lg:hidden flex items-end">
          <div className="absolute inset-0 bg-ink/40" onClick={() => setMobileFiltersOpen(false)} />
          <div className="relative w-full bg-white rounded-t-2xl p-5 max-h-[80vh] overflow-y-auto animate-slide-up">
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-display text-lg text-ink">Filtros</h2>
              <button onClick={() => setMobileFiltersOpen(false)} aria-label="Fechar filtros">
                <X size={20} />
              </button>
            </div>
            <Filters brands={brands} priceCeiling={priceCeiling} state={filterState} onChange={setFilterState} />
          </div>
        </div>
      )}
    </div>
  );
}
