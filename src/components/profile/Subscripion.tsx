import { format } from "date-fns"; // optional, for date formatting
import Link from "next/link";
import { BusinessProfile, Subscription } from "./interface";

interface SubscriptionCardProps {
  subscription: Subscription;
  businessProfile: BusinessProfile;
}
export const SubscriptionCard = ({ 
  subscription, 
  businessProfile 
}: SubscriptionCardProps) => {
  
  // Helper function to format dates
  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), "MMM dd, yyyy");
    } catch {
      return "Invalid date";
    }
  };

  // Helper to get status badge styles
  const getStatusBadgeStyles = (status: Subscription["status"]) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800 border-green-200";
      case "trialing":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "canceled":
        return "bg-red-100 text-red-800 border-red-200";
      case "past_due":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  // Calculate days remaining
  const getDaysRemaining = () => {
    const endDate = new Date(subscription.end_date);
    const today = new Date();
    const diffTime = endDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const daysRemaining = getDaysRemaining();
  const isExpiringSoon = daysRemaining <= 7 && daysRemaining > 0;

  return (
    <div className="bg-white rounded-[--radius-card] shadow-[--shadow-card] overflow-hidden">
      {/* Header Section */}
      <div className="p-6 border-b border-[--color-border-base]">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h2 className="text-lg font-semibold text-[--color-text-main] mb-1">
              {businessProfile.business_name}
            </h2>
            {businessProfile.address && (
              <p className="text-sm text-[--color-text-muted] flex items-center gap-1">
                <svg 
                  className="w-4 h-4" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" 
                  />
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" 
                  />
                </svg>
                {businessProfile.address}
              </p>
            )}
          </div>
          <div className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusBadgeStyles(subscription.status)}`}>
            {subscription.status.charAt(0).toUpperCase() + subscription.status.slice(1)}
          </div>
        </div>
      </div>

      {/* Plan Details Section */}
      <div className="p-6 border-b border-[--color-border-base]">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-medium text-[--color-text-muted] uppercase tracking-wider">
            Current Plan
          </h3>
          {subscription.auto_renew && (
            <span className="text-xs text-green-600 bg-green-50 px-2 py-1 rounded-full">
              Auto-renew ON
            </span>
          )}
        </div>
        
        <div className="flex items-baseline justify-between">
          <div>
            <p className="text-2xl font-bold text-[--color-text-main]">
              {subscription.plan.name}
            </p>
            <p className="text-sm text-[--color-text-muted] mt-1">
              {subscription.plan.duration === "monthly" ? "Monthly billing" : "Yearly billing"}
            </p>
          </div>
          <div className="text-right">
            <div className="flex items-baseline gap-2">
              {subscription.plan.discount > 0 && (
                <span className="text-sm text-[--color-text-muted] line-through">
                  ${subscription.plan.price.toFixed(2)}
                </span>
              )}
              <span className="text-2xl font-bold text-[--color-primary]">
                ${subscription.plan.final_price.toFixed(2)}
              </span>
              <span className="text-sm text-[--color-text-muted]">
                /{subscription.plan.duration === "monthly" ? "mo" : "yr"}
              </span>
            </div>
            {subscription.plan.discount > 0 && (
              <p className="text-xs text-green-600 mt-1">
                {subscription.plan.discount}% discount applied
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Subscription Timeline Section */}
      <div className="p-6 border-b border-[--color-border-base]">
        <div className="space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-[--color-text-muted]">Start Date</span>
            <span className="font-medium text-[--color-text-main]">
              {formatDate(subscription.start_date)}
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-[--color-text-muted]">End Date</span>
            <div className="text-right">
              <span className={`font-medium ${isExpiringSoon ? 'text-red-600' : 'text-[--color-text-main]'}`}>
                {formatDate(subscription.end_date)}
              </span>
              {daysRemaining > 0 && (
                <p className={`text-xs mt-1 ${isExpiringSoon ? 'text-red-500' : 'text-[--color-text-muted]'}`}>
                  {daysRemaining} days remaining
                </p>
              )}
            </div>
          </div>
          
          {/* Trial Indicator */}
          {subscription.is_trial && (
            <div className="mt-3 p-3 bg-blue-50 rounded-lg border border-blue-100">
              <p className="text-sm text-blue-700 flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                Trial period active
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Action Buttons Section */}
      <div className="p-6 bg-[--color-page-bg]">
        <div className="flex gap-3">
          <button className="flex-1 px-4 py-2 bg-[--color-primary] text-white rounded-lg font-medium hover:bg-[--color-primary-hover] transition-colors">
            Manage Subscription
          </button>
          {subscription.auto_renew ? (
            <button className="px-4 py-2 border border-[--color-border-base] bg-white text-[--color-text-muted] rounded-lg font-medium hover:bg-gray-50 transition-colors">
              Cancel Auto-renew
            </button>
          ) : (
            <button className="px-4 py-2 border border-[--color-border-base] bg-white text-[--color-text-muted] rounded-lg font-medium hover:bg-gray-50 transition-colors">
              Enable Auto-renew
            </button>
          )}
        </div>
        
        {/* Stripe Info Link */}
        <div className="mt-4 text-center">
          <Link 
            href={`https://dashboard.stripe.com/customers/${subscription.stripe_customer_id}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-[--color-text-muted] hover:text-[--color-primary] transition-colors inline-flex items-center gap-1"
          >
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
            View in Stripe Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
};