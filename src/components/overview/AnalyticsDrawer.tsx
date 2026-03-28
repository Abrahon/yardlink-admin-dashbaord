/* eslint-disable @typescript-eslint/no-explicit-any */
import { TrendingUpIcon, TrendingDownIcon } from "lucide-react";
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
import { CustomTooltip } from "../charts/CustomToolTip";

export interface AnalyticsDrawerProps {
  isOpen: boolean;
  selectedMetric: {
    metric: string;
    card: any;
    chart: any;
    breakdown: Record<string, any>;
  } | null;
  onClose: () => void;
}

export const AnalyticsDrawer = ({
  isOpen,
  selectedMetric,
  onClose,
}: AnalyticsDrawerProps) => {
  if (!selectedMetric) return null;

  // Safe chart data
  const chartData = selectedMetric.chart?.data ?? [];

  // Detect dynamic chart key (total_users, churn_rate, etc.)
  const chartKey =
    chartData.length > 0
      ? Object.keys(chartData[0]).find(
          (key) => !["label", "year", "month"].includes(key)
        )
      : undefined;

  return (
    <Drawer isOpen={isOpen} onClose={onClose} title={selectedMetric.card.title}>
      <div className="space-y-6">
        {/* Metric Value */}
        <div className="bg-blue-50 rounded-xl p-4">
          <p className="text-sm text-slate-500 mb-1">
            {selectedMetric.card.title}
          </p>

          <p className="text-3xl font-bold text-slate-800">
            {selectedMetric.card.value}
          </p>

          <div className="flex items-center gap-1 mt-2">
            {selectedMetric.card.change_direction === "increase" ? (
              <TrendingUpIcon className="w-4 h-4 text-green-500" />
            ) : (
              <TrendingDownIcon className="w-4 h-4 text-red-500" />
            )}

            <span
              className={`text-sm font-medium ${
                selectedMetric.card.change_direction === "increase"
                  ? "text-green-600"
                  : "text-red-600"
              }`}
            >
              {selectedMetric.card.change_percentage}%
            </span>

            <span className="text-sm text-slate-500">
              {selectedMetric.card.comparison_label}
            </span>
          </div>
        </div>

        {/* Chart */}
        <div>
          <h4 className="text-sm font-semibold text-slate-700 mb-3">
            {selectedMetric.chart?.title ?? "6-Month Trend"}
          </h4>

          <ResponsiveContainer width="100%" height={160}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />

              <XAxis
                dataKey="label"
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

              {chartKey && (
                <Line
                  type="monotone"
                  dataKey={chartKey}
                  stroke="#2563EB"
                  strokeWidth={2}
                  dot={false}
                />
              )}
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Breakdown */}
        <div>
          <h4 className="text-sm font-semibold text-slate-700 mb-3">
            Breakdown
          </h4>

          <div className="space-y-2">
            {Object.values(selectedMetric.breakdown).map((row: any) => (
              <div
                key={row.label}
                className="flex items-center justify-between py-2 border-b border-slate-50"
              >
                <span className="text-sm text-slate-600">{row.label}</span>

                <div className="flex items-center gap-3">
                  <span className="text-sm font-semibold text-slate-800">
                    {row.value}
                    {row.unit ?? ""}
                  </span>

                  <span
                    className={`text-xs font-medium ${
                      row.change_direction === "increase"
                        ? "text-green-600"
                        : row.change_direction === "decrease"
                        ? "text-red-600"
                        : "text-slate-500"
                    }`}
                  >
                    {row.change_percentage}%
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