import { StarIcon } from "lucide-react";
import { InfoCard } from "@/components/cards/InfoCard";

export interface OverviewTabProps {
  profile: {
    address: string;
    clients: string;
    rating: number;
    plan: string;
    memberSince: string;
    lastLogin: string;
    jobsCompleted: string;
    lifetimePaid?: string;
  };
}

export const OverviewTab = ({ profile }: OverviewTabProps) => {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      <InfoCard label="Full Address" value={profile.address} />
      <InfoCard label="Number of Clients" value={profile.clients} />
      <InfoCard
        label="Review Rating"
        value={`${profile.rating} / 5.0`}
        extra={
          <div className="flex gap-0.5 mt-1">
            {[1, 2, 3, 4, 5].map((s) => (
              <StarIcon
                key={s}
                className={`w-3.5 h-3.5 ${s <= profile.rating ? "text-yellow-400 fill-yellow-400" : "text-yellow-300 fill-yellow-100"}`}
              />
            ))}
          </div>
        }
      />
      <InfoCard
        label="Subscription Status"
        value={`${profile.plan} Plan`}
        extra={
          <span className="text-xs text-slate-500">Active since Jan 2024</span>
        }
      />
      <InfoCard
        label="Lifetime Revenue"
        value={profile.lifetimePaid || "$24,830"}
      />
      <InfoCard label="Member Since" value={profile.memberSince} />
      <InfoCard label="Last Active" value={profile.lastLogin} />
      <InfoCard label="Jobs Completed" value={profile.jobsCompleted} />
    </div>
  );
};
