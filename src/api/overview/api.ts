import { AnalyticsResponse } from "@/types/OverView";
import { axios } from "@/lib/axios";
export const getAnalytics = async <T extends string>(
  endpoint: string
): Promise<AnalyticsResponse<T>> => {
  const { data } = await axios.get(endpoint);
  return data;
};