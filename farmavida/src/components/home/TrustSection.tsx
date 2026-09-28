import { Award, RotateCcw, ShieldCheck, Truck } from "lucide-react";

const benefits = [
  { icon: ShieldCheck, title: "Farmacêutico responsável", text: "Toda a operação segue as normas da vigilância sanitária." },
  { icon: Truck, title: "Entrega para todo o Brasil", text: "Rastreamento em tempo real do pedido até a sua porta." },
  { icon: RotateCcw, title: "Troca facilitada", text: "7 dias para trocar produtos com embalagem lacrada." },
  { icon: Award, title: "Produtos selecionados", text: "Marcas avaliadas e com boa reputação entre os clientes." },
];

export function TrustSection() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {benefits.map((b) => (
          <div key={b.title} className="flex flex-col gap-2.5">
            <b.icon size={20} className="text-forest-700" />
            <h3 className="text-sm font-medium text-ink">{b.title}</h3>
            <p className="text-xs text-ink/50 leading-relaxed">{b.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
