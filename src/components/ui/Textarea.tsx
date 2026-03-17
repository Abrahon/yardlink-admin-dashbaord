import React from "react";

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

export const Textarea = ({
  label,
  error,
  className = "",
  ...props
}: TextareaProps) => {
  return (
    <div className="space-y-1">
      {label && (
        <label className="text-xs font-medium text-slate-500 block mb-1">
          {label}
        </label>
      )}
      <textarea
        className={`
          w-full border rounded-xl px-4 py-3 text-sm
          focus:outline-none focus:ring-2 focus:ring-blue-500
          ${error ? "border-red-300" : "border-slate-200"}
          resize-none
          ${className}
        `}
        {...props}
      />
      {error && <p className="text-xs text-red-600 mt-1">{error}</p>}
    </div>
  );
};
