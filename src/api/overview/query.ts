/* eslint-disable @typescript-eslint/no-explicit-any */
import { AnalyticsMetric, RecentActivityItem } from "@/types/overviewresponse";
import { useQuery } from "@tanstack/react-query";
import { getAnalytics, getRecentActivities } from "./api";
import { ANALYTICS_ENDPOINTS } from "@/generic/overview";

export const useAnalytics = <T extends AnalyticsMetric>(metric: T, options?: any) => {
  return useQuery({
    queryKey: ["analytics", metric],
    queryFn: () => getAnalytics<T>(ANALYTICS_ENDPOINTS[metric]),
    ...options,
  });
};

export const useRecentActivities = () => {
  return useQuery<RecentActivityItem[]>({
    queryKey: ["overview", "recent-activities"],
    queryFn: getRecentActivities,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};
