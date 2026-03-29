import { format } from "date-fns";
import Link from "next/link";

// Recent Job Interface
export interface RecentJob {
  id: number;
  service_name: string;
  service_price: number;
  scheduled_date: string; // YYYY-MM-DD format
  scheduled_time: string; // HH:MM:SS format
  is_completed: boolean;
  completed_at: string | null; // ISO datetime string
  payment_status: "paid" | "pending" | "failed" | "refunded";
  stripe_payment_id: string;
  client_profile_id: number;
  client_id: number;
  client_name: string;
  client_email: string;
}

interface RecentJobsProps {
  recentJobs: RecentJob[];
  onViewJob?: (jobId: number) => void; // Optional callback for job click
}

export const RecentJobs = ({ recentJobs, onViewJob }: RecentJobsProps) => {
  // Helper function to format date
  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), "MMM dd, yyyy");
    } catch {
      return dateString;
    }
  };

  // Helper function to format time
  const formatTime = (timeString: string) => {
    try {
      const [hours, minutes] = timeString.split(":");
      return format(
        new Date().setHours(parseInt(hours), parseInt(minutes)),
        "h:mm a",
      );
    } catch {
      return timeString;
    }
  };

  // Helper function to format price
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(price);
  };

  // Helper function to get payment status badge styles
  const getPaymentStatusStyles = (status: RecentJob["payment_status"]) => {
    switch (status) {
      case "paid":
        return "bg-green-100 text-green-800 border-green-200";
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "failed":
        return "bg-red-100 text-red-800 border-red-200";
      case "refunded":
        return "bg-gray-100 text-gray-800 border-gray-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  // Helper function to get payment status icon
  const getPaymentStatusIcon = (status: RecentJob["payment_status"]) => {
    switch (status) {
      case "paid":
        return (
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
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        );
      case "pending":
        return (
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
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        );
      default:
        return (
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
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        );
    }
  };

  if (!recentJobs || recentJobs.length === 0) {
    return (
      <div className="bg-white rounded-[--radius-card] shadow-[--shadow-card] p-8 text-center">
        <div className="flex flex-col items-center gap-3">
          <svg
            className="w-12 h-12 text-[--color-text-muted]"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
            />
          </svg>
          <p className="text-[--color-text-muted] font-medium">
            No recent jobs found
          </p>
          <p className="text-sm text-[--color-text-muted]">
            Completed jobs will appear here
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-[--radius-card] shadow-[--shadow-card] overflow-hidden">
      {/* Header */}
      <div className="px-6 py-4 border-b border-[--color-border-base]">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-[--color-text-main]">
            Recent Jobs
          </h2>
          <span className="text-sm text-[--color-text-muted] bg-[--color-page-bg] px-3 py-1 rounded-full">
            {recentJobs.length} job{recentJobs.length !== 1 ? "s" : ""}
          </span>
        </div>
      </div>

      {/* Jobs List */}
      <div className="divide-y divide-[--color-border-base]">
        {recentJobs.map((job) => (
          <div
            key={job.id}
            onClick={() => onViewJob?.(job.id)}
            className="p-6 hover:bg-[--color-page-bg] transition-colors cursor-pointer group"
          >
            <div className="flex items-start justify-between gap-4">
              {/* Left Section - Job Details */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-2 flex-wrap">
                  <h3 className="text-base font-semibold text-[--color-text-main] group-hover:text-[--color-primary] transition-colors">
                    {job.service_name}
                  </h3>
                  <span
                    className={`px-2 py-0.5 rounded-full text-xs font-medium border ${getPaymentStatusStyles(job.payment_status)} inline-flex items-center gap-1`}
                  >
                    {getPaymentStatusIcon(job.payment_status)}
                    <span>
                      {job.payment_status.charAt(0).toUpperCase() +
                        job.payment_status.slice(1)}
                    </span>
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 text-sm">
                  {/* Client Info */}
                  <div className="flex items-center gap-2 text-[--color-text-muted]">
                    <svg
                      className="w-4 h-4 flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                    <span className="truncate">{job.client_name}</span>
                    <span className="text-xs text-[--color-text-muted]">•</span>
                    <span className="truncate text-xs">{job.client_email}</span>
                  </div>

                  {/* Schedule */}
                  <div className="flex items-center gap-2 text-[--color-text-muted]">
                    <svg
                      className="w-4 h-4 flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                    <span>{formatDate(job.scheduled_date)}</span>
                    <span>at</span>
                    <span>{formatTime(job.scheduled_time)}</span>
                  </div>
                </div>

                {/* Completion Info */}
                {job.is_completed && job.completed_at && (
                  <div className="mt-3 flex items-center gap-2 text-xs text-green-600 bg-green-50 px-2 py-1 rounded-md inline-flex">
                    <svg
                      className="w-3 h-3"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span>Completed on {formatDate(job.completed_at)}</span>
                  </div>
                )}
              </div>

              {/* Right Section - Price & Action */}
              <div className="text-right flex-shrink-0">
                <div className="text-lg font-bold text-[--color-primary]">
                  {formatPrice(job.service_price)}
                </div>
                <div className="mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-xs text-[--color-text-muted] inline-flex items-center gap-1">
                    View details
                    <svg
                      className="w-3 h-3"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </span>
                </div>
              </div>
            </div>

            {/* Stripe Payment ID (optional, show on hover or always) */}
            {job.stripe_payment_id && (
              <div className="mt-2 pt-2 border-t border-[--color-border-base] text-xs text-[--color-text-muted] truncate">
                <span className="font-mono">
                  Payment Ref: {job.stripe_payment_id}
                </span>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* View All Link */}
      <div className="px-6 py-4 border-t border-[--color-border-base] bg-[--color-page-bg]">
        <Link
          href="/jobs"
          className="text-sm text-[--color-primary] hover:text-[--color-primary-hover] font-medium inline-flex items-center gap-1 transition-colors"
        >
          View all jobs
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
              d="M9 5l7 7-7 7"
            />
          </svg>
        </Link>
      </div>
    </div>
  );
};
