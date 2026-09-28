export interface FilterState {
  maxPrice: number | null;
  brand: string | null;
  inStockOnly: boolean;
}

export function Filters({
  brands,
  priceCeiling,
  state,
  onChange,
}: {
  brands: string[];
  priceCeiling: number;
  state: FilterState;
  onChange: (next: FilterState) => void;
}) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-sm font-medium text-ink mb-3">Preço máximo</h3>
        <input
          type="range"
          min={0}
          max={priceCeiling}
          step={5}
          value={state.maxPrice ?? priceCeiling}
          onChange={(e) => onChange({ ...state, maxPrice: Number(e.target.value) })}
          className="w-full accent-forest-700"
        />
        <p className="text-xs text-ink/50 mt-1">
          Até {(state.maxPrice ?? priceCeiling).toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
        </p>
      </div>

      <div>
        <h3 className="text-sm font-medium text-ink mb-3">Marca</h3>
        <div className="flex flex-wrap gap-1.5">
          <button
            onClick={() => onChange({ ...state, brand: null })}
            className={`text-xs px-3 py-1.5 rounded-full border ${
              state.brand === null ? "bg-forest-700 text-paper border-forest-700" : "border-line text-ink/60"
            }`}
          >
            Todas
          </button>
          {brands.map((b) => (
            <button
              key={b}
              onClick={() => onChange({ ...state, brand: b })}
              className={`text-xs px-3 py-1.5 rounded-full border ${
                state.brand === b ? "bg-forest-700 text-paper border-forest-700" : "border-line text-ink/60"
              }`}
            >
              {b}
            </button>
          ))}
        </div>
      </div>

      <label className="flex items-center gap-2 text-sm text-ink/70">
        <input
          type="checkbox"
          checked={state.inStockOnly}
          onChange={(e) => onChange({ ...state, inStockOnly: e.target.checked })}
          className="rounded accent-forest-700"
        />
        Apenas produtos em estoque
      </label>
    </div>
  );
}
