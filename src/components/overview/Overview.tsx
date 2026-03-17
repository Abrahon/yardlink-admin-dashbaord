'use client';

import { useState } from 'react';
import { PageHeader } from '@/components/layout/PageHeader';
import { KpiCard } from '@/components/cards/KpiCard';
import { UserGrowthChart } from '@/components/charts/UserGrowthChart';
import { RevenueChart } from '@/components/charts/RevenueChart';
import { ExportDropdown } from '@/components/ui/Dropdown';
import { KpiCardData } from '../types';
import { kpiCards, kpiCards2 } from '../data/overview';
import { RecentActivity } from './RecentActivity';
import { AnalyticsDrawer } from './AnalyticsDrawer';


export const Overview = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedMetric, setSelectedMetric] = useState<KpiCardData | null>(null);

  const openDrawer = (card: KpiCardData) => {
    setSelectedMetric(card);
    setDrawerOpen(true);
  };

  const handleExport = (format: string) => {
    console.log(`Exporting as ${format}`);
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
        {kpiCards.map((card) => (
          <KpiCard
            key={card.label}
            label={card.label}
            value={card.value}
            trend={card.trend}
            trendUp={card.trendUp}
            detail={card.detail}
            onClick={() => openDrawer(card)}
          />
        ))}
      </div>

      {/* KPI Row 2 */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        {kpiCards2.map((card) => (
          <KpiCard
            key={card.label}
            label={card.label}
            value={card.value}
            trend={card.trend}
            trendUp={card.trendUp}
            detail={card.detail}
            onClick={() => openDrawer(card)}
          />
        ))}
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