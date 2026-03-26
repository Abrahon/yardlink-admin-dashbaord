import { AnalyticsMetric } from "@/types/OverView";

export interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  subscription: string;
  status: string;
  revenue: string;
  rating: number;
  avatar: string;
}

export interface Subscription {
  id: number;
  user: string;
  avatar: string;
  plan: string;
  status: string;
  start: string;
  end: string;
  amount: string;
}

export interface Payment {
  id: string;
  user: string;
  avatar: string;
  type: string;
  amount: string;
  fee: string;
  date: string;
  status: string;
  source: string;
}

export interface Message {
  id: number;
  user: string;
  preview: string;
  time: string;
  unread: number;
  category: string;
}

export interface KpiCardData {
  label: string;
  value: string;
  trend?: string;
  trendUp?: boolean;
  detail?: string;
  metric?: AnalyticsMetric;

}