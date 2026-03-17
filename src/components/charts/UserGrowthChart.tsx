'use client';

import { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { ChartRangeTabs, RangeOption } from './ChartRangeTabs';
import { CustomTooltip } from './CustomToolTip';
import { userGrowthData } from '../data/overview';

export const UserGrowthChart = () => {
  const [chartRange, setChartRange] = useState<RangeOption>('monthly');

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-slate-100">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-slate-800">User Growth</h3>
        <ChartRangeTabs range={chartRange} setRange={setChartRange} />
      </div>
      <ResponsiveContainer width="100%" height={220}>
        <LineChart data={userGrowthData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
          <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#94A3B8' }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fontSize: 12, fill: '#94A3B8' }} axisLine={false} tickLine={false} />
          <Tooltip content={<CustomTooltip />} />
          <Legend wrapperStyle={{ fontSize: '12px' }} />
          <Line type="monotone" dataKey="users" stroke="#2563EB" strokeWidth={2} dot={false} name="Total Users" />
          <Line type="monotone" dataKey="landscapers" stroke="#10B981" strokeWidth={2} dot={false} name="Landscapers" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};