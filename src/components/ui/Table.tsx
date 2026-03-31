import React from "react";

export interface Column<T> {
  key: keyof T | string;
  header: string;
  cell?: (item: T) => React.ReactNode;
  className?: string;
}

export interface TableProps<T> {
  columns: Column<T>[];
  data: T[];
  onRowClick?: (item: T) => void;
  rowKey?: string;
  className?: string;
}

export const Table = <T,>({
  columns,
  data,
  onRowClick,
  rowKey,
  className = "",
}: TableProps<T>) => {
  return (
    <div className={`overflow-x-auto ${className}`}>
      <table className="w-full">
        <thead className="bg-slate-50 border-b border-slate-100">
          <tr>
            {columns.map((col) => (
              <th
                key={col.key as string}
                className={`text-left text-xs font-semibold text-slate-500 uppercase tracking-wider px-4 py-3 ${col.className || ""}`}
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-50">
          {data.map((item, i) => (
            <tr
              key={String(item[rowKey as keyof T]) || i}
              onClick={() => onRowClick?.(item)}
              className={`hover:bg-slate-50 transition-colors ${
                onRowClick ? "cursor-pointer" : ""
              }`}
            >
              {columns.map((col) => (
                <td
                  key={col.key as string}
                  className={`px-4 py-3 ${col.className || ""}`}
                >
                  {col.cell
                    ? col.cell(item)
                    : (item[col.key as keyof T] as React.ReactNode)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
