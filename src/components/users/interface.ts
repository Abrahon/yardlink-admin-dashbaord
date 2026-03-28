// types/users.ts
export interface User {
  id: number;
  name: string;
  email: string;
  phone: string | null;
  address: string | null;
  role: "admin" | "client" | "landscaper";
  is_active: boolean;
  is_flagged: boolean;
  admin_notes: string | null;
  date_joined: string;
  last_login: string | null;
  total_revenue: number;
  total_jobs: number;
  completed_jobs: number;
  total_clients: number;
  average_rating: number;
  review_count: number;
}

export interface UsersSummary {
  total_users: number;
  total_clients: number;
  total_landscapers: number;
  active_users: number;
  paused_users: number;
  daily_active_users: number;
  weekly_new_signups: number;
  active_subscriptions: number;
  cancelled_subscriptions: number;
  expired_subscriptions: number;
  churn_rate: number;
  platform_fee_collected: number;
  average_rating: number;
}

export interface UsersResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: {
    status: string;
    summary: UsersSummary;
    data: User[];
  };
}

export interface GetUsersParams {
  role?: "admin" | "client" | "landscaper";
  page?: number;
  search?: string;
}