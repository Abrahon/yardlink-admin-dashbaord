import React from "react";
import { CheckIcon, LockIcon } from "lucide-react";

export interface PermissionsTableProps {
  permissions: Array<{ label: string; admin: boolean }>;
  managerPerms: Record<string, boolean>;
  supportPerms: Record<string, boolean>;
  onManagerChange: (
    updater: (prev: Record<string, boolean>) => Record<string, boolean>,
  ) => void;
  onSupportChange: (
    updater: (prev: Record<string, boolean>) => Record<string, boolean>,
  ) => void;
}

export const PermissionsTable = ({
  permissions,
  managerPerms,
  supportPerms,
  onManagerChange,
  onSupportChange,
}: PermissionsTableProps) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-slate-100">
            <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider pb-3 pr-4">
              Permission
            </th>
            <th className="text-center text-xs font-semibold text-slate-500 uppercase tracking-wider pb-3 px-3">
              <div className="flex flex-col items-center gap-1">
                <span>Admin</span>
                <LockIcon className="w-3 h-3 text-slate-400" />
              </div>
            </th>
            <th className="text-center text-xs font-semibold text-slate-500 uppercase tracking-wider pb-3 px-3">
              Manager
            </th>
            <th className="text-center text-xs font-semibold text-slate-500 uppercase tracking-wider pb-3 px-3">
              Support
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-50">
          {permissions.map((perm) => (
            <tr key={perm.label} className="hover:bg-slate-50">
              <td className="py-3 pr-4 text-sm text-slate-700">{perm.label}</td>
              <td className="py-3 px-3 text-center">
                <div className="flex justify-center">
                  <div className="w-5 h-5 rounded bg-blue-100 flex items-center justify-center opacity-60 cursor-not-allowed">
                    <CheckIcon className="w-3 h-3 text-blue-600" />
                  </div>
                </div>
              </td>
              <td className="py-3 px-3 text-center">
                <div className="flex justify-center">
                  <button
                    onClick={() =>
                      onManagerChange((prev) => ({
                        ...prev,
                        [perm.label]: !prev[perm.label],
                      }))
                    }
                    className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
                      managerPerms[perm.label]
                        ? "bg-blue-600 border-blue-600"
                        : "border-slate-300 hover:border-blue-400"
                    }`}
                  >
                    {managerPerms[perm.label] && (
                      <CheckIcon className="w-3 h-3 text-white" />
                    )}
                  </button>
                </div>
              </td>
              <td className="py-3 px-3 text-center">
                <div className="flex justify-center">
                  <button
                    onClick={() =>
                      onSupportChange((prev) => ({
                        ...prev,
                        [perm.label]: !prev[perm.label],
                      }))
                    }
                    className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
                      supportPerms[perm.label]
                        ? "bg-blue-600 border-blue-600"
                        : "border-slate-300 hover:border-blue-400"
                    }`}
                  >
                    {supportPerms[perm.label] && (
                      <CheckIcon className="w-3 h-3 text-white" />
                    )}
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
