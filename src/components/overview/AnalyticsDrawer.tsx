/* eslint-disable @typescript-eslint/no-explicit-any */
import {  TrendingUpIcon, TrendingDownIcon } from "lucide-react";
import { Drawer } from "@/components/ui/Drawer";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { userGrowthData } from "../data/overview";
import { CustomTooltip } from "../charts/CustomToolTip";
// import { CustomTooltip } from '@/components/charts/CustomTooltip';
// import { userGrowthData } from '@/data/overview';

export interface AnalyticsDrawerProps {
  isOpen: boolean;
  selectedMetric: any | null;
  onClose: () => void;
}

export const AnalyticsDrawer = ({
  isOpen,
  selectedMetric,
  onClose,
}: AnalyticsDrawerProps) => {
  if (!selectedMetric) return null;

  return (
    <Drawer isOpen={isOpen} onClose={onClose} title={selectedMetric.label}>
      <div className="space-y-6">
        {/* Metric Value */}
        <div className="bg-blue-50 rounded-xl p-4">
          <p className="text-sm text-slate-500 mb-1">{selectedMetric.label}</p>
          <p className="text-3xl font-bold text-slate-800">
            {selectedMetric.value}
          </p>
          <div className="flex items-center gap-1 mt-2">
            {selectedMetric.trendUp ? (
              <TrendingUpIcon className="w-4 h-4 text-green-500" />
            ) : (
              <TrendingDownIcon className="w-4 h-4 text-red-500" />
            )}
            <span
              className={`text-sm font-medium ${selectedMetric.trendUp ? "text-green-600" : "text-red-600"}`}
            >
              {selectedMetric.trend}
            </span>
            <span className="text-sm text-slate-500">
              {selectedMetric.detail}
            </span>
          </div>
        </div>

        {/* Mini Chart */}
        <div>
          <h4 className="text-sm font-semibold text-slate-700 mb-3">
            6-Month Trend
          </h4>
          <ResponsiveContainer width="100%" height={160}>
            <LineChart data={userGrowthData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
              <XAxis
                dataKey="month"
                tick={{ fontSize: 11, fill: "#94A3B8" }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fontSize: 11, fill: "#94A3B8" }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip content={<CustomTooltip />} />
              <Line
                type="monotone"
                dataKey="users"
                stroke="#2563EB"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Date Range Breakdown */}
        <div>
          <h4 className="text-sm font-semibold text-slate-700 mb-3">
            Breakdown
          </h4>
          <div className="space-y-2">
            {[
              {
                period: "This Week",
                value: selectedMetric.value,
                change: selectedMetric.trend,
              },
              {
                period: "This Month",
                value: selectedMetric.value,
                change: selectedMetric.trend,
              },
              { period: "Last Month", value: "11,240", change: "+8.1%" },
              { period: "Last Quarter", value: "10,100", change: "+6.3%" },
            ].map((row) => (
              <div
                key={row.period}
                className="flex items-center justify-between py-2 border-b border-slate-50"
              >
                <span className="text-sm text-slate-600">{row.period}</span>
                <div className="flex items-center gap-3">
                  <span className="text-sm font-semibold text-slate-800">
                    {row.value}
                  </span>
                  <span className="text-xs text-green-600 font-medium">
                    {row.change}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Drawer>
  );
};
