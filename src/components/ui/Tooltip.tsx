import React, { useState } from 'react';
import { InfoIcon } from 'lucide-react';

export interface TooltipProps {
  text: string;
  children?: React.ReactNode;
  position?: 'top' | 'bottom' | 'left' | 'right';
}

export const Tooltip = ({ text, children, position = 'top' }: TooltipProps) => {
  const [show, setShow] = useState(false);

  const positionClasses = {
    top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
    bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
    left: 'right-full top-1/2 -translate-y-1/2 mr-2',
    right: 'left-full top-1/2 -translate-y-1/2 ml-2'
  };

  return (
    <span className="relative inline-block">
      <span
        onMouseEnter={() => setShow(true)}
        onMouseLeave={() => setShow(false)}
        className="cursor-help"
      >
        {children || <InfoIcon className="w-3.5 h-3.5 text-slate-400 hover:text-slate-600" />}
      </span>
      {show && (
        <span className={`
          absolute ${positionClasses[position]} w-48
          bg-white border border-slate-200 shadow-md rounded-lg p-2
          text-xs text-slate-600 z-50 whitespace-normal
        `}>
          {text}
        </span>
      )}
    </span>
  );
};