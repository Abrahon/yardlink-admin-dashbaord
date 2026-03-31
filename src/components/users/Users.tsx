/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { PageHeader } from "@/components/layout/PageHeader";
import { Button } from "@/components/ui/Button";
import { Pagination } from "@/components/ui/Pagination";
import { UsersTable } from "../tables/UserTable";
import { useGetUsers } from "@/api/users";
import { User } from "./interface";

export const Users = () => {
  const router = useRouter();
  // const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
   const pageSize = 20;
  const [roleFilter, setRoleFilter] = useState<
    "all" | "admin" | "client" | "landscaper"
  >("all");
  const { data: usersData, isLoading, error } = useGetUsers({limit: pageSize, page: currentPage, role: roleFilter === "all" ? undefined : roleFilter});

 

  // Build query params - ensure flat structure


  const handleViewProfile = (user: User) => {
    router.push(`/users/${user.id}`);
  };

  const handleRoleFilterChange = (role: typeof roleFilter) => {
    setRoleFilter(role);
    setCurrentPage(1);
  };

  // const handleSearch = (value: string) => {
  //   setSearch(value);
  //   setCurrentPage(1);
  // };

  const summary = usersData?.results?.summary;
  const users = usersData?.results?.data || [];
  const totalCount = usersData?.count || 0;
  const totalPages = Math.ceil(totalCount / pageSize);

  return (
    <div className="p-6 space-y-6">
      <PageHeader
        title="User Management"
        description="View and manage all platform users"
      />

      {/* Stats Cards */}
      {summary && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-4">
            <p className="text-sm text-slate-500">Total Users</p>
            <p className="text-2xl font-semibold text-slate-900">
              {summary.total_users}
            </p>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-4">
            <p className="text-sm text-slate-500">Active Users</p>
            <p className="text-2xl font-semibold text-slate-900">
              {summary.active_users}
            </p>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-4">
            <p className="text-sm text-slate-500">Platform Fee</p>
            <p className="text-2xl font-semibold text-slate-900">
              ${summary.platform_fee_collected}
            </p>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-4">
            <p className="text-sm text-slate-500">Avg. Rating</p>
            <p className="text-2xl font-semibold text-slate-900">
              {summary.average_rating}
            </p>
          </div>
        </div>
      )}

      {/* Filters Section */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        {/* <div className="flex items-center gap-3 flex-1 max-w-md">
          <SearchInput
            value={search}
            onChange={(e) => handleSearch(e.target.value)}
            onClear={() => handleSearch("")}
            placeholder="Search users by name or email..."
          />
        </div> */}

        <div className="flex items-center gap-2">
          <span className="text-sm text-slate-600">Role:</span>
          <div className="flex gap-2">
            {[
              { value: "all", label: "All" },
              { value: "admin", label: "Admin" },
              { value: "client", label: "Client" },
              { value: "landscaper", label: "Landscaper" },
            ].map((option) => (
              <Button
                key={option.value}
                variant={roleFilter === option.value ? "primary" : "secondary"}
                size="sm"
                onClick={() =>
                  handleRoleFilterChange(option.value as typeof roleFilter)
                }
                className="capitalize"
              >
                {option.label}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
        {isLoading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
        ) : error ? (
          <div className="flex justify-center items-center py-12">
            <p className="text-red-600">
              Error loading users: {(error as any)?.message}
            </p>
          </div>
        ) : (
          <>
            <UsersTable users={users} onViewProfile={handleViewProfile} />

            {totalCount > 0 && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                totalItems={totalCount}
                pageSize={pageSize}
                onPageChange={setCurrentPage}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
};
