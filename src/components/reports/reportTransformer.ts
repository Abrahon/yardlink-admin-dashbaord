
// ─── Funnel colours (ordered by step) ───────────────────────────────────────

import { AcquisitionFunnel, ChartData, CityChartPoint, ConversionMetrics, FunnelStep, GrowthChartPoint, KpiCardData, RevenueChart, UserGrowth } from "@/types/reports";

const FUNNEL_COLORS: string[] = [
  'bg-blue-600',
  'bg-blue-500',
  'bg-blue-400',
  'bg-indigo-400',
  'bg-indigo-500',
];

// ─── Transformers ─────────────────────────────────────────────────────────────

/**
 * Converts the API `acquisition_funnel` object into an ordered array of steps
 * that <ConversionFunnel /> can render directly.
 *
 * The API returns an object with named keys; the UI needs an ordered array.
 */
export function transformFunnelSteps(funnel: AcquisitionFunnel): FunnelStep[] {
  const steps: Array<{ label: string; metric: { count: number; percentage: number } }> = [
    { label: 'Total Visitors',      metric: funnel.total_visitors },
    { label: 'Total Signups',       metric: funnel.total_signups },
    { label: 'Trial Signups',       metric: funnel.trial_signups },
    { label: 'Trial → Paid',        metric: funnel.trial_to_paid },
    { label: 'Active Subscribers',  metric: funnel.active_subscribers },
  ];

  return steps.map((s, i) => ({
    label: s.label,
    value: s.metric.count,
    pct:   s.metric.percentage,
    color: FUNNEL_COLORS[i] ?? 'bg-blue-500',
  }));
}

/**
 * Converts the API `conversion_metrics` object into a flat array of KPI cards.
 *
 * Each ConversionMetric already has `title`, `value`, `unit`, and `label`
 * fields – we just normalise the `value` display string.
 */
export function transformConversionMetrics(metrics: ConversionMetrics): KpiCardData[] {
  const entries = [
    metrics.quote_conversion,
    metrics.visitor_to_trial_signup,
    metrics.trial_to_paid_conversion,
    metrics.subscription_retention,
  ];

  return entries.map((m) => ({
    label: m.title,
    // e.g. value=42, unit="%" → "42%"  |  value=1200, unit="users" → "1,200 users"
    value: m.unit === '%'
      ? `${m.value}%`
      : `${m.value.toLocaleString()} ${m.unit}`.trim(),
  }));
}

/**
 * Converts the API `user_concentration_by_region` ChartData (parallel arrays)
 * into an array of { city, users } objects for Recharts.
 *
 * API shape: { labels: ['Dhaka', 'Chittagong', ...], data: [4200, 3100, ...] }
 * UI shape:  [{ city: 'Dhaka', users: 4200 }, ...]
 */
export function transformCityData(chart: ChartData): CityChartPoint[] {
  return chart.labels.map((label, i) => ({
    city:  label,
    users: chart.data[i] ?? 0,
  }));
}

/**
 * Merges the API `user_growth` and `revenue` charts (both use parallel label/data
 * arrays keyed by month) into a single array for the dual-chart row.
 *
 * Assumes both charts share the same `labels` array (same months).
 * Falls back gracefully if lengths differ.
 */
export function transformGrowthData(
  userGrowth: UserGrowth,
  revenue: RevenueChart,
): GrowthChartPoint[] {
  const length = Math.max(userGrowth.labels.length, revenue.labels.length);

  return Array.from({ length }, (_, i) => ({
    month:   userGrowth.labels[i] ?? revenue.labels[i] ?? '',
    users:   userGrowth.data[i]   ?? 0,
    revenue: revenue.data[i]      ?? 0,
  }));
}