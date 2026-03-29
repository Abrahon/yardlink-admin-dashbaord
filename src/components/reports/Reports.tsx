"use client";

import { useState, useMemo } from "react";
import { BarChart2Icon, MapPinIcon } from "lucide-react";
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
} from "recharts";

// Layout
import { PageHeader } from "@/components/layout/PageHeader";
import { FilterBar } from "@/components/layout/FilterBar";

// Feature components
import { ConversionFunnel } from "@/components/charts/ConversionFunnel";
import { KpiCard } from "@/components/cards/KpiCard";

// UI primitives
import { ExportDropdown } from "@/components/ui/Dropdown";
import { DateRangePicker } from "@/components/ui/DateRangePicker";
import { DashboardParams } from "@/types/reports";
import { useGetReport } from "@/api/reports";
import {
  transformCityData,
  transformConversionMetrics,
  transformFunnelSteps,
  transformGrowthData,
} from "./reportTransformer";
import { CustomTooltip } from "../charts/CustomToolTip";
import { exportDashboardReport } from "@/api/reports/api";

// Data layer

// ─── Time-range type ─────────────────────────────────────────────────────────

type TimeRange = "weekly" | "monthly" | "custom" | "yearly";

// ─── Component ───────────────────────────────────────────────────────────────

export const Reports = () => {
  // ── UI state ──────────────────────────────────────────────────────────────
  const [mapView, setMapView] = useState<"bar" | "map">("bar");
  const [timeRange, setTimeRange] = useState<TimeRange>("monthly");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  // ── Build query params from UI state ──────────────────────────────────────
  //
  // Memoised so the object reference stays stable between renders and TanStack
  // Query doesn't see a "new" params object on every keystroke.
  const queryParams = useMemo<DashboardParams>(() => {
    if (timeRange === "custom" && fromDate && toDate) {
      return { range: "custom", start_date: fromDate, end_date: toDate };
    }
    // 'weekly' | 'monthly' | 'yearly' map 1-to-1 to the API's range values
    return { range: timeRange as "weekly" | "monthly" | "yearly" };
  }, [timeRange, fromDate, toDate]);

  // ── Data fetching ─────────────────────────────────────────────────────────
  const { data, isLoading, isError } = useGetReport(queryParams, {
    enabled: timeRange !== "custom" || !!(fromDate && toDate),
  });
  // ── Transform API data → UI-ready shapes ──────────────────────────────────
  //
  // All transforms are memoised. They only recompute when `data` changes.
  // If data is undefined (loading / error) each returns a safe empty array.
  const funnelSteps = useMemo(
    () => (data ? transformFunnelSteps(data.acquisition_funnel) : []),
    [data],
  );

  const conversionMetrics = useMemo(
    () => (data ? transformConversionMetrics(data.conversion_metrics) : []),
    [data],
  );

  const cityData = useMemo(
    () => (data ? transformCityData(data.user_concentration_by_region) : []),
    [data],
  );

  const growthData = useMemo(
    () => (data ? transformGrowthData(data.user_growth, data.revenue) : []),
    [data],
  );

  const maxUsers = useMemo(
    () => (cityData.length ? Math.max(...cityData.map((c) => c.users)) : 1),
    [cityData],
  );

  // ── Handlers ─────────────────────────────────────────────────────────────
  const handleExport = async (format: "csv" | "xlsx") => {
    await exportDashboardReport({
      ...queryParams,
      export: format,
    });
  };
  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <div className="p-6 space-y-6">
      {/* ── Page Header ─────────────────────────────────────────────────── */}
      <PageHeader
        title="Reports & Analytics"
        description="Detailed platform metrics and conversion data"
        actions={<ExportDropdown onExport={handleExport} />}
      />

      {/* ── Filter Bar ──────────────────────────────────────────────────── */}
      <FilterBar
        filters={
          <>
            <div className="flex gap-1">
              {(["weekly", "monthly", "custom", "yearly"] as const).map((r) => (
                <button
                  key={r}
                  onClick={() => setTimeRange(r)}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors capitalize ${
                    timeRange === r
                      ? "bg-blue-600 text-white"
                      : "text-slate-600 hover:bg-slate-100"
                  }`}
                >
                  {r === "custom"
                    ? "Custom Date"
                    : r === "yearly"
                      ? "Yearly"
                      : r}
                </button>
              ))}
            </div>

            {timeRange === "custom" && (
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

      {/* ── Loading / Error states ──────────────────────────────────────── */}
      {isError && (
        <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl p-4 text-sm">
          Failed to load report data. Please try again later.
        </div>
      )}

      {/* ── Conversion Metrics ──────────────────────────────────────────── */}
      <div className="bg-white rounded-xl shadow-sm p-6 border border-slate-100">
        <h3 className="font-semibold text-slate-800 mb-6">
          Conversion Metrics
        </h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Acquisition Funnel */}
          <div>
            <h4 className="text-sm font-medium text-slate-600 mb-4">
              Acquisition Funnel
            </h4>
            {isLoading ? (
              <SkeletonFunnel />
            ) : (
              <ConversionFunnel steps={funnelSteps} />
            )}
          </div>

          {/* Quote Conversion KPI cards */}
          <div>
            <h4 className="text-sm font-medium text-slate-600 mb-4">
              Quote Conversion
            </h4>
            {isLoading ? (
              <SkeletonKpiGrid />
            ) : (
              <div className="grid grid-cols-2 gap-4">
                {conversionMetrics.map((metric) => (
                  <KpiCard
                    key={metric.label}
                    label={metric.label}
                    value={metric.value}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ── User Concentration by Region ────────────────────────────────── */}
      <div className="bg-white rounded-xl shadow-sm p-6 border border-slate-100">
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-semibold text-slate-800">
            User Concentration by Region
          </h3>
          <div className="flex gap-1 bg-slate-100 rounded-lg p-1">
            <button
              onClick={() => setMapView("bar")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                mapView === "bar"
                  ? "bg-white text-slate-800 shadow-sm"
                  : "text-slate-500 hover:text-slate-700"
              }`}
            >
              <BarChart2Icon className="w-3.5 h-3.5" />
              Bar Chart
            </button>
            <button
              onClick={() => setMapView("map")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                mapView === "map"
                  ? "bg-white text-slate-800 shadow-sm"
                  : "text-slate-500 hover:text-slate-700"
              }`}
            >
              <MapPinIcon className="w-3.5 h-3.5" />
              Map View
            </button>
          </div>
        </div>

        {isLoading ? (
          <SkeletonChart height={280} />
        ) : mapView === "bar" ? (
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={cityData} layout="vertical">
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#F1F5F9"
                horizontal={false}
              />
              <XAxis
                type="number"
                tick={{ fontSize: 12, fill: "#94A3B8" }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                dataKey="city"
                type="category"
                width={220}
                axisLine={false}
                tickLine={false}
                tickFormatter={(value) => value.split(",")[0]}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar
                dataKey="users"
                fill="#2563EB"
                radius={[0, 4, 4, 0]}
                name="Users"
              />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <div className="space-y-3">
            {cityData.map((city, i) => (
              <div key={i} className="flex items-center gap-4">
                <div className="flex items-center gap-2 w-32 shrink-0">
                  <MapPinIcon className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                  <span className="text-sm text-slate-700 truncate">
                    {city.city}
                  </span>
                </div>
                <div className="flex-1 h-7 bg-slate-100 rounded-lg overflow-hidden">
                  <div
                    className="h-full rounded-lg flex items-center px-3 transition-all duration-500"
                    style={{
                      width: `${(city.users / maxUsers) * 100}%`,
                      background: "linear-gradient(90deg, #2563EB, #3B82F6)",
                    }}
                  >
                    <span className="text-white text-xs font-medium">
                      {city.users.toLocaleString()}
                    </span>
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

      {/* ── Charts Row ──────────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* User Growth Trend */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-slate-100">
          <h3 className="font-semibold text-slate-800 mb-4">
            User Growth Trend
          </h3>
          {isLoading ? (
            <SkeletonChart height={220} />
          ) : (
            <ResponsiveContainer width="100%" height={220}>
              <LineChart data={growthData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
                <XAxis
                  dataKey="month"
                  tick={{ fontSize: 12, fill: "#94A3B8" }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fontSize: 12, fill: "#94A3B8" }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip content={<CustomTooltip />} />
                <Line
                  type="monotone"
                  dataKey="users"
                  stroke="#2563EB"
                  strokeWidth={2}
                  dot={{ fill: "#2563EB", r: 3 }}
                  name="Users"
                />
              </LineChart>
            </ResponsiveContainer>
          )}
        </div>

        {/* Monthly Revenue */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-slate-100">
          <h3 className="font-semibold text-slate-800 mb-4">Monthly Revenue</h3>
          {isLoading ? (
            <SkeletonChart height={220} />
          ) : (
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={growthData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
                <XAxis
                  dataKey="month"
                  tick={{ fontSize: 12, fill: "#94A3B8" }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fontSize: 12, fill: "#94A3B8" }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip content={<CustomTooltip />} />
                <Bar
                  dataKey="revenue"
                  fill="#2563EB"
                  radius={[4, 4, 0, 0]}
                  name="Revenue ($)"
                />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>
    </div>
  );
};

// ─── Skeleton sub-components (loading placeholders) ──────────────────────────
//
// Kept file-local because they are only relevant to this page's loading state.
// They mirror the dimensions of the real content so layout doesn't shift.

const SkeletonChart = ({ height }: { height: number }) => (
  <div
    className="w-full rounded-lg bg-slate-100 animate-pulse"
    style={{ height }}
  />
);

const SkeletonFunnel = () => (
  <div className="space-y-3">
    {Array.from({ length: 5 }).map((_, i) => (
      <div key={i} className="space-y-1">
        <div className="flex justify-between">
          <div className="h-4 w-28 bg-slate-200 rounded animate-pulse" />
          <div className="h-4 w-16 bg-slate-200 rounded animate-pulse" />
        </div>
        <div className="h-8 bg-slate-100 rounded-lg animate-pulse" />
      </div>
    ))}
  </div>
);

const SkeletonKpiGrid = () => (
  <div className="grid grid-cols-2 gap-4">
    {Array.from({ length: 4 }).map((_, i) => (
      <div key={i} className="bg-slate-100 rounded-xl h-24 animate-pulse" />
    ))}
  </div>
);
