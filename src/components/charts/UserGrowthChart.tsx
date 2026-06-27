'use client';

import { useMemo, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { ChartRangeTabs, RangeOption } from './ChartRangeTabs';
import { CustomTooltip } from './CustomToolTip';
import { userGrowthData } from '../data/overview';
import { useUserGrowth } from '@/api/overview/query';

export const UserGrowthChart = () => {
  const [chartRange, setChartRange] = useState<RangeOption>('monthly');
  const { data, isLoading } = useUserGrowth();

  const chartData = useMemo(
    () =>
      (data ?? userGrowthData).map((point: any) => ({
        month: `${point.month} ${point.year ?? ''}`.trim(),
        users: point.total_users ?? point.users ?? 0,
        landscapers: point.total_landscapers ?? point.landscapers ?? 0,
        clients: point.total_clients ?? point.clients ?? 0,
      })),
    [data]
  );

  const lastPoint = chartData[chartData.length - 1];
  const previousPoint = chartData[chartData.length - 2];
  const userDelta =
    lastPoint && previousPoint ? lastPoint.users - previousPoint.users : null;
  const userDeltaLabel =
    userDelta === null
      ? null
      : `${userDelta >= 0 ? '+' : ''}${userDelta.toLocaleString()} users vs previous month`;

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-slate-100">
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-4">
        <div>
          <h3 className="font-semibold text-slate-800">User Growth</h3>
          {userDeltaLabel && (
            <p className="text-sm text-slate-500 mt-1">{userDeltaLabel}</p>
          )}
        </div>
        <ChartRangeTabs range={chartRange} setRange={setChartRange} />
      </div>
      <ResponsiveContainer width="100%" height={220}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
          <XAxis
            dataKey="month"
            tick={{ fontSize: 12, fill: '#94A3B8' }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tick={{ fontSize: 12, fill: '#94A3B8' }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend wrapperStyle={{ fontSize: '12px' }} />
          <Line
            type="monotone"
            dataKey="users"
            stroke="#2563EB"
            strokeWidth={2}
            dot={false}
            name="Total Users"
          />
          <Line
            type="monotone"
            dataKey="landscapers"
            stroke="#10B981"
            strokeWidth={2}
            dot={false}
            name="Landscapers"
          />
          <Line
            type="monotone"
            dataKey="clients"
            stroke="#F97316"
            strokeWidth={2}
            dot={false}
            name="Clients"
          />
        </LineChart>
      </ResponsiveContainer>
      {isLoading && (
        <p className="text-xs text-slate-500 mt-2">Loading user growth...</p>
      )}
    </div>
  );
};