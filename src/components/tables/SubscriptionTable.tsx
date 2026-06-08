"use client";

import React from "react";
import {
  EditIcon,
  ExternalLinkIcon,
  CalendarPlusIcon,
  PauseIcon,
  PlayIcon,
} from "lucide-react";
import { Table, Column } from "../ui/Table";
import { Avatar } from "../ui/Avatar";
import { Badge, PlanBadge, StatusBadge } from "../ui/Badge";
import { Button } from "../ui/Button";
import { Dropdown } from "../ui/Dropdown";
import { toast } from "../ui/Toast";
import { ExtendDays, Subscription } from "@/types/subscription";
import {
  useExtendSubscription,
  usePauseSubscription,
} from "@/api/subscription";
import { formatDate } from "date-fns";

export interface SubscriptionsTableProps {
  subscriptions: Subscription[];
  onEdit?: (subscription: Subscription) => void;
}

const EXTEND_OPTIONS: { value: string; label: string }[] = [
  { value: String(ExtendDays.OneWeek), label: "Extend 7 days" },
  { value: String(ExtendDays.TwoWeeks), label: "Extend 14 days" },
  { value: String(ExtendDays.OneMonth), label: "Extend 30 days" },
  { value: String(ExtendDays.ThreeMonths), label: "Extend 90 days" },
];

export const SubscriptionsTable = ({
  subscriptions,
  onEdit,
}: SubscriptionsTableProps) => {
  const extendSubscription = useExtendSubscription();
  const pauseSubscription = usePauseSubscription();

  const handleExtend = (subscriptionId: number, days: number) => {
    extendSubscription.mutate(
      { id: subscriptionId, payload: { days: days as ExtendDays } },
      {
        onSuccess: (data) =>
          toast.success(data.message || "Subscription extended successfully"),
        onError: () => toast.error("Failed to extend subscription"),
      },
    );
  };

  const handlePause = (subscription: Subscription) => {
    const nextActive = !subscription.is_active;
    pauseSubscription.mutate(
      { id: subscription.subscription_id, payload: { is_active: nextActive } },
      {
        onSuccess: (data) =>
          toast.success(
            data.message ||
              (nextActive
                ? "Subscription activated successfully"
                : "Subscription paused successfully"),
          ),
        onError: () =>
          toast.error(
            nextActive
              ? "Failed to activate subscription"
              : "Failed to pause subscription",
          ),
      },
    );
  };
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
      cell: (subscription) => {
        const isExtending =
          extendSubscription.isPending &&
          extendSubscription.variables?.id === subscription.subscription_id;
        const isPausing =
          pauseSubscription.isPending &&
          pauseSubscription.variables?.id === subscription.subscription_id;

        return (
          <div className="flex items-center gap-1">
            <button
              className="p-2 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
              title="Edit"
              onClick={() => onEdit?.(subscription)}
              aria-label={`Edit subscription for ${subscription.name}`}
            >
              <EditIcon className="w-4 h-4" />
            </button>

            {subscription.is_trial ? (
              <Dropdown
                align="right"
                width="w-40"
                onChange={(value) =>
                  handleExtend(subscription.subscription_id, Number(value))
                }
                options={EXTEND_OPTIONS}
                trigger={
                  <button
                    className="p-2 text-slate-500 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors disabled:opacity-50"
                    title="Extend"
                    disabled={isExtending}
                    aria-label={`Extend subscription for ${subscription.name}`}
                  >
                    <CalendarPlusIcon className="w-4 h-4" />
                  </button>
                }
              />
            ) : (
              <button
                className="p-2 text-slate-300 rounded-lg cursor-not-allowed"
                title="Only trial plans can be extended"
                disabled
                aria-label="Only trial plans can be extended"
              >
                <CalendarPlusIcon className="w-4 h-4" />
              </button>
            )}

            <button
              className="p-2 text-slate-500 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition-colors disabled:opacity-50"
              title={subscription.is_active ? "Pause" : "Resume"}
              disabled={isPausing}
              onClick={() => handlePause(subscription)}
              aria-label={`${
                subscription.is_active ? "Pause" : "Resume"
              } subscription for ${subscription.name}`}
            >
              {subscription.is_active ? (
                <PauseIcon className="w-4 h-4" />
              ) : (
                <PlayIcon className="w-4 h-4" />
              )}
            </button>
          </div>
        );
      },
    },
  ];
  return <Table columns={columns} data={subscriptions} />;
};
