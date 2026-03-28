/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { PageHeader } from "@/components/layout/PageHeader";
import { KpiCard } from "@/components/cards/KpiCard";
import { UserGrowthChart } from "@/components/charts/UserGrowthChart";
import { RevenueChart } from "@/components/charts/RevenueChart";
import { ExportDropdown } from "@/components/ui/Dropdown";
import { KpiCardData } from "../types";
import { RecentActivity } from "./RecentActivity";
import { AnalyticsDrawer } from "./AnalyticsDrawer";
import { useAnalytics } from "@/api/overview/query";

export const Overview = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedMetric, setSelectedMetric] = useState<{
    metric: string;
    card: any;
    chart: any;
    breakdown: Record<string, any>;
  } | null>(null);

  // Analytics queries
  const totalUsers = useAnalytics("total_users", {});
  const totalLandscapers = useAnalytics("total_landscapers", {});
  const totalClients = useAnalytics("total_clients", {});
  const jobsCompleted = useAnalytics("jobs_completed", {});
  const activeSubs = useAnalytics("active_subscriptions", {});
  const churnRate = useAnalytics("churn_rate", {});
  const subscriptionRevenue = useAnalytics("subscription_revenue", {});
  const stripeRevenue = useAnalytics("stripe_fee_revenue", {});
  console.log(totalUsers, "totalUsers");
  console.log(totalLandscapers, "totalLandscappers");
  console.log(totalClients, "totalClients");
  console.log(jobsCompleted, "jobsCompleted");
  console.log(activeSubs, "activeSubs");
  console.log(churnRate, "churnRate");
  console.log(subscriptionRevenue, "subscriptionRevenue");
  console.log(stripeRevenue, "stripeRevenue");

  const openDrawer = (metric: string) => {
    const api = analyticsMap[metric];

    if (!api) return;

    setSelectedMetric({
      metric,
      card: api.card,
      chart: api.chart,
      breakdown: api.breakdown,
    });

    setDrawerOpen(true);
  };

  const handleExport = (format: string) => {
    console.log(`Exporting as ${format}`);
  };

  const cards: KpiCardData[] = [
    { title: "Total Users", metric: "total_users", value: 0 },
    { title: "Total Landscapers", metric: "total_landscapers", value: 0 },
    { title: "Total Clients", metric: "total_clients", value: 0 },
    { title: "Jobs Completed", metric: "jobs_completed", value: 0 },
    {
      title: "Active Pro Subscriptions",
      metric: "active_subscriptions",
      value: 0,
    },
    { title: "Churn Rate", metric: "churn_rate", value: 0 },
    { title: "Subscription Revenue", metric: "subscription_revenue", value: 0 },
    { title: "Stripe Fee Revenue", metric: "stripe_fee_revenue", value: 0 },
  ];

  // console.log(cards, "cards");

  // Map API data to card label
  const analyticsMap: Record<string, any> = {
    total_users: totalUsers.data,
    total_landscapers: totalLandscapers.data,
    total_clients: totalClients.data,
    jobs_completed: jobsCompleted.data,
    active_subscriptions: activeSubs.data,
    churn_rate: churnRate.data,
    subscription_revenue: subscriptionRevenue.data,
    stripe_fee_revenue: stripeRevenue.data,
  };
  // console.log(analyticsMap);

  const renderCard = (card: KpiCardData) => {
    const api = analyticsMap[card.metric];

    if (!api?.card) return null; // prevent crash

    return (
      <KpiCard
        key={card.metric}
        label={api.card.title || card.title}
        value={api.card.value.toString()}
        trend={
          api.card.change_percentage !== undefined
            ? `${api.card.change_percentage}%`
            : undefined
        }
        trendUp={api.card.change_direction === "increase"}
        detail={api.card.comparison_label}
        onClick={() => openDrawer(card.metric)}
      />
    );
  };

  return (
    <div className="p-6 space-y-6">
      <PageHeader
        title="Platform Overview"
        description="Real-time metrics and analytics"
        actions={<ExportDropdown onExport={handleExport} />}
      />

      {/* KPI Row 1 */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map(renderCard)}
      </div>

      {/* KPI Row 2 */}
      {/* <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        {cards.slice(4).map(renderCard)}
      </div> */}

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <UserGrowthChart />
        <RevenueChart />
      </div>

      {/* Recent Activity */}
      <RecentActivity />

      {/* Analytics Drawer */}
      <AnalyticsDrawer
        isOpen={drawerOpen}
        selectedMetric={selectedMetric}
        onClose={() => setDrawerOpen(false)}
      />
    </div>
  );
};
