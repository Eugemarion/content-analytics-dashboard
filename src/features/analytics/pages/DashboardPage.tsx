import { makeMockPosts } from "../utils/mock";
import { avgCtr, topChannelByClicks, totalClicks, totalViews } from "../utils/analytics";
import { formatCompact, formatPercent } from "../utils/format";
import { useAnalyticsFilters } from "../hooks/useAnalyticsFilters";
import { AnalyticsCharts } from "../components/AnalyticsCharts";
import { AnalyticsTable } from "../components/AnalyticsTable";

function KpiCard({
  label,
  value,
  sublabel,
}: {
  label: string;
  value: string;
  sublabel?: string;
}) {
  return (
    <div className="rounded-2xl border bg-white p-4 shadow-sm">
      <p className="text-sm text-neutral-500">{label}</p>
      <p className="mt-2 text-2xl font-semibold tracking-tight">{value}</p>
      {sublabel ? <p className="mt-1 text-sm text-neutral-500">{sublabel}</p> : null}
    </div>
  );
}

export default function DashboardPage() {
  // Data base
  const posts = makeMockPosts(60, 2);

  // Filters
  const {
    filtered,
    dateRange,
    setDateRange,
    channel,
    setChannel,
    search,
    setSearch,
    reset,
  } = useAnalyticsFilters(posts);

  // Export CSV (exporta lo filtrado)
  function exportCsv() {
    const headers = ["date", "title", "channel", "tags", "views", "clicks", "ctr"];

    const rows = filtered.map((p) => {
      const ctr = p.views === 0 ? 0 : p.clicks / p.views;
      return [
        p.date,
        p.title.replaceAll('"', '""'),
        p.channel,
        p.tags.join("|"),
        String(p.views),
        String(p.clicks),
        ctr.toFixed(4),
      ];
    });

    const csv =
      headers.join(",") +
      "\n" +
      rows.map((r) => r.map((v) => `"${v}"`).join(",")).join("\n");

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "content-analytics.csv";
    a.click();

    URL.revokeObjectURL(url);
  }

  // KPIs sobre filtered
  const views = totalViews(filtered);
  const clicks = totalClicks(filtered);
  const ctr = avgCtr(filtered);
  const topChannel = topChannelByClicks(filtered);

  const kpis = [
    { label: "Total views", value: formatCompact(views), sublabel: `Last ${dateRange} days` },
    { label: "Total clicks", value: formatCompact(clicks), sublabel: `Last ${dateRange} days` },
    { label: "Avg. CTR", value: formatPercent(ctr), sublabel: "Clicks / Views" },
    { label: "Top channel", value: topChannel[0].toUpperCase() + topChannel.slice(1), sublabel: "By clicks" },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <section className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight">Overview</h2>
          <p className="mt-1 text-sm text-neutral-500">
            Track performance by channel, tag, and time range.
          </p>
        </div>

        <button
          onClick={exportCsv}
          className="rounded-xl border bg-white px-4 py-2 text-sm shadow-sm hover:bg-neutral-50"
        >
          Export CSV
        </button>
      </section>

      {/* Filter bar */}
      <section className="rounded-2xl border bg-white p-4 shadow-sm">
        <div className="flex flex-wrap items-center gap-4">
          <select
            value={dateRange}
            onChange={(e) => setDateRange(Number(e.target.value) as 7 | 30 | 60 | 90)}
            className="rounded-xl border px-3 py-2 text-sm"
          >
            <option value={7}>Last 7 days</option>
            <option value={30}>Last 30 days</option>
            <option value={60}>Last 60 days</option>
            <option value={90}>Last 90 days</option>
          </select>

          <select
            value={channel}
            onChange={(e) => setChannel(e.target.value as any)}
            className="rounded-xl border px-3 py-2 text-sm"
          >
            <option value="all">All channels</option>
            <option value="linkedin">LinkedIn</option>
            <option value="instagram">Instagram</option>
            <option value="tiktok">TikTok</option>
            <option value="web">Web</option>
            <option value="newsletter">Newsletter</option>
          </select>

          <input
            type="text"
            placeholder="Search title..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl border px-3 py-2 text-sm sm:w-72"
          />

          <span className="text-sm text-neutral-500">
            Showing <span className="font-medium text-neutral-900">{filtered.length}</span> items
          </span>

          <button
            onClick={reset}
            className="rounded-xl border bg-white px-3 py-2 text-sm shadow-sm hover:bg-neutral-50"
          >
            Reset
          </button>
        </div>
      </section>

      {/* KPIs */}
      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {kpis.map((k) => (
          <KpiCard key={k.label} label={k.label} value={k.value} sublabel={k.sublabel} />
        ))}
      </section>

      {/* Content */}
      {filtered.length === 0 ? (
        <section className="rounded-2xl border bg-white p-10 text-center shadow-sm">
          <p className="text-lg font-semibold">No results</p>
          <p className="mt-2 text-sm text-neutral-500">
            Try adjusting filters or clearing the search.
          </p>
          <button
            onClick={reset}
            className="mt-6 rounded-xl border bg-white px-4 py-2 text-sm shadow-sm hover:bg-neutral-50"
          >
            Reset filters
          </button>
        </section>
      ) : (
        <>
          <AnalyticsCharts posts={filtered} />
          <AnalyticsTable posts={filtered} />
        </>
      )}
    </div>
  );
}