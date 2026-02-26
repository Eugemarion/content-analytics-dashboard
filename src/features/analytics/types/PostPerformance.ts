export type Channel = "linkedin" | "instagram" | "tiktok" | "web" | "newsletter";

export type PostPerformance = {
  id: string;
  title: string;
  date: string; // ISO yyyy-mm-dd
  channel: Channel;
  tags: string[];
  views: number;
  clicks: number;
};