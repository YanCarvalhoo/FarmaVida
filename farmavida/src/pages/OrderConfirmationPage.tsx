import { CheckCircle2 } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/Button";
import { formatPrice } from "@/services/aiService";

interface OrderState {
  orderNumber: string;
  total: number;
  method: "pix" | "credito" | "debito";
}

const methodLabel: Record<OrderState["method"], string> = {
  pix: "Pix",
  credito: "Cartão de crédito",
  debito: "Cartão de débito",
};

export default function OrderConfirmationPage() {
  const location = useLocation();
  const order = location.state as OrderState | null;

  return (
    <div className="max-w-lg mx-auto px-4 py-16 text-center">
      <span className="w-16 h-16 rounded-full bg-forest-50 flex items-center justify-center mx-auto mb-5">
        <CheckCircle2 size={30} className="text-forest-700" />
      </span>
      <h1 className="font-display text-2xl text-ink mb-2">Pedido confirmado</h1>
      {order ? (
        <>
          <p className="text-sm text-ink/60 mb-6">
            Pedido <span className="font-medium text-ink">#{order.orderNumber}</span> recebido. Você vai receber
            as atualizações de entrega por e-mail.
          </p>
          <div className="rounded-xl border border-line bg-white p-4 text-sm text-left mb-8 space-y-2">
            <div className="flex justify-between">
              <span className="text-ink/50">Pagamento</span>
              <span className="text-ink">{methodLabel[order.method]}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-ink/50">Total</span>
              <span className="text-ink font-medium">{formatPrice(order.total)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-ink/50">Previsão de entrega</span>
              <span className="text-ink">3 a 5 dias úteis</span>
            </div>
          </div>
        </>
      ) : (
        <p className="text-sm text-ink/60 mb-8">Obrigado pela sua compra.</p>
      )}
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <Link to="/pedidos">
          <Button variant="outline">Acompanhar pedido</Button>
        </Link>
        <Link to="/">
          <Button>Continuar comprando</Button>
        </Link>
      </div>
    </div>
  );
}
