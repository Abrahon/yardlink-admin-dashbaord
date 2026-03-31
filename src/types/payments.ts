// Payment record from API
export interface PaymentRecord {
  record_id: number;
  user_id: number;
  role: "client" | "landscaper";
  type: "subscription" | "service" | "refund";
  name: string;
  email: string;
  amount_paid: number;
  base_amount: number;
  platform_fee: number;
  status: string;
  transaction_id: string;
  date: string;
  created_at: string;
  job_id: number | null;
  job_status: string | null;
  invoice_number: string | null;
  landscaper_id: number | null;
  landscaper_name: string | null;
  plan_id: number | null;
  plan_name: string | null;
}

// API Filters
export interface PaymentsFilters {
  role: "client" | "landscaper" | "";
  type: "subscription" | "service" | "refund" | "";
  search: string;
  start_date?: string;
  end_date?: string;
  invoice_start_date?: string;
  invoice_end_date?: string;
  subscription_start_date?: string;
  subscription_end_date?: string;
}

// API Response
export interface PaymentsResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: {
    filters: {
      role: string | null;
      type: string | null;
      search: string | null;
      invoice_start_date: string | null;
      invoice_end_date: string | null;
      subscription_start_date: string | null;
      subscription_end_date: string | null;
    };
    results: PaymentRecord[];
  };
}

// API Parameters
export interface PaymentsParams extends Partial<PaymentsFilters> {
  page: number;
  page_size: number;
}

// Component state type
export interface Payment extends PaymentRecord {
  avatarColor?: string;
}

// Export format
export type ExportFormat = "csv" | "xlsx";

export interface KpiMetric {
  /** The actual numeric value of the KPI */
  value: number;
  /** Percentage change compared to previous period (e.g., 100 for 100% increase) */
  change_percent: number;
  /** Human-readable label showing the change (e.g., "100% vs last month") */
  label: string;
}

export interface PaymentKPIsResponse {
  /** Total revenue from all transactions (subscriptions + services) */
  total_transaction_revenue: KpiMetric;
  /** Total platform fees collected from transactions */
  total_platform_fees: KpiMetric;
  /** Total number of successful transactions */
  total_transactions: KpiMetric;
}
