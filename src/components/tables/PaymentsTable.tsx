import React from "react";
import { Avatar } from "../ui/Avatar";
import { Badge, BadgeVariant, StatusBadge } from "../ui/Badge";
import { Payment } from "@/types/payments";
import { Column, Table } from "../ui";

interface PaymentsTableProps {
  payments: Payment[];
  isLoading?: boolean;
}

export const PaymentsTable = ({ payments, isLoading }: PaymentsTableProps) => {
  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getTypeBadge = (type: string) => {
    const typeMap: Record<string, { variant: BadgeVariant; label: string }> = {
      subscription: { variant: "info", label: "Subscription" },
      service: { variant: "success", label: "Service" },
      refund: { variant: "warning", label: "Refund" },
    };
    const config = typeMap[type.toLowerCase()] || { variant: "default", label: type };
    return <Badge variant={config.variant}>{config.label}</Badge>;
  };

  const columns: Column<Payment>[] = [
    {
      key: "transaction_id",
      header: "Transaction ID",
      cell: (payment) => (
        <span className="text-sm font-mono text-slate-600">
          {payment.transaction_id.slice(0, 12)}...
        </span>
      ),
    },
    {
      key: "name",
      header: "User",
      cell: (payment) => (
        <div className="flex items-center gap-2">
          <Avatar name={payment.name} size="sm" />
          <div>
            <div className="text-sm font-medium text-slate-800">
              {payment.name}
            </div>
            <div className="text-xs text-slate-500">{payment.email}</div>
          </div>
        </div>
      ),
    },
    {
      key: "role",
      header: "Role",
      cell: (payment) => (
        <Badge variant={payment.role === "landscaper" ? "info" : "success"}>
          {payment.role === "landscaper" ? "Landscaper" : "Client"}
        </Badge>
      ),
    },
    {
      key: "type",
      header: "Type",
      cell: (payment) => getTypeBadge(payment.type),
    },
    {
      key: "amount_paid",
      header: "Amount",
      cell: (payment) => (
        <span className="text-sm font-semibold text-slate-800">
          {formatAmount(payment.amount_paid)}
        </span>
      ),
    },
    {
      key: "platform_fee",
      header: "Platform Fee",
      cell: (payment) => (
        <span className="text-sm text-slate-600">
          {formatAmount(payment.platform_fee)}
        </span>
      ),
    },
    {
      key: "date",
      header: "Date",
      cell: (payment) => (
        <span className="text-sm text-slate-500">
          {formatDate(payment.date)}
        </span>
      ),
    },
    {
      key: "status",
      header: "Status",
      cell: (payment) => <StatusBadge status={payment.status} />,
    },
  ];

  if (isLoading) {
    return (
      <div className="p-8 text-center">
        <div className="text-slate-500">Loading payments...</div>
      </div>
    );
  }

  return (
    <Table
      columns={columns}
      data={payments}
      rowKey="record_id"
      onRowClick={(payment) => console.log("Clicked payment:", payment)}
    />
  );
};