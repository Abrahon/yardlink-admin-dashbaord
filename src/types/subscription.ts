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

export interface Plan {
  id: number;
  name: string;
  description: string;
  features: string[];
  price: string;
  discount: string;
  final_price: number;
  duration: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface PlansResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Plan[];
}

export interface UpdatePlanRequest {
  name: string;
  description: string;
  price: string;
  discount: string;
}

export enum ExtendDays {
  OneWeek = 7,
  TwoWeeks = 14,
  OneMonth = 30,
  ThreeMonths = 90,
}

export interface ExtendSubscriptionRequest {
  days: ExtendDays;
}

export interface ExtendSubscriptionResponse {
  message: string;
  subscription_id: number;
  is_trial: boolean;
  trial_remaining_days: number | null;
  remaining_days: number | null;
  new_end_date: string;
}

export interface PauseSubscriptionRequest {
  is_active: boolean;
}

export interface PauseSubscriptionResponse {
  status: string;
  message: string;
  subscription_status: string;
  subscription: {
    id: number;
    user: number;
    plan_name: string;
    plan_price: string;
    start_date: string;
    end_date: string;
    status: string;
    auto_renew: boolean;
  };
}