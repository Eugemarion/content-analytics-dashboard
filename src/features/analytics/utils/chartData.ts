import type { PostPerformance } from "../types/PostPerformance";
import { totalViews, totalClicks } from "./analytics";

export function viewsByDate(posts: PostPerformance[]) {
  const map = new Map<string, number>();

  for (const p of posts) {
    map.set(p.date, (map.get(p.date) ?? 0) + p.views);
  }

  return Array.from(map.entries())
    .map(([date, views]) => ({ date, views }))
    .sort((a, b) => a.date.localeCompare(b.date));
}

export function topPostsByClicks(posts: PostPerformance[], limit = 5) {
  return [...posts]
    .sort((a, b) => b.clicks - a.clicks)
    .slice(0, limit)
    .map((p) => ({
      title: p.title,
      clicks: p.clicks,
    }));
}

export function distributionByChannel(posts: PostPerformance[]) {
  const map = new Map<string, number>();

  for (const p of posts) {
    map.set(p.channel, (map.get(p.channel) ?? 0) + p.views);
  }

  return Array.from(map.entries()).map(([channel, views]) => ({
    channel,
    views,
  }));
}