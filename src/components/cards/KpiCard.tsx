import React from "react";
import { TrendingUpIcon, TrendingDownIcon } from "lucide-react";
import { Tooltip } from "../ui/Tooltip";

export interface KpiCardProps {
  label: string;
  value: string | number;
  trend?: string;
  trendUp?: boolean;
  icon?: React.ElementType;
  iconBg?: string;
  iconColor?: string;
  detail?: string;
  onClick?: () => void;
  tooltip?: string;
}

export const KpiCard = ({
  label,
  value,
  trend,
  trendUp,
  icon: Icon,
  iconBg = "bg-blue-100",
  iconColor = "text-blue-600",
  detail,
  onClick,
  tooltip,
}: KpiCardProps) => {
  const content = (
    <div
      onClick={onClick}
      className={`
        bg-white rounded-xl shadow-sm p-6 border border-slate-100
        ${onClick ? "hover:shadow-md transition-all duration-200 cursor-pointer group" : ""}
      `}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <p className="text-sm text-slate-500 font-medium">{label}</p>
          {tooltip && <Tooltip text={tooltip} />}
        </div>
        {Icon && (
          <div
            className={`w-9 h-9 rounded-full ${iconBg} flex items-center justify-center shrink-0`}
          >
            <Icon className={`w-4 h-4 ${iconColor}`} />
          </div>
        )}
      </div>
      <p className="text-2xl font-bold text-slate-800 mb-2">{value}</p>
      {(trend || detail) && (
        <div className="flex items-center gap-1">
          {trend && (
            <>
              {trendUp ? (
                <TrendingUpIcon className="w-3.5 h-3.5 text-green-500" />
              ) : (
                <TrendingDownIcon className="w-3.5 h-3.5 text-red-500" />
              )}
              <span
                className={`text-xs font-semibold px-1.5 py-0.5 rounded-full ${
                  trendUp
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {trend}
              </span>
            </>
          )}
          {detail && <span className="text-xs text-slate-400">{detail}</span>}
        </div>
      )}
    </div>
  );

  return onClick ? <button className="w-full">{content}</button> : content;
};
