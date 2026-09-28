import { Leaf } from "lucide-react";
import type { ChatMessage, QuickReply } from "@/types/chat";
import { ChatProductCard } from "./ChatProductCard";
import { ComparisonTable } from "./ComparisonTable";

export function ChatMessageBubble({
  message,
  onQuickReply,
}: {
  message: ChatMessage;
  onQuickReply: (reply: QuickReply) => void;
}) {
  const isUser = message.role === "user";

  if (isUser) {
    return (
      <div className="flex justify-end animate-fade-in">
        <div className="max-w-[80%] rounded-2xl rounded-br-sm bg-forest-700 text-paper px-3.5 py-2.5 text-sm">
          {message.text}
        </div>
      </div>
    );
  }

  return (
    <div className="flex gap-2 items-start animate-fade-in">
      <span className="w-7 h-7 rounded-full bg-forest-700 flex items-center justify-center shrink-0 mt-0.5">
        <Leaf size={13} className="text-paper" />
      </span>
      <div className="flex flex-col gap-2.5 min-w-0 flex-1">
        <div className="max-w-[92%] rounded-2xl rounded-bl-sm bg-white border border-line px-3.5 py-2.5 text-sm text-ink whitespace-pre-line">
          {message.text}
        </div>

        {message.comparison && (
          <div className="max-w-full">
            <ComparisonTable comparison={message.comparison} />
          </div>
        )}

        {message.products && message.products.length > 0 && (
          <div className="flex gap-2.5 overflow-x-auto pb-1 -mx-1 px-1">
            {message.products.map((p) => (
              <ChatProductCard key={p.id} product={p} />
            ))}
          </div>
        )}

        {message.quickReplies && message.quickReplies.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {message.quickReplies.map((qr) => (
              <button
                key={qr.id}
                onClick={() => onQuickReply(qr)}
                className="text-xs px-3 py-1.5 rounded-full border border-forest-700 text-forest-700 hover:bg-forest-50 transition-colors"
              >
                {qr.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
