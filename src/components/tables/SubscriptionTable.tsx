import React from "react";
import { EditIcon } from "lucide-react";
import { Table, Column } from "../ui/Table";
import { Avatar } from "../ui/Avatar";
import { PlanBadge, StatusBadge } from "../ui/Badge";
import { Button } from "../ui/Button";
import { Subscription } from "@/types/subscription";

export interface SubscriptionsTableProps {
  subscriptions: Subscription[];
  onEdit: (subscription: Subscription) => void;
}

export const SubscriptionsTable = ({ subscriptions, onEdit }: SubscriptionsTableProps) => {
  const avatarColors = ["bg-blue-500", "bg-green-500", "bg-purple-500", "bg-orange-500", "bg-teal-500"];

  const columns: Column<Subscription>[] = [
    {
      key: "user_name",
      header: "User",
      cell: (sub) => (
        <div className="flex items-center gap-3">
          <Avatar
            name={sub.user_name}
            size="md"
            color={avatarColors[sub.id % avatarColors.length]}
          />
          <div className="flex flex-col">
            <span className="text-sm font-medium text-slate-800">{sub.user_name}</span>
            <span className="text-xs text-slate-500">{sub.user_email}</span>
          </div>
        </div>
      ),
    },
    {
      key: "plan_name",
      header: "Plan",
      cell: (sub) => <PlanBadge plan={sub.plan_name} />,
    },
    {
      key: "status",
      header: "Status",
      cell: (sub) => <StatusBadge status={sub.status} />,
    },
    {
      key: "start_date",
      header: "Start Date",
      cell: (sub) => <span className="text-sm text-slate-600">{new Date(sub.start_date).toLocaleDateString()}</span>,
    },
    {
      key: "end_date",
      header: "End Date",
      cell: (sub) => <span className="text-sm text-slate-600">{new Date(sub.end_date).toLocaleDateString()}</span>,
    },
    {
      key: "remaining_days",
      header: "Remaining",
      cell: (sub) => <span className="text-sm font-semibold text-slate-800">{sub.remaining_days} Days</span>,
    },
    {
      key: "actions",
      header: "Actions",
      cell: (sub) => (
        <Button size="sm" icon={<EditIcon className="w-3 h-3" />} onClick={() => onEdit(sub)}>
          Edit
        </Button>
      ),
    },
  ];

  return <Table columns={columns} data={subscriptions} />;
};