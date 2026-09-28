import { useEffect, useRef, useState } from "react";
import { Leaf, Send, X } from "lucide-react";
import { useAIChat } from "@/context/AIChatContext";
import { ChatMessageBubble } from "./ChatMessageBubble";
import { TypingIndicator } from "./TypingIndicator";
import type { QuickReply } from "@/types/chat";

export function AIChatPanel() {
  const { isOpen, close, messages, isTyping, send } = useAIChat();
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, isTyping, isOpen]);

  if (!isOpen) return null;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!input.trim()) return;
    void send(input);
    setInput("");
  }

  function handleQuickReply(reply: QuickReply) {
    void send(reply.label);
  }

  return (
    <div className="fixed inset-0 sm:inset-auto sm:bottom-6 sm:right-6 z-[100] flex sm:block">
      <div className="hidden sm:block absolute inset-0 -z-10" />
      <div className="relative flex flex-col w-full h-full sm:w-[380px] sm:h-[600px] sm:max-h-[80vh] bg-paper sm:rounded-2xl sm:shadow-lift sm:border sm:border-line overflow-hidden animate-fade-in">
        <div
          className="flex items-center justify-between px-4 py-3.5 bg-forest-700 text-paper shrink-0"
          style={{ paddingTop: "calc(0.875rem + env(safe-area-inset-top, 0px))" }}
        >
          <div className="flex items-center gap-2.5">
            <span className="w-8 h-8 rounded-full bg-paper/15 flex items-center justify-center">
              <Leaf size={16} />
            </span>
            <div>
              <p className="text-sm font-medium leading-tight">Assistente Farmavida</p>
              <p className="text-xs text-paper/70 leading-tight">Sugestões, não substitui orientação médica</p>
            </div>
          </div>
          <button onClick={close} aria-label="Fechar assistente" className="p-1.5 rounded-full hover:bg-paper/10">
            <X size={18} />
          </button>
        </div>

        <div ref={scrollRef} className="flex-1 overflow-y-auto px-3.5 py-4 flex flex-col gap-4">
          {messages.map((m) => (
            <ChatMessageBubble key={m.id} message={m} onQuickReply={handleQuickReply} />
          ))}
          {isTyping && (
            <div className="flex gap-2 items-start">
              <span className="w-7 h-7 rounded-full bg-forest-700 flex items-center justify-center shrink-0">
                <Leaf size={13} className="text-paper" />
              </span>
              <TypingIndicator />
            </div>
          )}
        </div>

        <form
          onSubmit={handleSubmit}
          className="shrink-0 flex items-center gap-2 p-3 border-t border-line bg-white"
          style={{ paddingBottom: "calc(0.75rem + env(safe-area-inset-bottom, 0px))" }}
        >
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Escreva sua dúvida..."
            className="flex-1 h-11 rounded-full bg-paper border border-line px-4 text-sm focus:outline-none focus:border-forest-500 focus:ring-2 focus:ring-forest-100"
            aria-label="Mensagem para o assistente"
          />
          <button
            type="submit"
            disabled={!input.trim()}
            aria-label="Enviar mensagem"
            className="w-11 h-11 shrink-0 rounded-full bg-forest-700 text-paper flex items-center justify-center disabled:bg-line disabled:text-ink/40 hover:bg-forest-800"
          >
            <Send size={16} />
          </button>
        </form>
      </div>
    </div>
  );
}
