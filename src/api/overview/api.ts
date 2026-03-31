
import { axios } from "@/lib/axios";
import { AnalyticsResponse } from "@/types/overviewresponse";
export const getAnalytics = async <T extends string>(
  endpoint: string
): Promise<AnalyticsResponse<T>> => {
  const { data } = await axios.get(endpoint);
  return data;
};