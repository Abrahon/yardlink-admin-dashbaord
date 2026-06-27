/* eslint-disable @typescript-eslint/no-explicit-any */
import { AnalyticsMetric, RecentActivityItem } from "@/types/overviewresponse";
import { useQuery } from "@tanstack/react-query";
import {
  getAnalytics,
  getRecentActivities,
  getUserGrowth,
  getRevenueBreakdown,
  UserGrowthPoint,
  RevenueBreakdownPoint,
} from "./api";
import { ANALYTICS_ENDPOINTS } from "@/generic/overview";

export const useAnalytics = <T extends AnalyticsMetric>(metric: T, options?: any) => {
  return useQuery({
    queryKey: ["analytics", metric],
    queryFn: () => getAnalytics<T>(ANALYTICS_ENDPOINTS[metric]),
    ...options,
  });
};

export const useUserGrowth = () => {
  return useQuery<UserGrowthPoint[]>({
    queryKey: ["overview", "user-growth"],
    queryFn: getUserGrowth,
    staleTime: 5 * 60 * 1000,
  });
};

export const useRevenueBreakdown = () => {
  return useQuery<RevenueBreakdownPoint[]>({
    queryKey: ["overview", "revenue-breakdown"],
    queryFn: getRevenueBreakdown,
    staleTime: 5 * 60 * 1000,
  });
};

export const useRecentActivities = () => {
  return useQuery<RecentActivityItem[]>({
    queryKey: ["overview", "recent-activities"],
    queryFn: getRecentActivities,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};
