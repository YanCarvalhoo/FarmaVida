import { useSearchParams } from "react-router-dom";
import { Sparkles } from "lucide-react";
import { searchProducts } from "@/data/products";
import { ProductGrid } from "@/components/product/ProductGrid";
import { EmptyState } from "@/components/ui/Skeleton";
import { Button } from "@/components/ui/Button";
import { useAIChat } from "@/context/AIChatContext";

export default function SearchResultsPage() {
  const [params] = useSearchParams();
  const query = params.get("q") ?? "";
  const results = searchProducts(query);
  const { open: openAI } = useAIChat();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <h1 className="font-display text-2xl text-ink mb-1">Resultados para "{query}"</h1>
      <p className="text-sm text-ink/50 mb-6">{results.length} produtos encontrados</p>

      {results.length === 0 ? (
        <EmptyState
          title="Não encontramos produtos para essa busca"
          description="Tente outros termos, ou conte ao assistente o que você precisa — ele pode ajudar a encontrar a categoria certa."
          action={
            <Button icon={<Sparkles size={15} />} onClick={() => openAI(`Estou procurando: ${query}`)}>
              Perguntar ao assistente
            </Button>
          }
        />
      ) : (
        <ProductGrid products={results} />
      )}
    </div>
  );
}
