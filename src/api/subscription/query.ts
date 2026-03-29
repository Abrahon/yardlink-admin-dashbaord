import { useQuery } from "@tanstack/react-query";
import { getDashboardStats, getSubscriptions } from "./api";

export const useGetSubscriptions = (page: number, limit: number) => {
  return useQuery({
    queryKey: ["subscriptions", page, limit],
    queryFn: () => getSubscriptions({ page, limit }),
  });
};

export const useGetDashboardStats = () => {
  return useQuery({
    queryKey: ["dashboard-stats"],
    queryFn: getDashboardStats,
  });
};
