/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';

export const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border border-slate-200 shadow-md rounded-lg p-3">
        <p className="text-xs font-semibold text-slate-600 mb-1">{label}</p>
        {payload.map((entry: any, i: number) => (
          <p key={i} className="text-xs" style={{ color: entry.color }}>
            {entry.name}:{' '}
            <span className="font-semibold">
              {typeof entry.value === 'number' && entry.value > 1000
                ? entry.value.toLocaleString()
                : entry.value}
            </span>
          </p>
        ))}
      </div>
    );
  }
  return null;
};