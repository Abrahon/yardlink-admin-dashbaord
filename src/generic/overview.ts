import { AnalyticsMetric } from "@/types/overviewresponse";

export interface AnalyticsChart<T extends string> {
  type: "line";
  title: string;
  data: Array<
    {
      label: string;
      year: number;
      month: number;
    } & Record<T, number>
  >;
}

export const ANALYTICS_ENDPOINTS: Record<AnalyticsMetric, string> = {
  total_users: "/admin/analytics/total-users/",
  total_landscapers: "/admin/analytics/total-landscapers/",
  total_clients: "/admin/analytics/total-clients/",
  jobs_completed: "/admin/analytics/jobs-completed/",
  active_subscriptions: "/admin/analytics/active-pro-subscriptions/",
  churn_rate: "/admin/analytics/churn-rate/",
  subscription_revenue: "/admin/analytics/subscription-revenue/",
  stripe_fee_revenue: "/admin/analytics/stripe-fee-revenue/",
  monthly_revenue: "/landscaper/pro/monthly-revenue/",
};
