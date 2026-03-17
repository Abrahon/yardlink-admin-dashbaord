import React from "react";

export interface SplitPaneProps {
  left: React.ReactNode;
  right: React.ReactNode;
  leftWidth?: number;
  className?: string;
}

export const SplitPane = ({
  left,
  right,
  leftWidth = 320,
  className = "",
}: SplitPaneProps) => {
  return (
    <div
      className={`flex h-full ${className}`}
      style={{ height: "calc(100vh - 73px)" }}
    >
      <div
        className="shrink-0 bg-white border-r border-slate-200"
        style={{ width: leftWidth }}
      >
        {left}
      </div>
      <div className="flex-1 flex flex-col bg-page-bg min-w-0">{right}</div>
    </div>
  );
};
