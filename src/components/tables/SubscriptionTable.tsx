import React from "react";
import { EditIcon, ExternalLinkIcon } from "lucide-react";
import { Table, Column } from "../ui/Table";
import { Avatar } from "../ui/Avatar";
import { Badge, PlanBadge, StatusBadge } from "../ui/Badge";
import { Button } from "../ui/Button";
import { Subscription } from "@/types/subscription";
import { formatDate } from "date-fns";

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
  ];
  const formatCurrency = (amount: number, currency: string): string => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency.toUpperCase(),
      minimumFractionDigits: 2,
    }).format(amount);
  };

  const columns: Column<Subscription>[] = [
    {
      key: "user_info",
      header: "User",
      cell: (subscription) => (
        <div className="flex items-center gap-3">
          <Avatar
            name={subscription.name}
            size="md"
            className={avatarColors[subscription.user_id % avatarColors.length]}
          />
          <div className="flex flex-col">
            <span className="text-sm font-medium text-slate-800">
              {subscription.name}
            </span>
            <span className="text-xs text-slate-500">{subscription.email}</span>
            <span className="text-xs text-slate-400 mt-0.5">
              ID: {subscription.user_id}
            </span>
          </div>
        </div>
      ),
    },
    {
      key: "plan",
      header: "Plan",
      cell: (subscription) => <PlanBadge plan={subscription.description} />,
    },
    {
      key: "status",
      header: "Status",
      cell: (subscription) => (
        <StatusBadge status={subscription.is_active ? "active" : "inactive"} />
      ),
    },
    {
      key: "amount",
      header: "Amount",
      cell: (subscription) => (
        <div className="flex flex-col">
          <span className="text-sm font-semibold text-slate-800">
            {formatCurrency(subscription.amount, subscription.currency)}
          </span>
          {subscription.is_trial && (
            <span className="text-xs text-blue-600">Trial</span>
          )}
        </div>
      ),
    },
    {
      key: "start_date",
      header: "Start Date",
      cell: (subscription) => (
        <span className="text-sm text-slate-600">
          {formatDate(subscription.start_date, "MMM d, yyyy")}
        </span>
      ),
    },
    {
      key: "end_date",
      header: "End Date",
      cell: (subscription) => (
        <span className="text-sm text-slate-600">
          {formatDate(subscription.end_date, "MMM d, yyyy")}
        </span>
      ),
    },
    {
      key: "auto_renew",
      header: "Auto Renew",
      cell: (subscription) => (
        <Badge variant={subscription.auto_renew ? "blue" : "green"}>
          {subscription.auto_renew ? "Yes" : "No"}
        </Badge>
      ),
    },
    {
      key: "invoice",
      header: "Invoice",
      cell: (subscription) => (
        <div className="flex gap-2">
          <Button
            size="sm"
            variant="ghost"
            onClick={() => window.open(subscription.invoice_pdf, "_blank")}
            aria-label="View invoice PDF"
          >
            PDF
          </Button>
          <Button
            size="sm"
            variant="ghost"
            onClick={() =>
              window.open(subscription.hosted_invoice_url, "_blank")
            }
            aria-label="View hosted invoice"
            icon={<ExternalLinkIcon className="w-3 h-3" />}
          >
            View
          </Button>
        </div>
      ),
    },
    {
      key: "actions",
      header: "Actions",
      cell: (subscription) => (
        <Button
          size="sm"
          variant="outline"
          icon={<EditIcon className="w-3 h-3" />}
          onClick={() => onEdit(subscription)}
          aria-label={`Edit subscription for ${subscription.name}`}
        >
          Edit
        </Button>
      ),
    },
  ];
  return <Table columns={columns} data={subscriptions} />;
};
