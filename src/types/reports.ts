// ─── API Request ────────────────────────────────────────────────────────────

export interface DashboardParams {
  range?: 'weekly' | 'monthly' | 'yearly' | 'custom';
  start_date?: string;
  end_date?: string;
  export?: 'csv' | 'xlsx';
}

// ─── API Response ────────────────────────────────────────────────────────────

export interface FunnelMetric {
  count: number;
  percentage: number;
}

export interface AcquisitionFunnel {
  total_visitors: FunnelMetric;
  total_signups: FunnelMetric;
  trial_signups: FunnelMetric;
  trial_to_paid: FunnelMetric;
  active_subscribers: FunnelMetric;
}

export interface ConversionMetric {
  title: string;
  value: number;
  unit: string;
  label: string;
}

export interface QuoteConversion extends ConversionMetric {
  requested_count: number;
  accepted_count: number;
}

export interface VisitorToTrialSignup extends ConversionMetric {
  visitor_count: number;
  trial_signup_count: number;
}

export interface TrialToPaidConversion extends ConversionMetric {
  trial_signup_count: number;
  paid_after_trial_count: number;
}

export interface SubscriptionRetention extends ConversionMetric {
  active_subscribers: number;
  total_subscribers_ever: number;
}

export interface ConversionMetrics {
  quote_conversion: QuoteConversion;
  visitor_to_trial_signup: VisitorToTrialSignup;
  trial_to_paid_conversion: TrialToPaidConversion;
  subscription_retention: SubscriptionRetention;
}

export interface ChartData {
  title: string;
  type: 'bar' | 'line';
  labels: string[];
  data: number[];
}

export interface RevenueChart extends ChartData {
  summary: {
    total_revenue: number;
  };
}

export interface UserGrowth extends ChartData {
  total_users: number;
}

export interface DashboardFilter {
  range: string;
  start_date: string | null;
  end_date: string | null;
}

export interface DashboardResponse {
  status: string;
  filter: DashboardFilter;
  acquisition_funnel: AcquisitionFunnel;
  conversion_metrics: ConversionMetrics;
  user_concentration_by_region: ChartData;
  user_growth: UserGrowth;
  revenue: RevenueChart;
}

// ─── UI-Layer Types (transformed for components) ────────────────────────────

/**
 * Shape consumed by <ConversionFunnel />
 */
export interface FunnelStep {
  label: string;
  value: number;
  pct: number;
  color: string;
}

/**
 * Shape consumed by <KpiCard /> inside the Quote Conversion grid
 */
export interface KpiCardData {
  label: string;
  value: string;
}

/**
 * Shape consumed by Recharts bar/line charts (city region)
 */
export interface CityChartPoint {
  city: string;
  users: number;
}

/**
 * Shape consumed by Recharts growth / revenue charts
 */
export interface GrowthChartPoint {
  month: string;
  users: number;
  revenue: number;
}