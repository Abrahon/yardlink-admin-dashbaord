// Subscription Plan Interface
export interface Plan {
  id: number;
  name: string;
  price: number;
  discount: number;
  final_price: number;
  duration: "monthly" | "yearly"; // based on the data pattern
  is_active: boolean;
}

// Subscription Interface
export interface Subscription {
  id: number;
  status: "trialing" | "active" | "canceled" | "past_due" | "incomplete";
  is_active: boolean;
  is_trial: boolean;
  auto_renew: boolean;
  start_date: string; // ISO datetime string
  end_date: string; // ISO datetime string
  stripe_customer_id: string;
  stripe_subscription_id: string;
  plan: Plan;
}

// Business Profile Interface
export interface BusinessProfile {
  id: number;
  business_name: string;
  bio: string | null;
  selected_location: string | null;
  address: string;
}