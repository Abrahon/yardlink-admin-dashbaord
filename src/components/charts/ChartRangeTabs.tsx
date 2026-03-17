import React from "react";

export type RangeOption = "weekly" | "monthly" | "custom";

export interface ChartRangeTabsProps {
  range: RangeOption;
  setRange: (range: RangeOption) => void;
  showCustom?: boolean;
}

export const ChartRangeTabs = ({
  range,
  setRange,
  showCustom = false,
}: ChartRangeTabsProps) => {
  const options: RangeOption[] = ["weekly", "monthly"];
  if (showCustom) options.push("custom");

  return (
    <div className="flex gap-1">
      {options.map((r) => (
        <button
          key={r}
          onClick={() => setRange(r)}
          className={`
            px-3 py-1 rounded-lg text-xs font-medium transition-colors capitalize
            ${
              range === r
                ? "bg-blue-600 text-white"
                : "text-slate-500 hover:bg-slate-100"
            }
          `}
        >
          {r === "custom" ? "Custom Date" : r}
        </button>
      ))}
    </div>
  );
};
