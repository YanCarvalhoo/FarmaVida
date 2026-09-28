import type { ProductCategory } from "@/types/product";

const categoryPalette: Record<ProductCategory, [string, string]> = {
  vitaminas: ["#F3CE8D", "#C27E1D"],
  suplementos: ["#CFE0D8", "#234A3F"],
  "cuidados-pessoais": ["#E9DFF0", "#6B4E8E"],
  higiene: ["#DCEEF5", "#2C6E8C"],
  "bem-estar": ["#E3EEE0", "#3F7D5C"],
  medicamentos: ["#F5DCDC", "#A94442"],
  bebe: ["#FDE9E9", "#C97A87"],
  beleza: ["#F6E1EC", "#A64D77"],
};

function initials(name: string): string {
  return name
    .split(" ")
    .filter((w) => w.length > 2)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase())
    .join("") || name.slice(0, 2).toUpperCase();
}

export function productPlaceholder(name: string, category: ProductCategory): string {
  const [bg, fg] = categoryPalette[category] ?? ["#EAF1EE", "#1F4B3F"];
  const mono = initials(name);
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="640" height="640" viewBox="0 0 640 640">
    <rect width="640" height="640" fill="${bg}"/>
    <circle cx="320" cy="290" r="150" fill="${fg}" fill-opacity="0.12"/>
    <rect x="230" y="200" width="180" height="240" rx="28" fill="${fg}" fill-opacity="0.9"/>
    <rect x="258" y="176" width="124" height="56" rx="16" fill="${fg}"/>
    <text x="320" y="470" font-family="Georgia, serif" font-size="44" fill="${fg}" text-anchor="middle" font-weight="600">${mono}</text>
  </svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}
