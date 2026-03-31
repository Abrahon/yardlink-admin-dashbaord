/* eslint-disable @typescript-eslint/no-explicit-any */
import { AnalyticsMetric } from "@/types/overviewresponse";
import { useQuery } from "@tanstack/react-query";
import { getAnalytics } from "./api";
import { ANALYTICS_ENDPOINTS } from "@/generic/overview";

export const useAnalytics = <T extends AnalyticsMetric>(metric: T,options?:any) => {
  return useQuery({
    queryKey: ["analytics", metric],
    queryFn: () => getAnalytics<T>(ANALYTICS_ENDPOINTS[metric]),
    ...options
  });
};
