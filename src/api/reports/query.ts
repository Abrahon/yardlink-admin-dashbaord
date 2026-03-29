import { useQuery } from "@tanstack/react-query";
import { DashboardParams, getDashboardReport } from "./api";

export const useGetReport = (params: DashboardParams,options?:{enabled?: boolean}) => {
  return useQuery({
    queryKey: ["dashboard-report", params],
    queryFn: () => getDashboardReport(params),
    enabled: options?.enabled,
  });
};