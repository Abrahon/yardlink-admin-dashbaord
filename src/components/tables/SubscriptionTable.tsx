import React from "react";
import { EditIcon } from "lucide-react";
import { Table, Column } from "../ui/Table";
import { Avatar } from "../ui/Avatar";
import { PlanBadge, StatusBadge } from "../ui/Badge";
import { Button } from "../ui/Button";

interface Subscription {
  id: number;
  user: string;
  avatar: string;
  plan: string;
  status: string;
  start: string;
  end: string;
  amount: string;
}

export interface SubscriptionsTableProps {
  subscriptions: Subscription[];
  onEdit: (subscription: Subscription) => void;
}

export const SubscriptionsTable = ({
  subscriptions,
  onEdit,
}: SubscriptionsTableProps) => {
  const avatarColors = [
    "bg-blue-500",
    "bg-green-500",
    "bg-purple-500",
    "bg-orange-500",
    "bg-teal-500",
    "bg-pink-500",
    "bg-indigo-500",
    "bg-rose-500",
  ];

  const columns: Column<Subscription>[] = [
    {
      key: "user",
      header: "User",
      cell: (sub) => (
        <div className="flex items-center gap-3">
          <Avatar
            name={sub.user}
            size="md"
            color={avatarColors[(sub.id - 1) % avatarColors.length]}
          />
          <span className="text-sm font-medium text-slate-800">{sub.user}</span>
        </div>
      ),
    },
    {
      key: "plan",
      header: "Plan",
      cell: (sub) => <PlanBadge plan={sub.plan} />,
    },
    {
      key: "status",
      header: "Status",
      cell: (sub) => <StatusBadge status={sub.status} />,
    },
    {
      key: "start",
      header: "Start Date",
      cell: (sub) => (
        <span className="text-sm text-slate-600">{sub.start}</span>
      ),
    },
    {
      key: "end",
      header: "End Date",
      cell: (sub) => <span className="text-sm text-slate-600">{sub.end}</span>,
    },
    {
      key: "amount",
      header: "Amount",
      cell: (sub) => (
        <span className="text-sm font-semibold text-slate-800">
          {sub.amount}
        </span>
      ),
    },
    {
      key: "actions",
      header: "Actions",
      cell: (sub) => (
        <Button
          size="sm"
          icon={<EditIcon className="w-3 h-3" />}
          onClick={(e) => {
            e.stopPropagation();
            onEdit(sub);
          }}
        >
          Edit
        </Button>
      ),
    },
  ];

  return <Table columns={columns} data={subscriptions} />;
};
