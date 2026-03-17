import React, { useEffect } from 'react';
import { XIcon } from 'lucide-react';

export interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  position?: 'left' | 'right';
  size?: 'sm' | 'md' | 'lg';
}

const sizeClasses = {
  sm: 'w-80',
  md: 'w-96',
  lg: 'w-[480px]'
};

export const Drawer = ({
  isOpen,
  onClose,
  title,
  children,
  footer,
  position = 'right',
  size = 'md'
}: DrawerProps) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black/30 z-40 drawer-overlay" onClick={onClose} />
      <div className={`
        fixed ${position === 'right' ? 'right-0' : 'left-0'} top-0 h-full
        ${sizeClasses[size]} bg-white shadow-2xl z-50 flex flex-col drawer-panel
      `}>
        <div className="flex items-center justify-between p-6 border-b border-slate-100">
          <div>
            <h3 className="font-semibold text-slate-800">{title}</h3>
            <p className="text-sm text-slate-500 mt-0.5">Detailed view</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
            <XIcon className="w-5 h-5 text-slate-500" />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-6">{children}</div>
        {footer && <div className="p-6 border-t border-slate-100">{footer}</div>}
      </div>
    </>
  );
};