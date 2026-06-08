import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  extendSubscription,
  getDashboardStats,
  getPlans,
  getSubscriptions,
  pauseSubscription,
  updatePlan,
} from "./api";
import {
  ExtendSubscriptionRequest,
  PauseSubscriptionRequest,
  UpdatePlanRequest,
} from "@/types/subscription";

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

export const useGetPlans = () => {
  return useQuery({
    queryKey: ["plans"],
    queryFn: getPlans,
  });
};

export const useUpdatePlan = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, payload }: { id: number; payload: UpdatePlanRequest }) =>
      updatePlan(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["plans"] });
    },
  });
};

export const useExtendSubscription = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: number;
      payload: ExtendSubscriptionRequest;
    }) => extendSubscription(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["subscriptions"] });
    },
  });
};

export const usePauseSubscription = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: number;
      payload: PauseSubscriptionRequest;
    }) => pauseSubscription(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["subscriptions"] });
    },
  });
};
