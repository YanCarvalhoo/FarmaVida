import { Search, X } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { searchProducts } from "@/data/products";
import { categoryLabels } from "@/types/product";

const commonIntents: Record<string, string[]> = {
  protein: ["Whey protein", "Proteína vegetal", "Produtos ricos em proteína"],
  proteina: ["Whey protein", "Proteína vegetal", "Produtos ricos em proteína"],
  dormir: ["Melatonina", "Chá relaxante", "Óleo essencial"],
  sono: ["Melatonina", "Chá relaxante"],
  pele: ["Sérum facial", "Protetor solar", "Hidratante"],
  bebe: ["Fralda", "Shampoo infantil", "Pomada para assaduras"],
  bebê: ["Fralda", "Shampoo infantil", "Pomada para assaduras"],
};

export function SearchBar({ variant = "default" }: { variant?: "default" | "hero" }) {
  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsFocused(false);
      }
    }
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  const results = useMemo(() => (query.trim().length > 1 ? searchProducts(query).slice(0, 5) : []), [query]);
  const intentSuggestions = useMemo(() => {
    const key = Object.keys(commonIntents).find((k) => query.toLowerCase().includes(k));
    return key ? commonIntents[key] : [];
  }, [query]);

  function submitSearch(q: string) {
    if (!q.trim()) return;
    navigate(`/busca?q=${encodeURIComponent(q)}`);
    setIsFocused(false);
    setQuery("");
  }

  const showDropdown = isFocused && query.trim().length > 1;
  const height = variant === "hero" ? "h-14" : "h-11";

  return (
    <div ref={containerRef} className="relative w-full">
      <form
        role="search"
        onSubmit={(e) => {
          e.preventDefault();
          submitSearch(query);
        }}
        className={`relative flex items-center ${height} w-full rounded-full border border-line bg-white focus-within:border-forest-500 focus-within:ring-2 focus-within:ring-forest-100 transition-colors`}
      >
        <Search size={18} className="absolute left-4 text-ink/40" />
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          placeholder="Buscar remédios, vitaminas, cuidados..."
          className="w-full h-full bg-transparent pl-11 pr-10 rounded-full text-sm text-ink placeholder:text-ink/40 focus:outline-none"
          aria-label="Buscar produtos"
        />
        {query && (
          <button
            type="button"
            onClick={() => setQuery("")}
            className="absolute right-3 text-ink/40 hover:text-ink/70 p-1"
            aria-label="Limpar busca"
          >
            <X size={16} />
          </button>
        )}
      </form>

      {showDropdown && (
        <div className="absolute left-0 right-0 top-full mt-2 bg-white rounded-2xl border border-line shadow-lift py-2 z-40 animate-fade-in max-h-96 overflow-y-auto">
          {intentSuggestions.length > 0 && (
            <div className="px-4 py-1.5">
              <p className="text-xs text-ink/40 mb-1.5">Sugestões</p>
              <div className="flex flex-wrap gap-1.5">
                {intentSuggestions.map((s) => (
                  <button
                    key={s}
                    onClick={() => submitSearch(s)}
                    className="text-xs px-2.5 py-1 rounded-full bg-paper hover:bg-forest-50 text-ink/70"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}
          {results.length > 0 ? (
            <ul>
              {results.map((p) => (
                <li key={p.id}>
                  <button
                    onClick={() => {
                      navigate(`/produto/${p.id}`);
                      setIsFocused(false);
                      setQuery("");
                    }}
                    className="w-full flex items-center gap-3 px-4 py-2 hover:bg-paper text-left"
                  >
                    <img src={p.images[0]} alt="" className="w-9 h-9 rounded-md object-cover" />
                    <div className="min-w-0">
                      <p className="text-sm text-ink truncate">{p.name}</p>
                      <p className="text-xs text-ink/40">{categoryLabels[p.category]}</p>
                    </div>
                  </button>
                </li>
              ))}
              <li className="px-4 pt-1">
                <button
                  onClick={() => submitSearch(query)}
                  className="text-xs text-forest-700 font-medium py-1.5 hover:underline"
                >
                  Ver todos os resultados para "{query}"
                </button>
              </li>
            </ul>
          ) : (
            <p className="px-4 py-3 text-sm text-ink/50">Nenhum produto encontrado ainda. Pressione enter para buscar.</p>
          )}
        </div>
      )}
    </div>
  );
}
