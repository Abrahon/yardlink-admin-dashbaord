import { AnalyticsChart } from "@/generic/overview";


export type ChangeDirection = "increase" | "decrease" | "no_change";

export interface AnalyticsCard {
  title: string;
  value: number;
  unit?: string;
  currency?: string;
  change_percentage: number;
  change_direction: ChangeDirection;
  comparison_label: string;
}

export interface AnalyticsBreakdownItem {
  label: string;
  value: number;
  unit?: string;
  currency?: string;
  change_percentage: number;
  change_direction: ChangeDirection;
  comparison_label: string;
}

export interface AnalyticsBreakdown {
  this_week: AnalyticsBreakdownItem;
  this_month: AnalyticsBreakdownItem;
  last_month: AnalyticsBreakdownItem;
  last_quarter: AnalyticsBreakdownItem;
}

export interface AnalyticsResponse<T extends string> {
  status: "success";
  metric: T;
  card: AnalyticsCard;
  chart: AnalyticsChart<T>;
  breakdown: AnalyticsBreakdown;
}

export interface RecentActivityItem {
  user_name: string;
  action: string;
  status: string;
  date: string;
}

export type AnalyticsMetric =
  | "total_users"
  | "total_landscapers"
  | "total_clients"
  | "jobs_completed"
  | "active_subscriptions"
  | "churn_rate"
  | "subscription_revenue"
  | "stripe_fee_revenue"
  | "monthly_revenue";