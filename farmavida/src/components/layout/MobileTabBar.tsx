import { Home, Search, ShoppingBag, Sparkles, User } from "lucide-react";
import { NavLink } from "react-router-dom";
import { useCart } from "@/context/CartContext";
import { useAIChat } from "@/context/AIChatContext";

export function MobileTabBar() {
  const { itemCount, openDrawer } = useCart();
  const { open } = useAIChat();

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `flex flex-col items-center justify-center gap-0.5 flex-1 h-full text-[11px] ${
      isActive ? "text-forest-700" : "text-ink/50"
    }`;

  return (
    <nav
      className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-line flex items-stretch h-16"
      style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)" }}
    >
      <NavLink to="/" end className={linkClass}>
        <Home size={20} />
        Início
      </NavLink>
      <NavLink to="/busca" className={linkClass}>
        <Search size={20} />
        Buscar
      </NavLink>
      <button onClick={() => open()} className="flex flex-col items-center justify-center gap-0.5 flex-1 h-full text-[11px] text-amber-600">
        <Sparkles size={20} />
        Assistente
      </button>
      <button onClick={openDrawer} className="relative flex flex-col items-center justify-center gap-0.5 flex-1 h-full text-[11px] text-ink/50">
        <ShoppingBag size={20} />
        Carrinho
        {itemCount > 0 && (
          <span className="absolute top-1 right-[28%] min-w-[16px] h-4 px-0.5 rounded-full bg-amber-500 text-forest-900 text-[9px] font-semibold flex items-center justify-center">
            {itemCount}
          </span>
        )}
      </button>
      <NavLink to="/conta" className={linkClass}>
        <User size={20} />
        Conta
      </NavLink>
    </nav>
  );
}
