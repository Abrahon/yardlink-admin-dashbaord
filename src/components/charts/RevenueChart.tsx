'use client';

import { useMemo, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { ChartRangeTabs, RangeOption } from './ChartRangeTabs';
import { CustomTooltip } from './CustomToolTip';
import { revenueData } from '../data/overview';
import { useRevenueBreakdown } from '@/api/overview/query';

export const RevenueChart = () => {
  const [chartRange, setChartRange] = useState<RangeOption>('monthly');
  const { data, isLoading } = useRevenueBreakdown();

  const chartData = useMemo(
    () =>
      (data ?? revenueData).map((point: any) => ({
        month: `${point.month} ${point.year ?? ''}`.trim(),
        subscription: point.total_subscriptions ?? point.subscription ?? 0,
        revenue: point.total_revenue ?? point.revenue ?? 0,
      })),
    [data]
  );

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-slate-100">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-slate-800">Revenue Breakdown</h3>
        <ChartRangeTabs range={chartRange} setRange={setChartRange} />
      </div>
      <ResponsiveContainer width="100%" height={220}>
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
          <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#94A3B8' }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fontSize: 12, fill: '#94A3B8' }} axisLine={false} tickLine={false} />
          <Tooltip content={<CustomTooltip />} />
          <Legend wrapperStyle={{ fontSize: '12px' }} />
          <Bar dataKey="revenue" fill="#2563EB" radius={[4, 4, 0, 0]} name="Revenue ($)" />
          <Bar dataKey="subscription" fill="#10B981" radius={[4, 4, 0, 0]} name="Subscriptions" />
        </BarChart>
      </ResponsiveContainer>
      {isLoading && <p className="text-xs text-slate-500 mt-2">Loading revenue breakdown...</p>}
    </div>
  );
};