import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from "recharts";

import { viewsByDate, topPostsByClicks, distributionByChannel } from "../utils/chartData";
import type { PostPerformance } from "../types/PostPerformance";

const COLORS = ["#6366f1", "#22c55e", "#f97316", "#0ea5e9", "#e11d48"];

export function AnalyticsCharts({ posts }: { posts: PostPerformance[] }) {
  const lineData = viewsByDate(posts);
  const barData = topPostsByClicks(posts);
  const pieData = distributionByChannel(posts);

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      {/* Line */}
      <div className="rounded-2xl border bg-white p-6 shadow-sm">
        <h3 className="mb-4 text-sm font-medium text-neutral-600">Views over time</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={lineData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" hide />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="views" stroke="#6366f1" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Bar */}
      <div className="rounded-2xl border bg-white p-6 shadow-sm">
        <h3 className="mb-4 text-sm font-medium text-neutral-600">Top posts by clicks</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={barData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="title" hide />
              <YAxis />
              <Tooltip />
              <Bar dataKey="clicks" fill="#22c55e" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Pie */}
      <div className="rounded-2xl border bg-white p-6 shadow-sm lg:col-span-2">
        <h3 className="mb-4 text-sm font-medium text-neutral-600">Views distribution by channel</h3>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={pieData} dataKey="views" nameKey="channel" outerRadius={100}>
                {pieData.map((_, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}