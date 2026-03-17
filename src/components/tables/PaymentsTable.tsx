import React from "react";
import { Table, Column } from "../ui/Table";
import { Avatar } from "../ui/Avatar";
import { Badge, StatusBadge } from "../ui/Badge";

interface Payment {
  id: string;
  user: string;
  avatar: string;
  type: string;
  amount: string;
  fee: string;
  date: string;
  status: string;
  source: string;
  avatarColor?: string;
}

export interface PaymentsTableProps {
  payments: Payment[];
}

export const PaymentsTable = ({ payments }: PaymentsTableProps) => {
  const typeBadge = (type: string) => {
    const map: Record<string, string> = {
      Subscription: "bg-blue-100 text-blue-700",
      Service: "bg-green-100 text-green-700",
      Refund: "bg-red-100 text-red-700",
    };
    return <Badge variant={map[type] ? "info" : "default"}>{type}</Badge>;
  };

  const columns: Column<Payment>[] = [
    {
      key: "id",
      header: "Transaction ID",
      cell: (p) => (
        <span className="text-sm font-mono text-slate-600">{p.id}</span>
      ),
    },
    {
      key: "user",
      header: "User",
      cell: (p) => (
        <div className="flex items-center gap-2">
          <Avatar name={p.user} size="sm" color={p.avatarColor} />
          <span className="text-sm font-medium text-slate-800">{p.user}</span>
        </div>
      ),
    },
    {
      key: "type",
      header: "Type",
      cell: (p) => typeBadge(p.type),
    },
    {
      key: "amount",
      header: "Amount",
      cell: (p) => (
        <span className="text-sm font-semibold text-slate-800">{p.amount}</span>
      ),
    },
    {
      key: "fee",
      header: "Platform Fee",
      cell: (p) => <span className="text-sm text-slate-600">{p.fee}</span>,
    },
    {
      key: "date",
      header: "Date",
      cell: (p) => <span className="text-sm text-slate-500">{p.date}</span>,
    },
    {
      key: "status",
      header: "Status",
      cell: (p) => <StatusBadge status={p.status} />,
    },
    {
      key: "source",
      header: "Source",
      cell: (p) => <Badge variant="info">{p.source}</Badge>,
    },
  ];

  return <Table columns={columns} data={payments} />;
};
