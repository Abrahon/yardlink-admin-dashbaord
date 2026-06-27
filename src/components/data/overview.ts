import { KpiCardData } from "../types";

export const userGrowthData = [
  { month: "Aug", users: 9200, landscapers: 2400, clients: 1800 },
  { month: "Sep", users: 10100, landscapers: 2650, clients: 1950 },
  { month: "Oct", users: 10800, landscapers: 2850, clients: 2100 },
  { month: "Nov", users: 11200, landscapers: 2980, clients: 2200 },
  { month: "Dec", users: 11900, landscapers: 3100, clients: 2350 },
  { month: "Jan", users: 12847, landscapers: 3241, clients: 2500 },
];

export const revenueData = [
  { month: "Aug", subscription: 38200, fees: 764 },
  { month: "Sep", subscription: 40100, fees: 802 },
  { month: "Oct", subscription: 42800, fees: 856 },
  { month: "Nov", subscription: 44200, fees: 884 },
  { month: "Dec", subscription: 46100, fees: 922 },
  { month: "Jan", subscription: 48230, fees: 964 },
];

export const recentActivity = [
  {
    user: "John Smith",
    action: "Upgraded to Pro Plan",
    date: "Jan 14, 2025",
    status: "Active",
  },
  {
    user: "Maria Garcia",
    action: "New Registration",
    date: "Jan 14, 2025",
    status: "Pending",
  },
  {
    user: "Robert Johnson",
    action: "Payment Received",
    date: "Jan 13, 2025",
    status: "Active",
  },
  {
    user: "Emily Chen",
    action: "Account Suspended",
    date: "Jan 13, 2025",
    status: "Suspended",
  },
  {
    user: "David Wilson",
    action: "Subscription Renewed",
    date: "Jan 12, 2025",
    status: "Active",
  },
];

export const kpiCards= [
  {
    label: "Total Users",
    value: "12,847",
    trend: "+12.5%",
    trendUp: true,
    detail: "vs last month",
  },
  {
    label: "Total Landscapers",
    value: "3,241",
    trend: "+8.2%",
    trendUp: true,
    detail: "vs last month",
  },
  {
    label: "Total Clients",
    value: "9,606",
    trend: "+15.1%",
    trendUp: true,
    detail: "vs last month",
  },
  {
    label: "Active Subscriptions",
    value: "2,891",
    trend: "+5.3%",
    trendUp: true,
    detail: "vs last month",
  },
];

export const kpiCards2 = [
  {
    label: "Churn Rate",
    value: "3.2%",
    trend: "-0.8%",
    trendUp: true,
    icon: "TrendingDownIcon",
    iconBg: "bg-red-100",
    iconColor: "text-red-500",
    detail: "lower is better",
  },
  {
    label: "Active Basic Subs",
    value: "1,847",
    trend: "+3.1%",
    trendUp: true,
    icon: "CreditCardIcon",
    iconBg: "bg-sky-100",
    iconColor: "text-sky-600",
    detail: "vs last month",
  },
  {
    label: "Active Pro Subs",
    value: "1,044",
    trend: "+9.7%",
    trendUp: true,
    icon: "ActivityIcon",
    iconBg: "bg-violet-100",
    iconColor: "text-violet-600",
    detail: "vs last month",
  },
  {
    label: "Subscription Revenue",
    value: "$48,230",
    trend: "+11.2%",
    trendUp: true,
    icon: "DollarSignIcon",
    iconBg: "bg-emerald-100",
    iconColor: "text-emerald-600",
    detail: "vs last month",
  },
  {
    label: "Processing Fee Revenue",
    value: "$964",
    trend: "+11.2%",
    trendUp: true,
    icon: "DollarSignIcon",
    iconBg: "bg-teal-100",
    iconColor: "text-teal-600",
    detail: "vs last month",
  },
];
