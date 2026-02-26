import type { PostPerformance, Channel } from "../types/PostPerformance";


const channels: Channel[] = ["linkedin", "instagram", "tiktok", "web", "newsletter"];
const tagsPool = ["ai", "cloud", "fintech", "data", "web3", "events", "security", "product"];

function isoDate(d: Date) {
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}

function randInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function pick<T>(arr: T[]) {
  return arr[randInt(0, arr.length - 1)];
}

function pickMany<T>(arr: T[], min = 1, max = 3) {
  const count = randInt(min, max);
  const copy = [...arr];
  const out: T[] = [];
  for (let i = 0; i < count; i++) {
    const idx = randInt(0, copy.length - 1);
    out.push(copy[idx]);
    copy.splice(idx, 1);
  }
  return out;
}

function channelBaseViews(channel: Channel) {
  // números razonables y distintos por canal (para que haya “historia”)
  switch (channel) {
    case "tiktok":
      return randInt(900, 6500);
    case "instagram":
      return randInt(600, 4200);
    case "linkedin":
      return randInt(300, 2800);
    case "web":
      return randInt(150, 1800);
    case "newsletter":
      return randInt(120, 1200);
  }
}

function clickRate(channel: Channel) {
  // CTR aproximado por canal (solo para mock)
  switch (channel) {
    case "linkedin":
      return 0.04;
    case "web":
      return 0.03;
    case "newsletter":
      return 0.05;
    case "instagram":
      return 0.02;
    case "tiktok":
      return 0.015;
  }
}

export function makeMockPosts(days = 60, avgPostsPerDay = 2): PostPerformance[] {
  const out: PostPerformance[] = [];
  const today = new Date();

  for (let i = 0; i < days; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);

    const postsToday = randInt(Math.max(1, avgPostsPerDay - 1), avgPostsPerDay + 1);

    for (let j = 0; j < postsToday; j++) {
      const channel = pick(channels);
      const views = channelBaseViews(channel);

      // clicks = views * rate + ruido
      const baseClicks = Math.round(views * clickRate(channel));
      const clicks = Math.max(0, baseClicks + randInt(-Math.round(baseClicks * 0.4), Math.round(baseClicks * 0.6)));

      out.push({
        id: `${isoDate(date)}-${j}-${channel}`,
        title: `Post ${isoDate(date)} #${j + 1}`,
        date: isoDate(date),
        channel,
        tags: pickMany(tagsPool, 1, 3),
        views,
        clicks,
      });
    }
  }

  // orden ascendente por fecha (opcional)
  return out.sort((a, b) => a.date.localeCompare(b.date));
}