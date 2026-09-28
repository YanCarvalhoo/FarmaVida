import { Link, NavLink } from "react-router-dom";
import { Leaf, Menu, Package, ShoppingBag, User, X } from "lucide-react";
import { useState } from "react";
import { SearchBar } from "@/components/search/SearchBar";
import { useCart } from "@/context/CartContext";
import { categoryLabels, type ProductCategory } from "@/types/product";

const topCategories: ProductCategory[] = ["vitaminas", "suplementos", "cuidados-pessoais", "bem-estar", "medicamentos", "beleza"];

export function Header() {
  const { itemCount, openDrawer } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-paper/95 backdrop-blur border-b border-line" style={{ paddingTop: "env(safe-area-inset-top, 0px)" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center gap-3 sm:gap-6 h-16">
          <button
            className="lg:hidden p-2 -ml-2 text-ink/70"
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Abrir menu"
          >
            <Menu size={22} />
          </button>

          <Link to="/" className="flex items-center gap-2 shrink-0">
            <span className="w-8 h-8 rounded-lg bg-forest-700 flex items-center justify-center">
              <Leaf size={16} className="text-paper" />
            </span>
            <span className="font-display text-lg text-ink hidden sm:inline">Farmavida</span>
          </Link>

          <div className="hidden md:block flex-1 max-w-xl">
            <SearchBar />
          </div>

          <nav className="ml-auto flex items-center gap-1 sm:gap-2">
            <Link
              to="/conta"
              className="hidden sm:flex items-center gap-1.5 px-2.5 py-2 rounded-lg text-sm text-ink/70 hover:bg-white"
            >
              <User size={18} />
              <span>Conta</span>
            </Link>
            <Link
              to="/pedidos"
              className="hidden sm:flex items-center gap-1.5 px-2.5 py-2 rounded-lg text-sm text-ink/70 hover:bg-white"
            >
              <Package size={18} />
              <span>Pedidos</span>
            </Link>
            <button
              onClick={openDrawer}
              className="relative flex items-center gap-1.5 px-2.5 py-2 rounded-lg text-sm text-ink/70 hover:bg-white"
              aria-label={`Carrinho, ${itemCount} itens`}
            >
              <ShoppingBag size={20} />
              {itemCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] px-0.5 rounded-full bg-amber-500 text-forest-900 text-[10px] font-semibold flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </button>
          </nav>
        </div>

        <div className="md:hidden pb-3">
          <SearchBar />
        </div>

        <div className="hidden lg:flex items-center gap-1 h-11 -mt-1 border-t border-line/70">
          {topCategories.map((cat) => (
            <NavLink
              key={cat}
              to={`/categoria/${cat}`}
              className={({ isActive }) =>
                `px-3 h-11 flex items-center text-sm transition-colors ${
                  isActive ? "text-forest-700 font-medium" : "text-ink/60 hover:text-ink"
                }`
              }
            >
              {categoryLabels[cat]}
            </NavLink>
          ))}
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="fixed inset-0 z-[90] lg:hidden">
          <div className="absolute inset-0 bg-ink/40" onClick={() => setMobileMenuOpen(false)} />
          <div className="absolute left-0 top-0 bottom-0 w-72 bg-white shadow-lift p-5 animate-fade-in">
            <div className="flex items-center justify-between mb-6">
              <span className="font-display text-lg text-ink">Farmavida</span>
              <button onClick={() => setMobileMenuOpen(false)} aria-label="Fechar menu" className="p-1.5">
                <X size={20} />
              </button>
            </div>
            <nav className="flex flex-col gap-1">
              {(Object.keys(categoryLabels) as ProductCategory[]).map((cat) => (
                <Link
                  key={cat}
                  to={`/categoria/${cat}`}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-3 py-2.5 rounded-lg text-sm text-ink/80 hover:bg-paper"
                >
                  {categoryLabels[cat]}
                </Link>
              ))}
              <div className="h-px bg-line my-2" />
              <Link to="/conta" onClick={() => setMobileMenuOpen(false)} className="px-3 py-2.5 rounded-lg text-sm text-ink/80 hover:bg-paper">
                Minha conta
              </Link>
              <Link to="/pedidos" onClick={() => setMobileMenuOpen(false)} className="px-3 py-2.5 rounded-lg text-sm text-ink/80 hover:bg-paper">
                Meus pedidos
              </Link>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}
