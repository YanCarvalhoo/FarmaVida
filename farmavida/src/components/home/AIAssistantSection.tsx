import { MessageCircle, Sparkles } from "lucide-react";
import { useAIChat } from "@/context/AIChatContext";
import { Button } from "@/components/ui/Button";

const examplePrompts = ["Quero emagrecer", "Preciso dormir melhor", "Nutrição pós-treino", "Cuidados com o bebê"];

export function AIAssistantSection() {
  const { open } = useAIChat();

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
      <div className="rounded-2xl bg-forest-50 border border-forest-100 p-6 sm:p-10 grid lg:grid-cols-2 gap-8 items-center">
        <div>
          <span className="inline-flex items-center gap-1.5 text-xs font-medium text-forest-700 bg-white rounded-full px-3 py-1 mb-4">
            <Sparkles size={13} />
            Assistente de compras
          </span>
          <h2 className="font-display text-2xl sm:text-3xl text-ink mb-3 max-w-md">
            Conte o que você precisa, não qual produto comprar
          </h2>
          <p className="text-sm text-ink/60 max-w-md mb-6 leading-relaxed">
            O assistente faz algumas perguntas para entender sua necessidade antes de sugerir
            qualquer coisa — e sempre explica por que cada produto pode ajudar.
          </p>
          <Button icon={<MessageCircle size={16} />} onClick={() => open()}>
            Conversar com o assistente
          </Button>
        </div>
        <div className="flex flex-col gap-2.5">
          {examplePrompts.map((p) => (
            <button
              key={p}
              onClick={() => open(p)}
              className="text-left text-sm text-ink bg-white border border-line rounded-xl px-4 py-3 hover:border-forest-300 transition-colors"
            >
              "{p}"
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
