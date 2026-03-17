import React from 'react';

export interface InfoCardProps {
  label: string;
  value: string;
  extra?: React.ReactNode;
  bgColor?: string;
}

export const InfoCard = ({ label, value, extra, bgColor = 'bg-slate-50' }: InfoCardProps) => {
  return (
    <div className={`${bgColor} rounded-xl p-4`}>
      <p className="text-xs text-slate-500 font-medium mb-1">{label}</p>
      <p className="text-sm font-semibold text-slate-800">{value}</p>
      {extra && <div className="mt-1">{extra}</div>}
    </div>
  );
};