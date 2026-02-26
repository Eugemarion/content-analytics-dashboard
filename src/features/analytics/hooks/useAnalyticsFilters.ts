import { useMemo, useState } from "react";
import type { PostPerformance, Channel } from "../types/PostPerformance";

type DateRange = 7 | 30 | 60 | 90;

export function useAnalyticsFilters(posts: PostPerformance[]) {
  const [dateRange, setDateRange] = useState<DateRange>(60);
  const [channel, setChannel] = useState<Channel | "all">("all");
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    const now = new Date();

    return posts.filter((p) => {
      const postDate = new Date(p.date);
      const diffDays =
        (now.getTime() - postDate.getTime()) / (1000 * 60 * 60 * 24);

      if (diffDays > dateRange) return false;
      if (channel !== "all" && p.channel !== channel) return false;
      if (
        search &&
        !p.title.toLowerCase().includes(search.toLowerCase())
      )
        return false;

      return true;
    });
  }, [posts, dateRange, channel, search]);
    
   function reset() {
    setDateRange(60);
    setChannel("all");
    setSearch("");
  }
   
  return {
    filtered,
    dateRange,
    setDateRange,
    channel,
    setChannel,
    search,
    setSearch,
    reset,
  };
}