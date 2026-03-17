import React from 'react';

export interface FilterGroupProps {
  label: string;
  children: React.ReactNode;
}

export const FilterGroup = ({ label, children }: FilterGroupProps) => {
  return (
    <div>
      <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">
        {label}
      </p>
      <div className="space-y-2">{children}</div>
    </div>
  );
};