import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getAdminNotifications, markNotificationAsRead } from "./api";

export const useAdminNotifications = () => {
  return useQuery({
    queryKey: ["admin", "notifications"],
    queryFn: getAdminNotifications,
    staleTime: 30_000,
  });
};

export const useMarkNotificationAsRead = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => markNotificationAsRead(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "notifications"] });
    },
  });
};
