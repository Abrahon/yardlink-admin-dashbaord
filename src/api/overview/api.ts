import { axios } from "@/lib/axios";
import { AnalyticsResponse, RecentActivityItem } from "@/types/overviewresponse";

export const getAnalytics = async <T extends string>(
  endpoint: string
): Promise<AnalyticsResponse<T>> => {
  const { data } = await axios.get(endpoint);
  return data;
};

export const getRecentActivities = async (): Promise<RecentActivityItem[]> => {
  const { data } = await axios.get<RecentActivityItem[]>(
    "/admin/recent-activities/"
  );
  return data;
};