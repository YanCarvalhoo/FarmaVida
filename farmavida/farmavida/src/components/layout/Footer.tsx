import { Leaf } from "lucide-react";
import { Link } from "react-router-dom";
import { categoryLabels, type ProductCategory } from "@/types/product";

export function Footer() {
  const cats = Object.keys(categoryLabels) as ProductCategory[];
  return (
    <footer className="bg-forest-900 text-paper/80 mt-16 pb-20 lg:pb-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 grid grid-cols-2 sm:grid-cols-4 gap-8">
        <div className="col-span-2 sm:col-span-1">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-7 h-7 rounded-lg bg-paper/10 flex items-center justify-center">
              <Leaf size={14} />
            </span>
            <span className="font-display text-base text-paper">Farmavida</span>
          </div>
          <p className="text-sm text-paper/60 leading-relaxed max-w-xs">
            Farmácia online com atendimento humano e um assistente de IA para te ajudar a encontrar o que precisa.
          </p>
        </div>
        <div>
          <h4 className="text-sm font-medium text-paper mb-3">Categorias</h4>
          <ul className="space-y-2">
            {cats.slice(0, 5).map((c) => (
              <li key={c}>
                <Link to={`/categoria/${c}`} className="text-sm text-paper/60 hover:text-paper">
                  {categoryLabels[c]}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-medium text-paper mb-3">Ajuda</h4>
          <ul className="space-y-2">
            <li><Link to="/pedidos" className="text-sm text-paper/60 hover:text-paper">Meus pedidos</Link></li>
            <li><Link to="/conta" className="text-sm text-paper/60 hover:text-paper">Minha conta</Link></li>
            <li><span className="text-sm text-paper/60">Trocas e devoluções</span></li>
            <li><span className="text-sm text-paper/60">Fale conosco</span></li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-medium text-paper mb-3">Confiança</h4>
          <ul className="space-y-2 text-sm text-paper/60">
            <li>Farmacêutico responsável</li>
            <li>Compra 100% segura</li>
            <li>Entrega em todo o Brasil</li>
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 border-t border-paper/10 text-xs text-paper/40">
        Farmavida — plataforma fictícia criada para fins de demonstração. © 2026
      </div>
    </footer>
  );
}
