import { axios } from "@/lib/axios";

export interface AdminNotification {
  id: number;
  title: string;
  message: string;
  notification_type?: string;
  is_read: boolean;
  created_at: string;
  [key: string]: any;
}

export interface AdminNotificationsResponse {
  count?: number;
  results?: AdminNotification[];
  [key: string]: any;
}

export const getAdminNotifications = async (): Promise<AdminNotificationsResponse> => {
  const { data } = await axios.get<AdminNotificationsResponse>(
    "/admin/notifications/"
  );

  const results = Array.isArray(data?.results)
    ? data.results
    : Array.isArray(data)
      ? data
      : [];

  return {
    ...data,
    count: data?.count ?? results.length,
    results,
  };
};

export const markNotificationAsRead = async (id: number) => {
  const { data } = await axios.post(`/admin/notifications/${id}/read/`);
  return data;
};
