import React from 'react';
import { Avatar } from '@/components/ui/Avatar';
import { StatusBadge } from '@/components/ui/Badge';
import { recentActivity } from '../data/overview';

export const RecentActivity = () => {
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
            {recentActivity.map((row, i) => (
              <tr key={i} className="hover:bg-slate-50 transition-colors">
                <td className="py-3">
                  <div className="flex items-center gap-3">
                    <Avatar name={row.user} size="sm" />
                    <span className="text-sm font-medium text-slate-800">{row.user}</span>
                  </div>
                </td>
                <td className="py-3 text-sm text-slate-600">{row.action}</td>
                <td className="py-3 text-sm text-slate-500">{row.date}</td>
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