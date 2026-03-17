import React from "react";

export interface Tab {
  id: string;
  label: string;
}

export interface TabsProps {
  tabs: Tab[];
  activeTab: string;
  onChange: (tabId: string) => void;
  variant?: "default" | "underline" | "pills";
}

export const Tabs = ({
  tabs,
  activeTab,
  onChange,
  variant = "default",
}: TabsProps) => {
  const variantClasses = {
    default: "border-b border-slate-100",
    underline: "border-b border-slate-100",
    pills: "bg-slate-100 rounded-lg p-1",
  };

  const tabClasses = {
    default: (isActive: boolean) => `
      px-6 py-3 text-sm font-medium transition-colors
      ${isActive ? "text-blue-600 border-b-2 border-blue-600" : "text-slate-500 hover:text-slate-700"}
    `,
    underline: (isActive: boolean) => `
      px-4 py-2 text-sm font-medium transition-colors
      ${isActive ? "text-blue-600 border-b-2 border-blue-600" : "text-slate-500 hover:text-slate-700"}
    `,
    pills: (isActive: boolean) => `
      px-4 py-2 text-sm font-medium rounded-md transition-colors
      ${isActive ? "bg-white text-slate-800 shadow-sm" : "text-slate-500 hover:text-slate-700"}
    `,
  };

  return (
    <div className={`flex ${variantClasses[variant]}`}>
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onChange(tab.id)}
          className={tabClasses[variant](activeTab === tab.id)}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};
