import { useMemo, useState } from "react";
import type { PostPerformance } from "../types/PostPerformance";
import { formatCompact, formatPercent } from "../utils/format";

type SortKey = "title" | "channel" | "views" | "clicks" | "ctr";
type SortDir = "asc" | "desc";

function calcCtr(clicks: number, views: number) {
  return views === 0 ? 0 : clicks / views;
}

function compare(a: string | number, b: string | number) {
  if (typeof a === "number" && typeof b === "number") return a - b;
  return String(a).localeCompare(String(b));
}

function Th({
  label,
  active,
  dir,
  onClick,
  alignRight,
}: {
  label: string;
  active: boolean;
  dir: SortDir;
  onClick: () => void;
  alignRight?: boolean;
}) {
  return (
    <th
      onClick={onClick}
      className={[
        "select-none py-2 pr-4 font-medium text-neutral-600",
        "cursor-pointer hover:text-neutral-900",
        alignRight ? "text-right" : "text-left",
      ].join(" ")}
    >
      <span className="inline-flex items-center gap-2">
        {label}
        {active ? (
          <span className="text-xs text-neutral-400">{dir === "asc" ? "▲" : "▼"}</span>
        ) : (
          <span className="text-xs text-neutral-200">▲</span>
        )}
      </span>
    </th>
  );
}

export function AnalyticsTable({ posts }: { posts: PostPerformance[] }) {
  const [sortKey, setSortKey] = useState<SortKey>("views");
  const [sortDir, setSortDir] = useState<SortDir>("desc");

  const sorted = useMemo(() => {
    const rows = [...posts];

    rows.sort((a, b) => {
      const aVal =
        sortKey === "ctr" ? calcCtr(a.clicks, a.views) : (a as any)[sortKey];
      const bVal =
        sortKey === "ctr" ? calcCtr(b.clicks, b.views) : (b as any)[sortKey];

      const base = compare(aVal, bVal);
      return sortDir === "asc" ? base : -base;
    });

    return rows;
  }, [posts, sortKey, sortDir]);

  function toggleSort(nextKey: SortKey) {
    if (nextKey === sortKey) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(nextKey);
      setSortDir("desc");
    }
  }

  return (
    <div className="rounded-2xl border bg-white p-6 shadow-sm">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
        <h3 className="text-sm font-medium text-neutral-600">Content performance</h3>
        <p className="text-sm text-neutral-500">
          Showing <span className="font-medium text-neutral-900">{sorted.length}</span> items
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="border-b">
              <Th
                label="Title"
                active={sortKey === "title"}
                dir={sortDir}
                onClick={() => toggleSort("title")}
              />
              <Th
                label="Channel"
                active={sortKey === "channel"}
                dir={sortDir}
                onClick={() => toggleSort("channel")}
              />
              <Th
                label="Views"
                active={sortKey === "views"}
                dir={sortDir}
                onClick={() => toggleSort("views")}
                alignRight
              />
              <Th
                label="Clicks"
                active={sortKey === "clicks"}
                dir={sortDir}
                onClick={() => toggleSort("clicks")}
                alignRight
              />
              <Th
                label="CTR"
                active={sortKey === "ctr"}
                dir={sortDir}
                onClick={() => toggleSort("ctr")}
                alignRight
              />
            </tr>
          </thead>

          <tbody>
            {sorted.map((p) => (
              <tr key={p.id} className="border-b hover:bg-neutral-50">
                <td className="py-2 pr-4 font-medium">{p.title}</td>
                <td className="py-2 pr-4 capitalize">{p.channel}</td>
                <td className="py-2 pr-4 text-right">{formatCompact(p.views)}</td>
                <td className="py-2 pr-4 text-right">{formatCompact(p.clicks)}</td>
                <td className="py-2 pr-4 text-right">
                  {formatPercent(calcCtr(p.clicks, p.views))}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}