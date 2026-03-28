import { StarIcon } from "lucide-react";
import { InfoCard } from "@/components/cards/InfoCard";
import { User } from "@/types/user";
import { format } from "date-fns";
export const OverviewTab = ({ profile }: { profile: User | undefined }) => {
  if (!profile) {
    return <div>Loading...</div>;
  }
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      <InfoCard label="Full Address" value={profile.address} />
      {profile.role === "landscaper" && (
        <>
          <InfoCard
            label="Number of Clients"
            value={
              profile.role === "landscaper"
                ? String(profile.total_clients)
                : "N/A"
            }
          />
          <InfoCard
            label="Review Rating"
            value={`${profile.average_rating} / 5.0`}
            extra={
              <div className="flex gap-0.5 mt-1">
                {[1, 2, 3, 4, 5].map((s) => (
                  <StarIcon
                    key={s}
                    className={`w-3.5 h-3.5 ${s <= profile.average_rating ? "text-yellow-400 fill-yellow-400" : "text-yellow-300 fill-yellow-100"}`}
                  />
                ))}
              </div>
            }
          />
          <InfoCard
            label="Subscription Status"
            value={`${profile.subscription?.plan?.name} Plan`}
            extra={
              <span className="text-xs text-slate-500">
                Active since Jan 2024
              </span>
            }
          />

          <InfoCard
            label="Lifetime Revenue"
            value={String(profile?.total_revenue) || "$24,830"}
          />
        </>
      )}
      <InfoCard label="Member Since" value={format(new Date(profile.date_joined), "MMM dd, yyyy")} />
      <InfoCard label="Last Active" value={format(new Date(profile.last_login), "MMM dd, yyyy")} />
      {profile.role === "landscaper" && (
        <InfoCard
          label="Jobs Completed"
          value={String(profile?.total_jobs) || "0"}
        />
      )}
    </div>
  );
};
