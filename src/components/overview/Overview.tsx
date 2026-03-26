/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { PageHeader } from "@/components/layout/PageHeader";
import { KpiCard } from "@/components/cards/KpiCard";
import { UserGrowthChart } from "@/components/charts/UserGrowthChart";
import { RevenueChart } from "@/components/charts/RevenueChart";
import { ExportDropdown } from "@/components/ui/Dropdown";
import { KpiCardData } from "../types";
import { kpiCards, kpiCards2 } from "../data/overview";
import { RecentActivity } from "./RecentActivity";
import { AnalyticsDrawer } from "./AnalyticsDrawer";
import { useAnalytics } from "@/api/overview/query";

export const Overview = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedMetric, setSelectedMetric] = useState<KpiCardData | null>(
    null,
  );

  // Analytics queries
  const totalUsers = useAnalytics("total_users", {});
  const totalLandscapers = useAnalytics("total_landscapers", {});
  const totalClients = useAnalytics("total_clients", {});
  const jobsCompleted = useAnalytics("jobs_completed", {});
  const activeSubs = useAnalytics("active_subscriptions", {});
  const churnRate = useAnalytics("churn_rate", {});
  const subscriptionRevenue = useAnalytics("subscription_revenue", {});
  const stripeRevenue = useAnalytics("stripe_fee_revenue", {});

  const openDrawer = (card: KpiCardData) => {
    setSelectedMetric(card);
    setDrawerOpen(true);
  };

  const handleExport = (format: string) => {
    console.log(`Exporting as ${format}`);
  };

  // Map API data to card label
  const analyticsMap: Record<string, any> = {
    "Total Users": totalUsers.data,
    "Total Landscapers": totalLandscapers.data,
    "Total Clients": totalClients.data,
    "Jobs Completed": jobsCompleted.data,
    "Active Subscriptions": activeSubs.data,
    "Churn Rate": churnRate.data,
    "Subscription Revenue": subscriptionRevenue.data,
    "Stripe Fee Revenue": stripeRevenue.data,
  };

  const renderCard = (card: KpiCardData) => {
    const api = analyticsMap[card.label];

    return (
      <KpiCard
        key={card.label}
        label={card.label}
        value={api?.card?.value ?? card.value}
        trend={
          api?.card?.change_percentage !== undefined
            ? `${api.card.change_percentage}%`
            : card.trend
        }
        trendUp={
          api?.card?.change_direction
            ? api.card.change_direction === "increase"
            : card.trendUp
        }
        detail={api?.card?.comparison_label ?? card.detail}
        onClick={() => openDrawer(card)}
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
        {kpiCards.map(renderCard)}
      </div>

      {/* KPI Row 2 */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        {kpiCards2.map(renderCard)}
      </div>

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
