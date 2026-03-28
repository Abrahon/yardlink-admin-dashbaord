// Common fields for both roles
interface BaseUser {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
  role: 'client' | 'landscaper';
  is_active: boolean;
  is_flagged: boolean;
  admin_notes: string | null;
  date_joined: string; // ISO datetime
  last_login: string; // ISO datetime
  average_rating: number;
  review_count: number;
//   recent_audit_logs: any[]; // Can be further typed based on audit log structure
  login_activity: LoginActivity[];
}

// Login activity structure
interface LoginActivity {
  id: number;
  ip_address: string;
  device_type: string;
  os: string | null;
  browser: string | null;
  user_agent: string;
  created_at: string; // ISO datetime
}

// ========== CLIENT-SPECIFIC FIELDS ==========
// Note: Clients have these fields but they're always zero/empty

// Complete Client interface
interface Client extends BaseUser {
  role: 'client';
}

// ========== LANDSCAPER-SPECIFIC FIELDS ==========
interface Subscription {
  id: number;
  status: string; // e.g., "trialing", "active", "cancelled"
  is_active: boolean;
  is_trial: boolean;
  auto_renew: boolean;
  start_date: string; // ISO datetime
  end_date: string; // ISO datetime
  stripe_customer_id: string;
  stripe_subscription_id: string;
  plan: {
    id: number;
    name: string;
    price: number;
    discount: number;
    final_price: number;
    duration: string; // e.g., "monthly", "yearly"
    is_active: boolean;
  };
}

interface BusinessProfile {
  id: number;
  business_name: string;
  bio: string | null;
  selected_location: string | null;
  address: string;
}

interface RecentJob {
  id: number;
  service_name: string;
  service_price: number;
  scheduled_date: string; // YYYY-MM-DD
  scheduled_time: string; // HH:MM:SS format
  is_completed: boolean;
  completed_at: string | null; // ISO datetime
  payment_status: string; // "paid", "pending", etc.
  stripe_payment_id: string | null;
  client_profile_id: number;
  client_id: number;
  client_name: string;
  client_email: string;
}

interface LandscaperSpecificFields {
  subscription: Subscription | null;
  business_profile: BusinessProfile | null;
  total_revenue: number;
  total_jobs: number;
  completed_jobs: number;
  pending_jobs: number;
  total_clients: number;
  total_connected_clients: number;
  total_reviews: number;
  recent_jobs: RecentJob[];
}

// Complete Landscaper interface
interface Landscaper extends BaseUser, LandscaperSpecificFields {
  role: 'landscaper';
}

// ========== UNION TYPE ==========
export type User = Client | Landscaper;