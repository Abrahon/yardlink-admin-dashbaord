'use client';

import  { useState } from 'react';
import { BarChart2Icon, MapPinIcon } from 'lucide-react';
import { PageHeader } from '@/components/layout/PageHeader';
import { FilterBar } from '@/components/layout/FilterBar';
import { ConversionFunnel } from '@/components/charts/ConversionFunnel';
import { KpiCard } from '@/components/cards/KpiCard';
// import { CustomTooltip } from '@/components/charts/CustomTooltip';
import { ExportDropdown } from '@/components/ui/Dropdown';
// import { DateRangePicker } from '@/components/ui/DateRangePicker';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  
} from 'recharts';

import { CustomTooltip } from '../charts/CustomToolTip';
import { cityData, conversionMetrics, funnelSteps, growthData } from '../data/report';
import { DateRangePicker } from '../ui/DateRangePicker';

export const Reports = () => {
  const [mapView, setMapView] = useState<'bar' | 'map'>('bar');
  const [timeRange, setTimeRange] = useState<'weekly' | 'monthly' | 'custom'>('monthly');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const maxUsers = Math.max(...cityData.map((c) => c.users));

  const handleExport = (format: string) => {
    console.log(`Exporting reports as ${format}`);
  };

  return (
    <div className="p-6 space-y-6">
      <PageHeader
        title="Reports & Analytics"
        description="Detailed platform metrics and conversion data"
        actions={<ExportDropdown onExport={handleExport} />}
      />

      {/* Filter Bar */}
      <FilterBar
        dateRange
        filters={
          <>
            <div className="flex gap-1">
              {(['weekly', 'monthly', 'custom'] as const).map((r) => (
                <button
                  key={r}
                  onClick={() => setTimeRange(r)}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors capitalize ${
                    timeRange === r ? 'bg-blue-600 text-white' : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  {r === 'custom' ? 'Custom Date' : r}
                </button>
              ))}
            </div>
            {timeRange === 'custom' && (
              <DateRangePicker
                fromDate={fromDate}
                toDate={toDate}
                onFromDateChange={setFromDate}
                onToDateChange={setToDate}
              />
            )}
          </>
        }
      />

      {/* Conversion Metrics */}
      <div className="bg-white rounded-xl shadow-sm p-6 border border-slate-100">
        <h3 className="font-semibold text-slate-800 mb-6">Conversion Metrics</h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Funnel */}
          <div>
            <h4 className="text-sm font-medium text-slate-600 mb-4">Acquisition Funnel</h4>
            <ConversionFunnel steps={funnelSteps} />
          </div>

          {/* Quote Conversion */}
          <div>
            <h4 className="text-sm font-medium text-slate-600 mb-4">Quote Conversion</h4>
            <div className="grid grid-cols-2 gap-4">
              {conversionMetrics.map((metric, i) => (
                <KpiCard
                  key={i}
                  label={metric.label}
                  value={metric.value}
                  // bgColor={metric.bgColor}
                  // textColor={metric.textColor}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* User Concentration */}
      <div className="bg-white rounded-xl shadow-sm p-6 border border-slate-100">
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-semibold text-slate-800">User Concentration by Region</h3>
          <div className="flex gap-1 bg-slate-100 rounded-lg p-1">
            <button
              onClick={() => setMapView('bar')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                mapView === 'bar' ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              <BarChart2Icon className="w-3.5 h-3.5" />
              Bar Chart
            </button>
            <button
              onClick={() => setMapView('map')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                mapView === 'map' ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              <MapPinIcon className="w-3.5 h-3.5" />
              Map View
            </button>
          </div>
        </div>

        {mapView === 'bar' ? (
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={cityData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" horizontal={false} />
              <XAxis type="number" tick={{ fontSize: 12, fill: '#94A3B8' }} axisLine={false} tickLine={false} />
              <YAxis
                dataKey="city"
                type="category"
                tick={{ fontSize: 12, fill: '#64748B' }}
                axisLine={false}
                tickLine={false}
                width={100}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="users" fill="#2563EB" radius={[0, 4, 4, 0]} name="Users" />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <div className="space-y-3">
            {cityData.map((city, i) => (
              <div key={i} className="flex items-center gap-4">
                <div className="flex items-center gap-2 w-32 shrink-0">
                  <MapPinIcon className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                  <span className="text-sm text-slate-700 truncate">{city.city}</span>
                </div>
                <div className="flex-1 h-7 bg-slate-100 rounded-lg overflow-hidden">
                  <div
                    className="h-full rounded-lg flex items-center px-3 transition-all duration-500"
                    style={{
                      width: `${(city.users / maxUsers) * 100}%`,
                      background: `linear-gradient(90deg, #2563EB, #3B82F6)`
                    }}
                  >
                    <span className="text-white text-xs font-medium">{city.users.toLocaleString()}</span>
                  </div>
                </div>
                <span className="text-sm font-semibold text-slate-700 w-16 text-right">
                  {city.users.toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6 border border-slate-100">
          <h3 className="font-semibold text-slate-800 mb-4">User Growth Trend</h3>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={growthData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
              <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#94A3B8' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12, fill: '#94A3B8' }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Line
                type="monotone"
                dataKey="users"
                stroke="#2563EB"
                strokeWidth={2}
                dot={{ fill: '#2563EB', r: 3 }}
                name="Users"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6 border border-slate-100">
          <h3 className="font-semibold text-slate-800 mb-4">Monthly Revenue</h3>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={growthData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
              <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#94A3B8' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12, fill: '#94A3B8' }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="revenue" fill="#2563EB" radius={[4, 4, 0, 0]} name="Revenue ($)" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};