import { Sparkles } from "lucide-react";
import { SearchBar } from "@/components/search/SearchBar";
import { useAIChat } from "@/context/AIChatContext";

export function Hero() {
  const { open } = useAIChat();

  return (
    <section className="bg-forest-800 text-paper">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-14 sm:py-20 grid lg:grid-cols-2 gap-10 items-center">
        <div>
          <h1 className="font-display text-4xl sm:text-5xl leading-[1.08] mb-5 max-w-lg">
            Cuidado com você, sem complicação
          </h1>
          <p className="text-paper/70 text-base sm:text-lg max-w-md mb-8 leading-relaxed">
            Medicamentos, vitaminas e cuidados do dia a dia — com um assistente que te ajuda a
            entender o que você realmente precisa antes de indicar qualquer produto.
          </p>
          <div className="max-w-md mb-4">
            <SearchBar variant="hero" />
          </div>
          <button
            onClick={() => open()}
            className="inline-flex items-center gap-2 text-sm text-amber-300 hover:text-amber-200 mt-2"
          >
            <Sparkles size={16} />
            Não sabe por onde começar? Fale com o assistente
          </button>
        </div>
        <div className="hidden lg:flex justify-end">
          <div className="grid grid-cols-2 gap-4 w-full max-w-sm">
            {[
              { label: "Entrega rápida", value: "Todo o Brasil" },
              { label: "Farmacêutico", value: "Sempre disponível" },
              { label: "Produtos", value: "+2.000 itens" },
              { label: "Avaliação média", value: "4.8 de 5" },
            ].map((stat) => (
              <div key={stat.label} className="rounded-2xl bg-paper/10 border border-paper/10 p-5">
                <p className="text-xs text-paper/60 mb-1">{stat.label}</p>
                <p className="font-display text-lg">{stat.value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
