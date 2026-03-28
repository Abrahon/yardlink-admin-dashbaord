import React from "react";
import { Avatar } from "../ui/Avatar";
import { Toggle } from "../ui/Toggle";
import { Badge } from "../ui/Badge";

export interface ProfileHeaderProps {
  name: string;
  email: string;
  address: string;
  plan?: string;
  isActive: boolean;
  onToggleStatus: (active: boolean) => void;
  actions?: React.ReactNode;
}

export const ProfileHeader = ({
  name,
  email,
  address,
  plan,
  isActive,
  onToggleStatus,
  actions,
}: ProfileHeaderProps) => {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-slate-100">
      <div className="flex flex-wrap items-start gap-6">
        <div className="flex items-start gap-4">
          <Avatar name={name} size="lg" />
          <div>
            <h2 className="text-xl font-bold text-slate-800">{name}</h2>
            <p className="text-slate-500 text-sm mt-0.5">{email}</p>
            <p className="text-slate-400 text-sm mt-0.5">{address}</p>
            <div className="flex items-center gap-2 mt-2">
              {plan && <Badge variant="purple">{plan} Plan</Badge>}
              <Badge variant={isActive ? "success" : "error"}>
                {isActive ? "Active" : "Suspended"}
              </Badge>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 ml-0 lg:ml-auto">
          <span className="text-sm text-slate-600">Status:</span>
          <Toggle checked={isActive} onChange={onToggleStatus} size="sm" />
          <span className="text-sm font-medium text-slate-700">
            {isActive ? "Active" : "Suspended"}
          </span>
        </div>
      </div>

      {actions && (
        <div className="flex flex-wrap gap-2 mt-6 pt-6 border-t border-slate-100">
          {actions}
        </div>
      )}
    </div>
  );
};
