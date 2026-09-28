import { CheckCircle2, Info } from "lucide-react";
import { useToast } from "@/context/ToastContext";

export function ToastContainer() {
  const { toasts } = useToast();
  if (toasts.length === 0) return null;
  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-[70] flex flex-col gap-2 items-center px-4 w-full sm:bottom-6">
      {toasts.map((t) => (
        <div
          key={t.id}
          role="status"
          className="animate-pop-in flex items-center gap-2 rounded-xl bg-ink text-paper px-4 py-3 shadow-lift text-sm max-w-sm"
        >
          {t.tone === "success" ? (
            <CheckCircle2 size={16} className="text-forest-100 shrink-0" />
          ) : (
            <Info size={16} className="text-amber-200 shrink-0" />
          )}
          <span>{t.message}</span>
        </div>
      ))}
    </div>
  );
}
