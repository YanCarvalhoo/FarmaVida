import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { CreditCard, QrCode, Wallet } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/services/aiService";
import { Button } from "@/components/ui/Button";

type PaymentMethod = "pix" | "credito" | "debito";

const inputClass =
  "w-full h-11 rounded-lg border border-line px-3.5 text-sm bg-white focus:outline-none focus:border-forest-500 focus:ring-2 focus:ring-forest-100";
const labelClass = "text-xs text-ink/60 mb-1.5 block";

export default function CheckoutPage() {
  const { items, totals, clearCart } = useCart();
  const navigate = useNavigate();
  const [payment, setPayment] = useState<PaymentMethod>("pix");
  const [submitting, setSubmitting] = useState(false);

  if (items.length === 0) {
    return (
      <div className="max-w-lg mx-auto px-4 py-20 text-center">
        <h1 className="font-display text-xl text-ink mb-2">Sua sacola está vazia</h1>
        <p className="text-sm text-ink/50 mb-6">Adicione produtos antes de finalizar a compra.</p>
        <Button onClick={() => navigate("/")}>Voltar para a loja</Button>
      </div>
    );
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    const orderNumber = String(Math.floor(100000 + Math.random() * 900000));
    const total = totals.total;
    const method = payment;
    setTimeout(() => {
      navigate("/pedido-confirmado", { state: { orderNumber, total, method } });
      clearCart();
    }, 900);
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
      <h1 className="font-display text-2xl text-ink mb-6">Finalizar compra</h1>
      <form onSubmit={handleSubmit} className="grid lg:grid-cols-[1fr_360px] gap-8">
        <div className="space-y-8">
          <section>
            <h2 className="text-sm font-medium text-ink mb-3">Seus dados</h2>
            <div className="grid sm:grid-cols-2 gap-3">
              <div className="sm:col-span-2">
                <label className={labelClass}>Nome completo</label>
                <input required className={inputClass} placeholder="Seu nome completo" />
              </div>
              <div>
                <label className={labelClass}>CPF</label>
                <input required className={inputClass} placeholder="000.000.000-00" />
              </div>
              <div>
                <label className={labelClass}>Telefone</label>
                <input required className={inputClass} placeholder="(00) 00000-0000" />
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-sm font-medium text-ink mb-3">Endereço de entrega</h2>
            <div className="grid sm:grid-cols-3 gap-3">
              <div>
                <label className={labelClass}>CEP</label>
                <input required className={inputClass} placeholder="00000-000" />
              </div>
              <div className="sm:col-span-2">
                <label className={labelClass}>Endereço</label>
                <input required className={inputClass} placeholder="Rua, avenida..." />
              </div>
              <div>
                <label className={labelClass}>Número</label>
                <input required className={inputClass} placeholder="123" />
              </div>
              <div>
                <label className={labelClass}>Complemento</label>
                <input className={inputClass} placeholder="Apto, bloco (opcional)" />
              </div>
              <div>
                <label className={labelClass}>Bairro</label>
                <input required className={inputClass} placeholder="Bairro" />
              </div>
              <div>
                <label className={labelClass}>Cidade</label>
                <input required className={inputClass} placeholder="Cidade" />
              </div>
              <div>
                <label className={labelClass}>Estado</label>
                <input required className={inputClass} placeholder="UF" maxLength={2} />
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-sm font-medium text-ink mb-3">Forma de pagamento</h2>
            <div className="grid sm:grid-cols-3 gap-3">
              {[
                { id: "pix" as const, label: "Pix", icon: QrCode, note: "Aprovação imediata" },
                { id: "credito" as const, label: "Cartão de crédito", icon: CreditCard, note: "Em até 3x sem juros" },
                { id: "debito" as const, label: "Cartão de débito", icon: Wallet, note: "Aprovação imediata" },
              ].map((opt) => (
                <button
                  type="button"
                  key={opt.id}
                  onClick={() => setPayment(opt.id)}
                  className={`text-left rounded-xl border p-4 transition-colors ${
                    payment === opt.id ? "border-forest-700 bg-forest-50" : "border-line bg-white"
                  }`}
                >
                  <opt.icon size={18} className="text-forest-700 mb-2" />
                  <p className="text-sm font-medium text-ink">{opt.label}</p>
                  <p className="text-xs text-ink/50 mt-0.5">{opt.note}</p>
                </button>
              ))}
            </div>
          </section>
        </div>

        <aside className="lg:sticky lg:top-24 h-fit rounded-2xl border border-line bg-white p-5">
          <h2 className="text-sm font-medium text-ink mb-4">Resumo do pedido</h2>
          <div className="space-y-3 mb-4 max-h-64 overflow-y-auto pr-1">
            {items.map((item) => (
              <div key={item.product.id} className="flex items-center gap-3">
                <img src={item.product.images[0]} alt="" className="w-11 h-11 rounded-md object-cover shrink-0" />
                <div className="min-w-0 flex-1">
                  <p className="text-xs text-ink leading-snug line-clamp-2">{item.product.name}</p>
                  <p className="text-xs text-ink/40">Qtd: {item.quantity}</p>
                </div>
                <span className="text-xs text-ink font-medium shrink-0">
                  {formatPrice((item.product.promotionalPrice ?? item.product.price) * item.quantity)}
                </span>
              </div>
            ))}
          </div>
          <div className="space-y-1.5 text-sm border-t border-line pt-4">
            <div className="flex justify-between text-ink/60">
              <span>Subtotal</span>
              <span>{formatPrice(totals.subtotal)}</span>
            </div>
            {totals.discount > 0 && (
              <div className="flex justify-between text-forest-600">
                <span>Descontos</span>
                <span>-{formatPrice(totals.discount)}</span>
              </div>
            )}
            <div className="flex justify-between text-ink/60">
              <span>Frete</span>
              <span>{totals.shipping === 0 ? "Grátis" : formatPrice(totals.shipping)}</span>
            </div>
            <div className="flex justify-between font-medium text-ink text-base pt-1.5 border-t border-line mt-1.5">
              <span>Total</span>
              <span>{formatPrice(totals.total)}</span>
            </div>
          </div>
          <Button type="submit" fullWidth size="lg" className="mt-5" disabled={submitting}>
            {submitting ? "Processando..." : "Confirmar pedido"}
          </Button>
        </aside>
      </form>
    </div>
  );
}
