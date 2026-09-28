import { Link } from "react-router-dom";
import { Baby, Dumbbell, Droplet, Leaf, Pill, ShowerHead, Sparkles, Sun, type LucideIcon } from "lucide-react";
import { categoryLabels, type ProductCategory } from "@/types/product";

const icons: Record<ProductCategory, LucideIcon> = {
  vitaminas: Sun,
  suplementos: Dumbbell,
  "cuidados-pessoais": Droplet,
  higiene: ShowerHead,
  "bem-estar": Leaf,
  medicamentos: Pill,
  bebe: Baby,
  beleza: Sparkles,
};

export function CategoryGrid() {
  const cats = Object.keys(categoryLabels) as ProductCategory[];
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
      <h2 className="font-display text-2xl text-ink mb-5">Explore por categoria</h2>
      <div className="grid grid-cols-4 sm:grid-cols-4 lg:grid-cols-8 gap-3">
        {cats.map((cat) => {
          const Icon = icons[cat];
          return (
            <Link
              key={cat}
              to={`/categoria/${cat}`}
              className="flex flex-col items-center gap-2 rounded-2xl border border-line bg-white p-4 text-center hover:border-forest-300 hover:-translate-y-0.5 transition-all"
            >
              <span className="w-10 h-10 rounded-full bg-forest-50 flex items-center justify-center">
                <Icon size={18} className="text-forest-700" />
              </span>
              <span className="text-xs text-ink/70 leading-tight">{categoryLabels[cat]}</span>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
