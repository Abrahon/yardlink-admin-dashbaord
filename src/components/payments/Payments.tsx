"use client";

import  { useState } from "react";
import { FilterIcon, SearchIcon } from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";
import { FilterBar } from "@/components/layout/FilterBar";
import { KpiCard } from "@/components/cards/KpiCard";
import { PaymentsTable } from "@/components/tables/PaymentsTable";
import { ExportDropdown } from "@/components/ui/Dropdown";
import { Button } from "@/components/ui/Button";
import { paymentKpis, payments } from "../data/payments";
// import { DateRangePicker } from '@/components/ui/DateRangePicker';
// import { SearchInput } from '@/components/ui/SearchInput';
// import { paymentKpis, payments } from '@/data/payments';

export const Payments = () => {
  // const [exportOpen, setExportOpen] = useState(false);
  // const [fromDate, setFromDate] = useState('');
  // const [toDate, setToDate] = useState('');
  const [txType, setTxType] = useState("All");
  const [userRole, setUserRole] = useState("All");
  const [search, setSearch] = useState("");

  const filteredPayments = payments.filter((p) => {
    const matchesType = txType === "All" || p.type === txType;
    const matchesSearch =
      p.user.toLowerCase().includes(search.toLowerCase()) ||
      p.id.toLowerCase().includes(search.toLowerCase());
    return matchesType && matchesSearch;
  });

  const handleExport = (format: string) => {
    console.log(`Exporting payments as ${format}`);
  };

  return (
    <div className="p-6 space-y-6">
      <PageHeader
        title="Payments & Transactions"
        description="View and manage all financial transactions"
        actions={<ExportDropdown onExport={handleExport} />}
      />

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {paymentKpis.map((kpi, i) => (
          <KpiCard
            key={i}
            label={kpi.label}
            value={kpi.value}
            trend={kpi.trend}
            trendUp={kpi.trendUp}
            tooltip={kpi.tooltip}
          />
        ))}
      </div>

      {/* Filters Bar */}
      <FilterBar
        dateRange
        filters={
          <>
            <select
              value={txType}
              onChange={(e) => setTxType(e.target.value)}
              className="border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            >
              <option>All Types</option>
              <option>Subscription</option>
              <option>Service</option>
              <option>Refund</option>
            </select>

            <select
              value={userRole}
              onChange={(e) => setUserRole(e.target.value)}
              className="border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            >
              <option>All Roles</option>
              <option>Landscaper</option>
              <option>Client</option>
            </select>

            <div className="relative flex-1 min-w-48">
              <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search by name or ID..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <Button variant="primary" icon={<FilterIcon className="w-4 h-4" />}>
              Apply Filters
            </Button>
          </>
        }
      />

      {/* Payments Table */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100">
          <h3 className="font-semibold text-slate-800">
            Transactions
            <span className="ml-2 text-sm font-normal text-slate-500">
              ({filteredPayments.length} results)
            </span>
          </h3>
        </div>
        <PaymentsTable payments={filteredPayments} />
      </div>
    </div>
  );
};
