export interface Subscription {
  id: number;
  user: number;
  user_name: string;
  user_email: string;
  plan: number;
  plan_name: string;
  status: string;
  is_active: boolean;
  is_trial: boolean;
  trial_remaining_days: number | null;
  start_date: string;
  end_date: string;
  remaining_days: number;
  created_at: string;
}

export interface SubscriptionResponse {
  count: number;
  subscriptions: Subscription[];
}

export interface PlanInfo {
  total_plans: number;
  active_subscriptions: number;
  expired_subscriptions: number;
  monthly_revenue: number;
  subscribers_by_plan: Array<{
    plan__name: string;
    total: number;
  }>;
}