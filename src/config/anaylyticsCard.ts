import { AnalyticsMetric } from "@/types/OverView";


export interface AnalyticsCardConfig {
  label: string;
  metric: AnalyticsMetric;
}

export const analyticsCards: AnalyticsCardConfig[] = [
  { label: "Total Users", metric: "total_users" },
  { label: "Total Landscapers", metric: "total_landscapers" },
  { label: "Total Clients", metric: "total_clients" },
  { label: "Jobs Completed", metric: "jobs_completed" },
  { label: "Active Subscriptions", metric: "active_subscriptions" },
  { label: "Churn Rate", metric: "churn_rate" },
  { label: "Subscription Revenue", metric: "subscription_revenue" },
  { label: "Stripe Fee Revenue", metric: "stripe_fee_revenue" },
];