/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useMemo, useState } from "react";
import { PageHeader } from "@/components/layout/PageHeader";
import { KpiCard } from "@/components/cards/KpiCard";
import { UserGrowthChart } from "@/components/charts/UserGrowthChart";
import { RevenueChart } from "@/components/charts/RevenueChart";
import { ExportDropdown } from "@/components/ui/Dropdown";
import { KpiCardData } from "../types";
import { RecentActivity } from "./RecentActivity";
import { AnalyticsDrawer } from "./AnalyticsDrawer";
import { useGetUsers } from "@/api/users/query";

export const Overview = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedMetric, setSelectedMetric] = useState<{
    metric: string;
    card: any;
    chart: any;
    breakdown: Record<string, any>;
  } | null>(null);

  const { data: usersData } = useGetUsers({ page: 1 });
  const summary = useMemo(() => usersData?.results?.summary, [usersData]);

  const overviewSummary = useMemo(
    () => ({
      total_users: summary?.total_users ?? 0,
      total_landscapers: summary?.total_landscapers ?? 0,
      total_clients: summary?.total_clients ?? 0,
      active_subscriptions: summary?.active_subscriptions ?? 0,
      weekly_new_signups: summary?.weekly_new_signups ?? 0,
      basic_subscriptions: summary?.basic_subscriptions ?? 0,
      pro_subscriptions: summary?.pro_subscriptions ?? 0,
      platform_fee_collected: summary?.platform_fee_collected ?? 0,
    }),
    [summary]
  );

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
    { title: "Active Subscriptions", metric: "active_subscriptions", value: 0 },
    { title: "Basic Subscriptions", metric: "basic_subscriptions", value: 0 },
    { title: "Pro Subscriptions", metric: "pro_subscriptions", value: 0 },
    { title: "Weekly Signup", metric: "weekly_new_signups", value: 0 },
    { title: "Platform Fee", metric: "platform_fee_collected", value: 0 },
  ];

  const analyticsMap: Record<string, any> = {
    total_users: {
      card: {
        title: "Total Users",
        value: overviewSummary.total_users,
      },
    },

    total_landscapers: {
      card: {
        title: "Total Landscapers",
        value: overviewSummary.total_landscapers,
      },
    },

    total_clients: {
      card: {
        title: "Total Clients",
        value: overviewSummary.total_clients,
      },
    },

    active_subscriptions: {
      card: {
        title: "Active Subscriptions",
        value: overviewSummary.active_subscriptions,
      },
    },

    basic_subscriptions: {
      card: {
        title: "Basic Subscriptions",
        value: overviewSummary.basic_subscriptions,
      },
    },

    pro_subscriptions: {
      card: {
        title: "Pro Subscriptions",
        value: overviewSummary.pro_subscriptions,
      },
    },

    weekly_new_signups: {
      card: {
        title: "Weekly Signup",
        value: overviewSummary.weekly_new_signups,
      },
    },

    platform_fee_collected: {
      card: {
        title: "Platform Fee",
        value: `$${overviewSummary.platform_fee_collected.toFixed(2)}`,
      },
    },
  };

  const renderCard = (card: KpiCardData) => {
    const api = analyticsMap[card.metric];

    if (!api?.card) return null;

    return (
      <KpiCard
        key={card.metric}
        label={api.card.title || card.title}
        value={api.card.value.toString()}
        trend={undefined}
        trendUp={undefined}
        detail={undefined}
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
