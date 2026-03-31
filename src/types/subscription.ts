export interface Subscription {
  user_id: number;
  name: string;
  email: string;
  role: string;
  subscription_id: number;
  stripe_customer_id: string;
  stripe_subscription_id: string;
  is_active: boolean;
  is_trial: boolean;
  auto_renew: boolean;
  start_date: string;
  end_date: string;
  invoice_id: string;
  invoice_number: string;
  subscription_date: number;
  description: string;
  amount: number;
  payment_status: string;
  currency: string;
  invoice_pdf: string;
  hosted_invoice_url: string;
}

export interface SubscriptionResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Subscription[];
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