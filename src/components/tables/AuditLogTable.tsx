import React from "react";
import { Table, Column } from "../ui/Table";
import { Avatar } from "../ui/Avatar";

interface AuditLog {
  id?: string | number;
  admin: string;
  action: string;
  target: string;
  date: string;
  ip: string;
}

export interface AuditLogTableProps {
  logs: AuditLog[];
}

export const AuditLogTable = ({ logs }: AuditLogTableProps) => {
  
  const columns: Column<AuditLog>[] = [
    {
      key: "admin",
      header: "Admin Name",
      cell: (log) => (
        <div className="flex items-center gap-2">
          <Avatar name={log.admin} size="sm" />
          <span className="text-sm font-medium text-slate-800">
            {log.admin}
          </span>
        </div>
      ),
    },
    {
      key: "action",
      header: "Action",
      cell: (log) => (
        <span className="text-sm text-slate-600">{log.action}</span>
      ),
    },
    {
      key: "target",
      header: "Target User",
      cell: (log) => (
        <span className="text-sm text-slate-700 font-medium">{log.target}</span>
      ),
    },
    {
      key: "date",
      header: "Date & Time",
      cell: (log) => <span className="text-sm text-slate-500">{log.date}</span>,
    },
    {
      key: "ip",
      header: "IP Address",
      cell: (log) => (
        <span className="text-sm font-mono text-slate-500">{log.ip}</span>
      ),
    },
  ];

  return <Table columns={columns} data={logs} />;
};
