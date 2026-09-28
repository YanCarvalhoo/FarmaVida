import type { Product } from "./product";

export type ChatRole = "user" | "assistant";

export interface QuickReply {
  id: string;
  label: string;
}

export interface ChatMessage {
  id: string;
  role: ChatRole;
  text: string;
  createdAt: number;
  products?: Product[];
  quickReplies?: QuickReply[];
  isSafetyNote?: boolean;
  comparison?: {
    products: Product[];
    points: { label: string; values: string[] }[];
  };
}

export interface ChatContext {
  goal?: string;
  dietaryNotes?: string;
  budget?: string;
  stage:
    | "greeting"
    | "clarifying"
    | "recommending"
    | "comparing"
    | "cart-help"
    | "free";
  topic?: string;
}
