"use client";

import React from 'react';
import { Avatar } from '@/components/ui/Avatar';
import { StatusBadge } from '@/components/ui/Badge';
import { useRecentActivities } from '@/api/overview/query';
import { RecentActivityItem } from '@/types/overviewresponse';

export const RecentActivity = () => {
  const { data: recentActivities = [], isLoading, isError } = useRecentActivities();

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-slate-100">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-slate-800">Recent Activity</h3>
        <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">View all</button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-100">
              <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider pb-3">User</th>
              <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider pb-3">Action</th>
              <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider pb-3">Date</th>
              <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider pb-3">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {isLoading && (
              <tr>
                <td colSpan={4} className="py-6 text-center text-sm text-slate-500">
                  Loading recent activity...
                </td>
              </tr>
            )}
            {isError && !isLoading && (
              <tr>
                <td colSpan={4} className="py-6 text-center text-sm text-slate-500">
                  Unable to load recent activity.
                </td>
              </tr>
            )}
            {!isLoading && !isError && recentActivities.length === 0 && (
              <tr>
                <td colSpan={4} className="py-6 text-center text-sm text-slate-500">
                  No recent activity available.
                </td>
              </tr>
            )}
            {!isLoading && !isError && recentActivities.map((row: RecentActivityItem, i) => (
              <tr key={`${row.user_name}-${row.action}-${row.date}-${i}`} className="hover:bg-slate-50 transition-colors">
                <td className="py-3">
                  <div className="flex items-center gap-3">
                    <Avatar name={row.user_name} size="sm" />
                    <span className="text-sm font-medium text-slate-800">{row.user_name}</span>
                  </div>
                </td>
                <td className="py-3 text-sm text-slate-600">{row.action}</td>
                <td className="py-3 text-sm text-slate-500">
                  {new Date(row.date).toLocaleString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                    hour: "numeric",
                    minute: "2-digit",
                  })}
                </td>
                <td className="py-3">
                  <StatusBadge status={row.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};