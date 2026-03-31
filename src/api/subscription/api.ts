import { PlanInfo, SubscriptionResponse } from "@/types/subscription";
import { axios } from "@/lib/axios";

export const getSubscriptions = async (params?: { page?: number, limit?: number }) => {
  const { data } = await axios.get<SubscriptionResponse>(
    "/admin/subscription-users/",
    { params },
  );
  return data;
};

export const getDashboardStats = async () => {
  const { data } = await axios.get<PlanInfo>("/admin/dashboard-stats/");
  return data;
};
