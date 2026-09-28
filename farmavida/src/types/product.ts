export type ProductCategory =
  | "vitaminas"
  | "suplementos"
  | "cuidados-pessoais"
  | "higiene"
  | "bem-estar"
  | "medicamentos"
  | "bebe"
  | "beleza";

export interface ProductReview {
  id: string;
  author: string;
  rating: number;
  comment: string;
  date: string;
  verified: boolean;
}

export interface Product {
  id: string;
  name: string;
  brand: string;
  category: ProductCategory;
  shortDescription: string;
  description: string;
  price: number;
  promotionalPrice?: number;
  images: string[];
  ingredients?: string[];
  characteristics: { label: string; value: string }[];
  usage?: string;
  stock: number;
  rating: number;
  reviewCount: number;
  reviews: ProductReview[];
  tags: string[];
  requiresPrescription?: boolean;
  relatedIds: string[];
}

export const categoryLabels: Record<ProductCategory, string> = {
  vitaminas: "Vitaminas",
  suplementos: "Suplementos",
  "cuidados-pessoais": "Cuidados pessoais",
  higiene: "Higiene",
  "bem-estar": "Bem-estar",
  medicamentos: "Medicamentos",
  bebe: "Bebê",
  beleza: "Beleza",
};

export const categoryIcons: Record<ProductCategory, string> = {
  vitaminas: "Sun",
  suplementos: "Dumbbell",
  "cuidados-pessoais": "Droplet",
  higiene: "ShowerHead",
  "bem-estar": "Leaf",
  medicamentos: "Pill",
  bebe: "Baby",
  beleza: "Sparkles",
};
