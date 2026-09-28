import { Link } from "react-router-dom";
import type { ChatMessage } from "@/types/chat";

export function ComparisonTable({ comparison }: { comparison: NonNullable<ChatMessage["comparison"]> }) {
  return (
    <div className="rounded-xl border border-line bg-white overflow-x-auto max-w-full">
      <table className="text-xs min-w-[420px] w-full">
        <thead>
          <tr>
            <th className="text-left p-2.5 text-ink/40 font-normal w-24"> </th>
            {comparison.products.map((p) => (
              <th key={p.id} className="p-2.5 text-left align-top">
                <Link to={`/produto/${p.id}`} className="flex flex-col gap-1 hover:underline">
                  <img src={p.images[0]} alt={p.name} className="w-10 h-10 rounded-md object-cover" />
                  <span className="font-medium text-ink leading-snug line-clamp-2">{p.name}</span>
                </Link>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {comparison.points.map((point) => (
            <tr key={point.label} className="border-t border-line">
              <td className="p-2.5 text-ink/50">{point.label}</td>
              {point.values.map((v, i) => (
                <td key={i} className="p-2.5 text-ink">
                  {v}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
