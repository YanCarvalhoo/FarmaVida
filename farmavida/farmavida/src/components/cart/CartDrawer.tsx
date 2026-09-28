import { ShoppingBag, Sparkles, X } from "lucide-react";
import { Link } from "react-router-dom";
import { useCart, FREE_SHIPPING_THRESHOLD_VALUE } from "@/context/CartContext";
import { useAIChat } from "@/context/AIChatContext";
import { formatPrice } from "@/services/aiService";
import { CartLineItem } from "./CartLineItem";
import { Button } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/Skeleton";

export function CartDrawer() {
  const { items, totals, isDrawerOpen, closeDrawer } = useCart();
  const { open: openAI } = useAIChat();

  if (!isDrawerOpen) return null;

  const remainingForFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD_VALUE - totals.subtotal);

  return (
    <div className="fixed inset-0 z-[95] flex justify-end">
      <div className="absolute inset-0 bg-ink/40 animate-fade-in" onClick={closeDrawer} />
      <div className="relative w-full sm:w-[420px] h-full bg-white flex flex-col animate-slide-up sm:animate-fade-in">
        <div className="flex items-center justify-between px-5 py-4 border-b border-line shrink-0" style={{ paddingTop: "calc(1rem + env(safe-area-inset-top, 0px))" }}>
          <h2 className="font-display text-lg text-ink">Sua sacola</h2>
          <button onClick={closeDrawer} aria-label="Fechar carrinho" className="p-1.5 rounded-full hover:bg-paper">
            <X size={20} />
          </button>
        </div>

        {items.length === 0 ? (
          <div className="flex-1 flex items-center justify-center">
            <EmptyState
              title="Sua sacola está vazia"
              description="Explore nossos produtos ou converse com o assistente para receber recomendações."
              action={
                <Button variant="outline" onClick={() => { closeDrawer(); openAI(); }} icon={<Sparkles size={15} />}>
                  Pedir sugestões
                </Button>
              }
            />
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto px-5">
              {remainingForFreeShipping > 0 ? (
                <p className="text-xs text-forest-700 bg-forest-50 rounded-lg px-3 py-2 mt-4">
                  Faltam {formatPrice(remainingForFreeShipping)} para frete grátis
                </p>
              ) : (
                <p className="text-xs text-forest-700 bg-forest-50 rounded-lg px-3 py-2 mt-4">
                  Você garantiu frete grátis 🎉
                </p>
              )}
              {items.map((item) => (
                <CartLineItem key={item.product.id} item={item} />
              ))}
              <button
                onClick={() => {
                  closeDrawer();
                  openAI("Tenho tudo que preciso no meu carrinho?");
                }}
                className="w-full flex items-center gap-2 text-sm text-forest-700 py-3 mb-4"
              >
                <Sparkles size={15} />
                Perguntar ao assistente se falta algo
              </button>
            </div>

            <div className="shrink-0 border-t border-line px-5 py-4" style={{ paddingBottom: "calc(1rem + env(safe-area-inset-bottom, 0px))" }}>
              <div className="space-y-1.5 mb-4">
                <div className="flex justify-between text-sm text-ink/60">
                  <span>Subtotal</span>
                  <span>{formatPrice(totals.subtotal)}</span>
                </div>
                {totals.discount > 0 && (
                  <div className="flex justify-between text-sm text-forest-600">
                    <span>Descontos</span>
                    <span>-{formatPrice(totals.discount)}</span>
                  </div>
                )}
                <div className="flex justify-between text-sm text-ink/60">
                  <span>Frete estimado</span>
                  <span>{totals.shipping === 0 ? "Grátis" : formatPrice(totals.shipping)}</span>
                </div>
                <div className="flex justify-between text-base font-medium text-ink pt-1.5 border-t border-line mt-1.5">
                  <span>Total</span>
                  <span>{formatPrice(totals.total)}</span>
                </div>
              </div>
              <Link to="/checkout" onClick={closeDrawer}>
                <Button fullWidth size="lg" icon={<ShoppingBag size={16} />}>
                  Finalizar compra
                </Button>
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
