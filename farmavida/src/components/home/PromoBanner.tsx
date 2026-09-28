import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export function PromoBanner() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
      <div className="rounded-2xl bg-amber-50 border border-amber-200/60 p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <p className="text-xs text-amber-600 font-medium mb-1.5">Frete grátis</p>
          <h3 className="font-display text-xl text-ink">Acima de R$ 150,00 em compras, o frete é por nossa conta</h3>
        </div>
        <Link
          to="/categoria/suplementos"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-ink hover:text-forest-700 whitespace-nowrap"
        >
          Ver ofertas
          <ArrowRight size={15} />
        </Link>
      </div>
    </section>
  );
}
