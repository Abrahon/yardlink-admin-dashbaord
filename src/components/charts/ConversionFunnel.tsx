interface FunnelStep {
  label: string;
  value: number;
  pct: number;
  color: string;
}

export const ConversionFunnel = ({ steps }: { steps: FunnelStep[] }) => {
  return (
    <div className="space-y-3">
      {steps.map((step, i) => (
        <div key={i}>
          <div className="flex items-center justify-between mb-1">
            <span className="text-sm text-slate-600">{step.label}</span>
            <div className="flex items-center gap-3">
              <span className="text-sm font-bold text-slate-800">
                {step.value.toLocaleString()}
              </span>
              <span className="text-xs text-slate-500 w-12 text-right">
                {step.pct}%
              </span>
            </div>
          </div>
          <div className="h-8 bg-slate-100 rounded-lg overflow-hidden">
            <div
              className={`h-full ${step.color} rounded-lg transition-all duration-500 flex items-center px-3`}
              style={{ width: `${step.pct}%` }}
            >
              <span className="text-white text-xs font-medium truncate">
                {step.pct}%
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
