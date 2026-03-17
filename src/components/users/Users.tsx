/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
import { FilterIcon, ChevronDownIcon, StarIcon } from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";
// import { SearchInput } from '@/components/ui/SearchInput';
import { Button } from "@/components/ui/Button";
import { Drawer } from "@/components/ui/Drawer";
import { Pagination } from "@/components/ui/Pagination";
import { Dropdown } from "@/components/ui/Dropdown";
import { SearchInput } from "../ui/SearchInput";
import { UsersTable } from "../tables/UserTable";
import { FilterGroup } from "../ui/FilterGroup";
import { sortOptions, users } from "../data/user";
import { useRouter } from "next/navigation";
// import { UsersTable } from '@/components/tables/UsersTable';
// import { FilterGroup } from '@/components/ui/FilterGroup';
// import { users, sortOptions } from '@/data/users';

// type Page = 'overview' | 'reports' | 'users' | 'userProfile' | 'subscriptions' | 'messages' | 'payments' | 'adminSettings';

// interface UsersProps {
//   setActivePage: (page: Page) => void;
// }

export const Users = () => {
  const [filterDrawerOpen, setFilterDrawerOpen] = useState(false);
  const [sortBy, setSortBy] = useState("Revenue (High-Low)");
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [roleFilter, setRoleFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [subscriptionFilter, setSubscriptionFilter] = useState("All");
  const [ratingFilter, setRatingFilter] = useState(0);
  const [minRevenue, setMinRevenue] = useState("");
  const [maxRevenue, setMaxRevenue] = useState("");
  const router = useRouter();

  const filteredUsers = users.filter(
    (u) =>
      (u.name.toLowerCase().includes(search.toLowerCase()) ||
        u.email.toLowerCase().includes(search.toLowerCase())) &&
      (roleFilter === "All" || u.role === roleFilter) &&
      (statusFilter === "All" || u.status === statusFilter) &&
      (subscriptionFilter === "All" || u.subscription === subscriptionFilter) &&
      (ratingFilter === 0 || u.rating >= ratingFilter) &&
      (minRevenue === "" ||
        parseInt(u.revenue.replace(/[$,]/g, "")) >= parseInt(minRevenue)) &&
      (maxRevenue === "" ||
        parseInt(u.revenue.replace(/[$,]/g, "")) <= parseInt(maxRevenue)),
  );

  const pageSize = 8;
  const totalPages = Math.ceil(filteredUsers.length / pageSize);
  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize,
  );

  const handleViewProfile = (user: any) => {
    // setActivePage('userProfile');
    router.push(`/users/${user.id}`);
  };

  const clearFilters = () => {
    setRoleFilter("All");
    setStatusFilter("All");
    setSubscriptionFilter("All");
    setRatingFilter(0);
    setMinRevenue("");
    setMaxRevenue("");
  };

  return (
    <div className="p-6 space-y-6">
      <PageHeader
        title="User Management"
        description="View and manage all platform users"
        actions={
          <div className="flex items-center gap-3">
            <Dropdown
              trigger={
                <Button variant="secondary">
                  Sort: {sortBy}
                  <ChevronDownIcon className="w-3 h-3" />
                </Button>
              }
              options={sortOptions}
              value={sortBy}
              onChange={setSortBy}
            />
            <Button
              variant="secondary"
              icon={<FilterIcon className="w-4 h-4" />}
              onClick={() => setFilterDrawerOpen(true)}
            >
              Advanced Filters
            </Button>
          </div>
        }
      />

      {/* Search */}
      <div className="flex items-center gap-3 flex-1 max-w-md">
        <SearchInput
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onClear={() => setSearch("")}
          placeholder="Search users..."
        />
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
        <UsersTable users={paginatedUsers} onViewProfile={handleViewProfile} />

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={filteredUsers.length}
          pageSize={pageSize}
          onPageChange={setCurrentPage}
        />
      </div>

      {/* Filter Drawer */}
      <Drawer
        isOpen={filterDrawerOpen}
        onClose={() => setFilterDrawerOpen(false)}
        title="Advanced Filters"
        footer={
          <div className="flex gap-3">
            <Button variant="secondary" onClick={clearFilters} fullWidth>
              Clear All
            </Button>
            <Button onClick={() => setFilterDrawerOpen(false)} fullWidth>
              Apply Filters
            </Button>
          </div>
        }
      >
        <div className="space-y-6">
          <FilterGroup label="Role">
            {["All", "Landscaper", "Client"].map((opt) => (
              <label
                key={opt}
                className="flex items-center gap-2 cursor-pointer"
              >
                <input
                  type="radio"
                  name="role"
                  checked={roleFilter === opt}
                  onChange={() => setRoleFilter(opt)}
                  className="accent-blue-600"
                />
                <span className="text-sm text-slate-700">{opt}</span>
              </label>
            ))}
          </FilterGroup>

          <FilterGroup label="Status">
            {["All", "Active", "Suspended", "Pending"].map((opt) => (
              <label
                key={opt}
                className="flex items-center gap-2 cursor-pointer"
              >
                <input
                  type="radio"
                  name="status"
                  checked={statusFilter === opt}
                  onChange={() => setStatusFilter(opt)}
                  className="accent-blue-600"
                />
                <span className="text-sm text-slate-700">{opt}</span>
              </label>
            ))}
          </FilterGroup>

          <FilterGroup label="Subscription">
            {["All", "Basic", "Pro", "None"].map((opt) => (
              <label
                key={opt}
                className="flex items-center gap-2 cursor-pointer"
              >
                <input
                  type="radio"
                  name="subscription"
                  checked={subscriptionFilter === opt}
                  onChange={() => setSubscriptionFilter(opt)}
                  className="accent-blue-600"
                />
                <span className="text-sm text-slate-700">{opt}</span>
              </label>
            ))}
          </FilterGroup>

          <FilterGroup label="Minimum Rating">
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => setRatingFilter(star)}
                  className="p-1 hover:scale-110 transition-transform"
                >
                  <StarIcon
                    className={`w-5 h-5 ${star <= ratingFilter ? "text-yellow-400 fill-yellow-400" : "text-yellow-200"}`}
                  />
                </button>
              ))}
            </div>
          </FilterGroup>

          <FilterGroup label="Revenue Range">
            <div className="flex items-center gap-2">
              <input
                type="number"
                placeholder="Min $"
                value={minRevenue}
                onChange={(e) => setMinRevenue(e.target.value)}
                className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <span className="text-slate-400">—</span>
              <input
                type="number"
                placeholder="Max $"
                value={maxRevenue}
                onChange={(e) => setMaxRevenue(e.target.value)}
                className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </FilterGroup>
        </div>
      </Drawer>
    </div>
  );
};
