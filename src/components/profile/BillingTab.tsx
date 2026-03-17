import React from "react";
import { DownloadIcon } from "lucide-react";

export interface BillingTabProps {
  currentPlan: string;
  nextBilling: string;
  lifetimePaid: string;
  billingHistory: Array<{
    date: string;
    description: string;
    amount: string;
    status: string;
  }>;
}

export const BillingTab = ({
  currentPlan,
  nextBilling,
  lifetimePaid,
  billingHistory,
}: BillingTabProps) => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-blue-50 rounded-xl p-4">
          <p className="text-xs text-slate-500 mb-1">Current Plan</p>
          <p className="text-lg font-bold text-slate-800">{currentPlan} Plan</p>
          <p className="text-sm text-blue-600 font-medium">$49 / month</p>
        </div>
        <div className="bg-slate-50 rounded-xl p-4">
          <p className="text-xs text-slate-500 mb-1">Next Billing</p>
          <p className="text-lg font-bold text-slate-800">{nextBilling}</p>
          <p className="text-sm text-slate-500">Auto-renews monthly</p>
        </div>
        <div className="bg-green-50 rounded-xl p-4">
          <p className="text-xs text-slate-500 mb-1">Lifetime Paid</p>
          <p className="text-lg font-bold text-slate-800">{lifetimePaid}</p>
          <p className="text-sm text-green-600">12 payments</p>
        </div>
      </div>

      <div>
        <h4 className="font-semibold text-slate-800 mb-3">Billing History</h4>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50">
              <tr>
                {["Date", "Description", "Amount", "Status", "Invoice"].map(
                  (h) => (
                    <th
                      key={h}
                      className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider px-4 py-3"
                    >
                      {h}
                    </th>
                  ),
                )}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {billingHistory.map((row, i) => (
                <tr key={i} className="hover:bg-slate-50">
                  <td className="px-4 py-3 text-sm text-slate-600">
                    {row.date}
                  </td>
                  <td className="px-4 py-3 text-sm text-slate-800">
                    {row.description}
                  </td>
                  <td className="px-4 py-3 text-sm font-semibold text-slate-800">
                    {row.amount}
                  </td>
                  <td className="px-4 py-3">
                    <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded-full text-xs font-medium">
                      {row.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <button className="flex items-center gap-1 text-xs text-blue-600 hover:text-blue-700 font-medium">
                      <DownloadIcon className="w-3 h-3" />
                      Download
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
