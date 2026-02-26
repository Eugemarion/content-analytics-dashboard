import type { PostPerformance, Channel } from "../types/PostPerformance";

export function sum(arr: number[]) {
  return arr.reduce((a, b) => a + b, 0);
}

export function safeDiv(n: number, d: number) {
  return d === 0 ? 0 : n / d;
}

export function calcCtr(clicks: number, views: number) {
  return safeDiv(clicks, views);
}

export function totalViews(items: PostPerformance[]) {
  return sum(items.map((p) => p.views));
}

export function totalClicks(items: PostPerformance[]) {
  return sum(items.map((p) => p.clicks));
}

export function avgCtr(items: PostPerformance[]) {
  const v = totalViews(items);
  const c = totalClicks(items);
  return calcCtr(c, v);
}

export function groupByChannel(items: PostPerformance[]) {
  const map = new Map<Channel, PostPerformance[]>();
  for (const it of items) {
    const bucket = map.get(it.channel) ?? [];
    bucket.push(it);
    map.set(it.channel, bucket);
  }
  return map;
}

export function topChannelByClicks(items: PostPerformance[]) {
  const groups = groupByChannel(items);
  let best: { channel: Channel; clicks: number } | null = null;

  for (const [channel, arr] of groups.entries()) {
    const clicks = totalClicks(arr);
    if (!best || clicks > best.clicks) best = { channel, clicks };
  }
  return best?.channel ?? "linkedin";
}