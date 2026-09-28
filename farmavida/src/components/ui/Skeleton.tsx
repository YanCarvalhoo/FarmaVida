export function ProductCardSkeleton() {
  return (
    <div className="rounded-xl2 border border-line bg-white p-3 animate-pulse">
      <div className="aspect-square rounded-lg bg-line/70 mb-3" />
      <div className="h-3 w-1/2 bg-line/70 rounded mb-2" />
      <div className="h-4 w-3/4 bg-line/70 rounded mb-2" />
      <div className="h-4 w-1/3 bg-line/70 rounded" />
    </div>
  );
}

export function TextLineSkeleton({ width = "100%" }: { width?: string }) {
  return <div className="h-3 rounded bg-line/70 animate-pulse" style={{ width }} />;
}

import { PackageSearch } from "lucide-react";

export function EmptyState({
  title,
  description,
  action,
}: {
  title: string;
  description: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col items-center text-center py-16 px-4">
      <div className="w-14 h-14 rounded-full bg-forest-50 flex items-center justify-center mb-4">
        <PackageSearch size={24} className="text-forest-600" />
      </div>
      <h3 className="font-display text-lg text-ink mb-1">{title}</h3>
      <p className="text-sm text-ink/60 max-w-sm mb-5">{description}</p>
      {action}
    </div>
  );
}
