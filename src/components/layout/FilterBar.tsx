import React from "react";
import { FilterIcon } from "lucide-react";
import { Button } from "../ui/Button";
import { DateRangePicker } from "../ui/DateRangePicker";

export interface FilterBarProps {
  dateRange?: boolean;
  filters?: React.ReactNode;
  search?: React.ReactNode;
  onApplyFilters?: () => void;
}

export const FilterBar = ({
  dateRange,
  filters,
  search,
  onApplyFilters,
}: FilterBarProps) => {
  return (
    <div className="bg-white rounded-xl shadow-sm p-4 border border-slate-100">
      <div className="flex flex-wrap items-center gap-3">
        {dateRange && (
          <DateRangePicker
            fromDate={""}
            toDate={""}
            onFromDateChange={function (date: string): void {
              console.log(date);
              throw new Error("Function not implemented.");
            }}
            onToDateChange={function (date: string): void {
              console.log(date);
              throw new Error("Function not implemented.");
            }}
          />
        )}
        {filters}
        {search}
        {onApplyFilters && (
          <Button
            onClick={onApplyFilters}
            icon={<FilterIcon className="w-4 h-4" />}
          >
            Apply Filters
          </Button>
        )}
      </div>
    </div>
  );
};
