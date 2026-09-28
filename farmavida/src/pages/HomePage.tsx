import { Hero } from "@/components/home/Hero";
import { CategoryGrid } from "@/components/home/CategoryGrid";
import { ProductSection } from "@/components/home/ProductSection";
import { PromoBanner } from "@/components/home/PromoBanner";
import { AIAssistantSection } from "@/components/home/AIAssistantSection";
import { TrustSection } from "@/components/home/TrustSection";
import { products } from "@/data/products";

const featured = products.filter((p) => p.promotionalPrice).slice(0, 8);
const recommended = products.slice(8, 16);

export default function HomePage() {
  return (
    <div>
      <Hero />
      <CategoryGrid />
      <ProductSection title="Em destaque" subtitle="Ofertas selecionadas para você" products={featured} />
      <PromoBanner />
      <ProductSection title="Recomendados para você" subtitle="Baseado nos produtos mais bem avaliados" products={recommended} />
      <AIAssistantSection />
      <TrustSection />
    </div>
  );
}
