import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ChevronRight, Minus, Plus, ShieldCheck, ShoppingBag, Sparkles, Truck } from "lucide-react";
import { getProductById, getRelatedProducts } from "@/data/products";
import { categoryLabels } from "@/types/product";
import { ProductGallery } from "@/components/product/ProductGallery";
import { PriceTag } from "@/components/ui/PriceTag";
import { StarRating } from "@/components/ui/StarRating";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { ReviewsSection } from "@/components/product/ReviewsSection";
import { ProductGrid } from "@/components/product/ProductGrid";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/context/ToastContext";
import { useAIChat } from "@/context/AIChatContext";

const sections = [
  { id: "descricao", label: "Descrição" },
  { id: "composicao", label: "Composição" },
  { id: "avaliacoes", label: "Avaliações" },
] as const;

export default function ProductPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const product = id ? getProductById(id) : undefined;
  const { addItem } = useCart();
  const { showToast } = useToast();
  const { open: openAI } = useAIChat();
  const [quantity, setQuantity] = useState(1);
  const [activeSection, setActiveSection] = useState<(typeof sections)[number]["id"]>("descricao");

  useEffect(() => {
    window.scrollTo(0, 0);
    setQuantity(1);
    setActiveSection("descricao");
  }, [id]);

  if (!product) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center">
        <h1 className="font-display text-xl text-ink mb-2">Produto não encontrado</h1>
        <p className="text-sm text-ink/50 mb-6">O produto que você procura não existe ou foi removido.</p>
        <Link to="/">
          <Button>Voltar para a loja</Button>
        </Link>
      </div>
    );
  }

  const related = getRelatedProducts(product);
  const outOfStock = product.stock === 0;
  const lowStock = product.stock > 0 && product.stock <= 10;

  function handleAddToCart() {
    addItem(product!, quantity);
    showToast(`${product!.name} adicionado ao carrinho`);
  }

  function handleBuyNow() {
    addItem(product!, quantity);
    navigate("/checkout");
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
      <nav className="flex items-center gap-1.5 text-xs text-ink/40 mb-6 flex-wrap">
        <Link to="/" className="hover:text-ink/70">Início</Link>
        <ChevronRight size={12} />
        <Link to={`/categoria/${product.category}`} className="hover:text-ink/70">{categoryLabels[product.category]}</Link>
        <ChevronRight size={12} />
        <span className="text-ink/60">{product.name}</span>
      </nav>

      <div className="grid lg:grid-cols-2 gap-10 mb-14">
        <ProductGallery images={product.images} name={product.name} />

        <div>
          <p className="text-sm text-ink/50 mb-1">{product.brand}</p>
          <h1 className="font-display text-2xl sm:text-3xl text-ink mb-3 leading-snug">{product.name}</h1>
          <div className="mb-4">
            <StarRating rating={product.rating} count={product.reviewCount} size={16} />
          </div>
          <PriceTag product={product} size="lg" />

          <div className="mt-3 mb-6">
            {outOfStock ? (
              <Badge tone="danger">Produto esgotado</Badge>
            ) : lowStock ? (
              <Badge tone="amber">Últimas {product.stock} unidades</Badge>
            ) : (
              <Badge tone="forest">Em estoque</Badge>
            )}
          </div>

          <p className="text-sm text-ink/70 leading-relaxed mb-6 max-w-lg">{product.shortDescription}</p>

          <div className="flex items-center gap-3 mb-4">
            <div className="flex items-center border border-line rounded-full">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="w-10 h-10 flex items-center justify-center text-ink/60 hover:text-ink"
                aria-label="Diminuir quantidade"
              >
                <Minus size={14} />
              </button>
              <span className="w-8 text-center text-sm">{quantity}</span>
              <button
                onClick={() => setQuantity((q) => Math.min(product.stock, q + 1))}
                className="w-10 h-10 flex items-center justify-center text-ink/60 hover:text-ink"
                aria-label="Aumentar quantidade"
                disabled={quantity >= product.stock}
              >
                <Plus size={14} />
              </button>
            </div>
            {product.requiresPrescription === false && (
              <span className="text-xs text-ink/40">Medicamento isento de prescrição</span>
            )}
          </div>

          <div className="flex flex-col sm:flex-row gap-3 mb-4">
            <Button size="lg" fullWidth icon={<ShoppingBag size={17} />} disabled={outOfStock} onClick={handleAddToCart}>
              Adicionar ao carrinho
            </Button>
            <Button size="lg" variant="outline" fullWidth disabled={outOfStock} onClick={handleBuyNow}>
              Comprar agora
            </Button>
          </div>

          <button
            onClick={() => openAI(`Me fale mais sobre o produto ${product.name}`)}
            className="w-full flex items-center justify-center gap-2 text-sm text-forest-700 border border-forest-100 bg-forest-50 rounded-xl py-3 mb-6 hover:bg-forest-100 transition-colors"
          >
            <Sparkles size={15} />
            Perguntar à IA sobre este produto
          </button>

          <div className="flex flex-col gap-3 text-sm text-ink/60 border-t border-line pt-5">
            <div className="flex items-center gap-2.5">
              <Truck size={16} className="text-forest-700 shrink-0" />
              Frete grátis para compras acima de R$ 150,00
            </div>
            <div className="flex items-center gap-2.5">
              <ShieldCheck size={16} className="text-forest-700 shrink-0" />
              Compra segura, com farmacêutico responsável
            </div>
          </div>
        </div>
      </div>

      <div className="border-b border-line mb-6 flex gap-6 overflow-x-auto">
        {sections.map((s) => (
          <button
            key={s.id}
            onClick={() => setActiveSection(s.id)}
            className={`pb-3 text-sm whitespace-nowrap border-b-2 transition-colors ${
              activeSection === s.id ? "border-forest-700 text-ink font-medium" : "border-transparent text-ink/50"
            }`}
          >
            {s.label}
          </button>
        ))}
      </div>

      <div className="max-w-3xl mb-16">
        {activeSection === "descricao" && (
          <div className="space-y-4">
            <p className="text-sm text-ink/70 leading-relaxed">{product.description}</p>
            {product.usage && (
              <div>
                <h3 className="text-sm font-medium text-ink mb-1.5">Modo de uso</h3>
                <p className="text-sm text-ink/70 leading-relaxed">{product.usage}</p>
              </div>
            )}
          </div>
        )}
        {activeSection === "composicao" && (
          <div className="space-y-6">
            {product.ingredients && (
              <div>
                <h3 className="text-sm font-medium text-ink mb-2">Ingredientes</h3>
                <ul className="text-sm text-ink/70 space-y-1">
                  {product.ingredients.map((ing) => (
                    <li key={ing}>• {ing}</li>
                  ))}
                </ul>
              </div>
            )}
            <div>
              <h3 className="text-sm font-medium text-ink mb-2">Características</h3>
              <dl className="text-sm divide-y divide-line border-t border-b border-line">
                {product.characteristics.map((c) => (
                  <div key={c.label} className="flex justify-between py-2.5">
                    <dt className="text-ink/50">{c.label}</dt>
                    <dd className="text-ink text-right">{c.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        )}
        {activeSection === "avaliacoes" && <ReviewsSection product={product} />}
      </div>

      {related.length > 0 && (
        <section>
          <h2 className="font-display text-xl text-ink mb-5">Você também pode gostar</h2>
          <ProductGrid products={related} />
        </section>
      )}
    </div>
  );
}
