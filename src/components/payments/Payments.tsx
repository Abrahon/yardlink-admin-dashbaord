/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useCallback, useEffect, useState } from "react";
import { FilterIcon, SearchIcon } from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";
import { FilterBar } from "@/components/layout/FilterBar";
import { KpiCard, KpiCardProps } from "@/components/cards/KpiCard";
import { PaymentsTable } from "@/components/tables/PaymentsTable";
import { ExportDropdown } from "@/components/ui/Dropdown";
import { Button } from "@/components/ui/Button";
import { paymentKpis, payments } from "../data/payments";
import { ExportFormat } from "@/types/payments";
import { useDebounce } from "@/lib/debounce";
import {
  useExportPayments,
  useGetPaymentKPIs,
  useGetPayments,
} from "@/api/payment";
import { Pagination } from "../ui";
// import { DateRangePicker } from '@/components/ui/DateRangePicker';
// import { SearchInput } from '@/components/ui/SearchInput';
// import { paymentKpis, payments } from '@/data/payments';

export const Payments = () => {
  // const [exportOpen, setExportOpen] = useState(false);
  // const [fromDate, setFromDate] = useState('');
  // const [toDate, setToDate] = useState('');
  const [txType, setTxType] = useState<string>("");
  const [userRole, setUserRole] = useState<string>("");
  const [search, setSearch] = useState<string>("");
  const [dateRange, setDateRange] = useState<{ start: string; end: string }>({
    start: "",
    end: "",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  // Debounce search
  const debouncedSearch = useDebounce(search, 500);

  // Prepare API params
  const apiParams = {
    page: currentPage,
    page_size: pageSize,
    role: userRole as "client" | "landscaper" | "",
    type: txType as "subscription" | "service" | "refund" | "",
    search: debouncedSearch,
    start_date: dateRange.start || undefined,
    end_date: dateRange.end || undefined,
  };

  // Fetch payments
  const { data, isLoading, error, refetch } = useGetPayments(apiParams);
  const { data: paymentKpis, isLoading: isKpisLoading } = useGetPaymentKPIs();

  const kpis: KpiCardProps[] = [
    {
      label: "Total Transaction Revenue",
      value: paymentKpis?.total_transaction_revenue?.value
        ? `$${paymentKpis.total_transaction_revenue.value.toLocaleString(
            undefined,
            {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            },
          )}`
        : "$0.00",
      trend:
        paymentKpis?.total_transaction_revenue?.label || "0% vs last month",
      trendUp: (paymentKpis?.total_transaction_revenue?.change_percent || 0)  > 0,
      tooltip: `Total revenue from all transactions including subscriptions and services. Change vs previous period: ${paymentKpis?.total_transaction_revenue?.label || "N/A"}`,
    },
    {
      label: "Total Platform Fees",
      value: paymentKpis?.total_platform_fees?.value
        ? `$${paymentKpis.total_platform_fees.value.toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}`
        : "$0.00",
      trend: paymentKpis?.total_platform_fees?.label || "0% vs last month",
      trendUp: (paymentKpis?.total_platform_fees?.change_percent || 0) > 0,
      tooltip: `Platform fees collected from all transactions. Change vs previous period: ${paymentKpis?.total_platform_fees?.label || "N/A"}`,
    },
    {
      label: "Total Transactions",
      value: paymentKpis?.total_transactions?.value?.toLocaleString() || "0",
      trend: paymentKpis?.total_transactions?.label || "0% vs last month",
      trendUp: (paymentKpis?.total_transactions?.change_percent || 0) > 0,
      tooltip: `Total number of successful transactions. Change vs previous period: ${paymentKpis?.total_transactions?.label || "N/A"}`,
    },
  ];

  // Export mutation
  const exportMutation = useExportPayments();

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [txType, userRole, debouncedSearch, dateRange]);

  // Handle export
  const handleExport = useCallback(
    async (format: ExportFormat) => {
      try {
        const exportParams = {
          role: userRole as "client" | "landscaper" | "",
          type: txType as "subscription" | "service" | "refund" | "",
          search: debouncedSearch,
          start_date: dateRange.start || undefined,
          end_date: dateRange.end || undefined,
        };

        const blob = await exportMutation.mutateAsync({
          params: exportParams,
          format,
        });

        // Create download link
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `payments_export_${new Date().toISOString()}.${format}`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
      } catch (error) {
        console.error("Export failed:", error);
      }
    },
    [txType, userRole, debouncedSearch, dateRange, exportMutation],
  );

  // Handle apply filters
  const handleApplyFilters = () => {
    refetch();
  };

  // Transform API data to component data
  const payments =
    data?.results.results.map((record) => ({
      ...record,
      avatarColor:
        record.role === "landscaper" ? "bg-blue-500" : "bg-green-500",
    })) || [];

  const totalItems = data?.count || 0;
  const totalPages = Math.ceil(totalItems / pageSize);

  if (error) {
    return (
      <div className="p-8 text-center">
        <div className="text-red-600">
          Error loading payments. Please try again.
        </div>
        <Button variant="primary" onClick={() => refetch()} className="mt-4">
          Retry
        </Button>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <PageHeader
        title="Payments & Transactions"
        description="View and manage all financial transactions"
        actions={<ExportDropdown onExport={handleExport} />}
      />

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {kpis.map((kpi, i) => (
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
        filters={
          <>
            <select
              value={txType}
              onChange={(e) => setTxType(e.target.value)}
              className="border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            >
              <option value="">All Types</option>
              <option value="subscription">Subscription</option>
              <option value="service">Service</option>
              <option value="refund">Refund</option>
            </select>

            <select
              value={userRole}
              onChange={(e) => setUserRole(e.target.value)}
              className="border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            >
              <option value="">All Roles</option>
              <option value="landscaper">Landscaper</option>
              <option value="client">Client</option>
            </select>

            <div className="relative flex-1 min-w-48">
              <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search by name or transaction ID..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Date Range Picker - You can replace with your date picker component */}
            <div className="flex gap-2">
              <input
                type="date"
                value={dateRange.start}
                onChange={(e) =>
                  setDateRange({ ...dateRange, start: e.target.value })
                }
                className="border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Start Date"
              />
              <input
                type="date"
                value={dateRange.end}
                onChange={(e) =>
                  setDateRange({ ...dateRange, end: e.target.value })
                }
                className="border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="End Date"
              />
            </div>

            <Button
              variant="primary"
              icon={<FilterIcon className="w-4 h-4" />}
              onClick={handleApplyFilters}
            >
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
              ({totalItems} results)
            </span>
          </h3>
        </div>
        <PaymentsTable payments={payments} isLoading={isLoading} />
      </div>

      {totalPages > 1 && (
        <div className="">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            totalItems={totalItems}
            pageSize={pageSize}
            onPageChange={setCurrentPage}
            showTotal={true}
          />
        </div>
      )}
    </div>
  );
};
