import { axios } from "@/lib/axios";
import { AnalyticsResponse, RecentActivityItem } from "@/types/overviewresponse";

export const getAnalytics = async <T extends string>(
  endpoint: string
): Promise<AnalyticsResponse<T>> => {
  const { data } = await axios.get(endpoint);
  return data;
};

export interface UserGrowthPoint {
  month: string;
  year: number;
  total_users: number;
  total_clients: number;
  total_landscapers: number;
}

export const getUserGrowth = async (): Promise<UserGrowthPoint[]> => {
  const { data } = await axios.get<UserGrowthPoint[]>(
    "/admin/user-growth/"
  );
  return data;
};

export interface RevenueBreakdownPoint {
  month: string;
  year: number;
  total_revenue: number;
  total_subscriptions: number;
}

export const getRevenueBreakdown = async (): Promise<RevenueBreakdownPoint[]> => {
  const { data } = await axios.get<RevenueBreakdownPoint[]>(
    "/admin/revenue-breakdown/"
  );
  return data;
};

export const getRecentActivities = async (): Promise<RecentActivityItem[]> => {
  const { data } = await axios.get<RecentActivityItem[]>(
    "/admin/recent-activities/"
  );
  return data;
};