export function TypingIndicator() {
  return (
    <div className="flex items-center gap-1 px-3.5 py-3 rounded-2xl rounded-bl-sm bg-white border border-line w-fit">
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="w-1.5 h-1.5 rounded-full bg-ink/30 animate-bounce1"
          style={{ animationDelay: `${i * 0.15}s` }}
        />
      ))}
    </div>
  );
}
