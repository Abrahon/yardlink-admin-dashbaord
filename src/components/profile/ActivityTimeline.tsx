/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { ClockIcon } from "lucide-react";
import { Badge } from "../ui/Badge";

interface TimelineItem {
  type: string;
  date: string;
  description: string;
  status: string;
  icon: React.ElementType | string;
}

export interface ActivityTimelineProps {
  items: TimelineItem[];
}

export const ActivityTimeline = ({ items }: ActivityTimelineProps) => {
  const statusColors: Record<string, string> = {
    Accepted: "bg-green-100 text-green-700",
    Completed: "bg-blue-100 text-blue-700",
    Pending: "bg-yellow-100 text-yellow-700",
    Review: "bg-purple-100 text-purple-700",
  };

  return (
    <div className="relative">
      <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-slate-200" />
      <div className="space-y-6">
        {items.map((item, i) => (
          <div key={i} className="flex gap-4 pl-2">
            <div className="relative z-10 w-6 h-6 rounded-full bg-white border-2 border-blue-400 flex items-center justify-center shrink-0 mt-0.5">
              <div className="w-2 h-2 rounded-full bg-blue-400" />
            </div>
            <div className="flex-1 bg-slate-50 rounded-xl p-4">
              <div className="flex items-start justify-between">
                <p className="text-sm text-slate-800">{item.description}</p>
                <Badge
                  variant={(statusColors[item.status] as any) || "default"}
                >
                  {item.status}
                </Badge>
              </div>
              <p className="text-xs text-slate-400 mt-1 flex items-center gap-1">
                <ClockIcon className="w-3 h-3" />
                {item.date}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
