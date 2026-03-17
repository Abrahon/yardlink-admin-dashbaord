'use client';

import { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { ChartRangeTabs, RangeOption } from './ChartRangeTabs';
import { CustomTooltip } from './CustomToolTip';
import { revenueData } from '../data/overview';

export const RevenueChart = () => {
  const [chartRange, setChartRange] = useState<RangeOption>('monthly');

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-slate-100">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-slate-800">Revenue Breakdown</h3>
        <ChartRangeTabs range={chartRange} setRange={setChartRange} />
      </div>
      <ResponsiveContainer width="100%" height={220}>
        <BarChart data={revenueData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
          <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#94A3B8' }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fontSize: 12, fill: '#94A3B8' }} axisLine={false} tickLine={false} />
          <Tooltip content={<CustomTooltip />} />
          <Legend wrapperStyle={{ fontSize: '12px' }} />
          <Bar dataKey="subscription" fill="#2563EB" radius={[4, 4, 0, 0]} name="Subscription ($)" />
          <Bar dataKey="fees" fill="#10B981" radius={[4, 4, 0, 0]} name="Fees ($)" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};