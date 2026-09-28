import { createContext, useCallback, useContext, useState, type ReactNode } from "react";
import type { ChatContext, ChatMessage } from "@/types/chat";
import { aiService, createGreetingMessage, createInitialContext } from "@/services/aiService";
import { useCart } from "./CartContext";

interface AIChatContextValue {
  isOpen: boolean;
  open: (openingText?: string) => void;
  close: () => void;
  messages: ChatMessage[];
  isTyping: boolean;
  send: (text: string) => Promise<void>;
}

const AIChatContext = createContext<AIChatContextValue | null>(null);

export function AIChatProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([createGreetingMessage()]);
  const [context, setContext] = useState<ChatContext>(createInitialContext());
  const [isTyping, setIsTyping] = useState(false);
  const { items } = useCart();

  const send = useCallback(
    async (text: string) => {
      if (!text.trim()) return;
      const userMessage: ChatMessage = {
        id: `msg-${Date.now()}-u`,
        role: "user",
        text,
        createdAt: Date.now(),
      };
      setMessages((prev) => [...prev, userMessage]);
      setIsTyping(true);
      try {
        const { message, context: nextContext } = await aiService.sendMessage(text, context, items);
        setMessages((prev) => [...prev, message]);
        setContext(nextContext);
      } finally {
        setIsTyping(false);
      }
    },
    [context, items]
  );

  const open = useCallback(
    (openingText?: string) => {
      setIsOpen(true);
      if (openingText) {
        void send(openingText);
      }
    },
    [send]
  );

  const close = useCallback(() => setIsOpen(false), []);

  return (
    <AIChatContext.Provider value={{ isOpen, open, close, messages, isTyping, send }}>
      {children}
    </AIChatContext.Provider>
  );
}

export function useAIChat(): AIChatContextValue {
  const ctx = useContext(AIChatContext);
  if (!ctx) throw new Error("useAIChat must be used within AIChatProvider");
  return ctx;
}
