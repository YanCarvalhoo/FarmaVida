import { Sparkles } from "lucide-react";
import { useAIChat } from "@/context/AIChatContext";
import { AIChatPanel } from "./AIChatPanel";

export function AIChatWidget() {
  const { isOpen, open } = useAIChat();

  return (
    <>
      {!isOpen && (
        <button
          onClick={() => open()}
          className="hidden lg:flex fixed bottom-6 right-6 z-40 items-center gap-2 pl-4 pr-5 py-3.5 rounded-full bg-forest-700 text-paper shadow-lift hover:bg-forest-800 transition-transform hover:-translate-y-0.5"
        >
          <Sparkles size={18} className="text-amber-300" />
          <span className="text-sm font-medium">Assistente Farmavida</span>
        </button>
      )}
      <AIChatPanel />
    </>
  );
}
