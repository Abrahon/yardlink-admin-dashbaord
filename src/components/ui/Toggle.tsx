export interface ToggleProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  description?: string;
  size?: 'sm' | 'md';
  disabled?: boolean;
}

export const Toggle = ({
  checked,
  onChange,
  label,
  description,
  size = 'md',
  disabled = false
}: ToggleProps) => {
  const sizeClasses = {
    sm: {
      track: 'h-5 w-9',
      thumb: 'h-3 w-3',
      translate: 'translate-x-4'
    },
    md: {
      track: 'h-6 w-11',
      thumb: 'h-4 w-4',
      translate: 'translate-x-6'
    }
  };

  return (
    <div className="flex items-center justify-between">
      {(label || description) && (
        <div>
          {label && <p className="text-sm font-semibold text-slate-700">{label}</p>}
          {description && <p className="text-xs text-slate-500 mt-0.5">{description}</p>}
        </div>
      )}
      <button
        type="button"
        onClick={() => !disabled && onChange(!checked)}
        className={`
          relative inline-flex ${sizeClasses[size].track} items-center rounded-full
          transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
          ${checked ? 'bg-blue-600' : 'bg-slate-300'}
          ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
        `}
        disabled={disabled}
      >
        <span
          className={`
            inline-block transform rounded-full bg-white shadow transition-transform
            ${sizeClasses[size].thumb}
            ${checked ? sizeClasses[size].translate : 'translate-x-1'}
          `}
        />
      </button>
    </div>
  );
};