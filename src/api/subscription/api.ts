import {
  ExtendSubscriptionRequest,
  ExtendSubscriptionResponse,
  PauseSubscriptionRequest,
  PauseSubscriptionResponse,
  Plan,
  PlanInfo,
  PlansResponse,
  SubscriptionResponse,
  UpdatePlanRequest,
} from "@/types/subscription";
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

export const getPlans = async () => {
  const { data } = await axios.get<PlansResponse>("/plans/");
  return data;
};

export const updatePlan = async (id: number, payload: UpdatePlanRequest) => {
  const { data } = await axios.put<Plan>(`/plans/${id}/`, payload);
  return data;
};

export const extendSubscription = async (
  id: number,
  payload: ExtendSubscriptionRequest,
) => {
  const { data } = await axios.post<ExtendSubscriptionResponse>(
    `/admin/subscriptions/${id}/extend/`,
    payload,
  );
  return data;
};

export const pauseSubscription = async (
  id: number,
  payload: PauseSubscriptionRequest,
) => {
  const { data } = await axios.patch<PauseSubscriptionResponse>(
    `/admin/subscription/${id}/pause/`,
    payload,
  );
  return data;
};
