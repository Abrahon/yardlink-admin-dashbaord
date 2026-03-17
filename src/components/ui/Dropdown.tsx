import React, { useState, useRef, useEffect } from 'react';
import { ChevronDownIcon, DownloadIcon } from 'lucide-react';
import { Button } from './Button';

export interface DropdownOption {
  value: string;
  label: string;
}

export interface DropdownProps {
  trigger: React.ReactNode;
  options: DropdownOption[];
  value?: string;
  onChange?: (value: string) => void;
  align?: 'left' | 'right';
  width?: string;
}

export const Dropdown = ({
  trigger,
  options,
  value,
  onChange,
  align = 'right',
  width = 'w-40'
}: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <div onClick={() => setIsOpen(!isOpen)}>{trigger}</div>
      {isOpen && (
        <div className={`
          absolute ${align === 'right' ? 'right-0' : 'left-0'} top-full mt-2
          ${width} bg-white rounded-xl shadow-lg border border-slate-100 z-50 overflow-hidden
        `}>
          {options.map((option) => (
            <button
              key={option.value}
              onClick={() => {
                onChange?.(option.value);
                setIsOpen(false);
              }}
              className={`
                w-full text-left px-4 py-2.5 text-sm transition-colors
                ${value === option.value 
                  ? 'bg-blue-50 text-blue-600' 
                  : 'text-slate-700 hover:bg-slate-50'
                }
              `}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

// Export Dropdown
export const ExportDropdown = ({ onExport }: { onExport: (format: string) => void }) => {
//   const [isOpen, setIsOpen] = useState(false);

  return (
    <Dropdown
      trigger={
        <Button variant="secondary" icon={<DownloadIcon className="w-4 h-4" />} iconPosition="left">
          Export
          <ChevronDownIcon className="w-3 h-3" />
        </Button>
      }
      options={[
        { value: 'CSV', label: 'Export as CSV' },
        { value: 'Excel', label: 'Export as Excel' },
        { value: 'PDF', label: 'Export as PDF' }
      ]}
      onChange={onExport}
    />
  );
};