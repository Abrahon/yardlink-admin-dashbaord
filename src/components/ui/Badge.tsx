import React from 'react';

export type BadgeVariant = 'success' | 'warning' | 'error' | 'info' | 'default' | 'purple' | 'blue' | 'green' | 'orange' | 'red' | 'yellow' | 'slate';

export interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  className?: string;
}

const variantStyles: Record<BadgeVariant, string> = {
  success: 'bg-green-100 text-green-700',
  warning: 'bg-yellow-100 text-yellow-700',
  error: 'bg-red-100 text-red-700',
  info: 'bg-blue-100 text-blue-700',
  default: 'bg-slate-100 text-slate-700',
  purple: 'bg-purple-100 text-purple-700',
  blue: 'bg-blue-100 text-blue-700',
  green: 'bg-green-100 text-green-700',
  orange: 'bg-orange-100 text-orange-700',
  red: 'bg-red-100 text-red-700',
  yellow: 'bg-yellow-100 text-yellow-700',
  slate: 'bg-slate-100 text-slate-700'
};

export const Badge = ({ children, variant = 'default', className = '' }: BadgeProps) => {
  return (
    <span className={`${variantStyles[variant]} px-2 py-0.5 rounded-full text-xs font-medium ${className}`}>
      {children}
    </span>
  );
};

// Specific badge helpers
export const StatusBadge = ({ status }: { status: string }) => {
  const map: Record<string, BadgeVariant> = {
    Active: 'success',
    Completed: 'success',
    Paid: 'success',
    Pending: 'warning',
    Suspended: 'error',
    Expired: 'error',
    Failed: 'error',
    Trial: 'warning',
    Flagged: 'error'
  };
  return <Badge variant={map[status] || 'default'}>{status}</Badge>;
};

export const RoleBadge = ({ role }: { role: string }) => {
  return role === 'Landscaper' 
    ? <Badge variant="blue">Landscaper</Badge>
    : <Badge variant="green">Client</Badge>;
};

export const PlanBadge = ({ plan }: { plan: string }) => {
  const map: Record<string, BadgeVariant> = {
    Pro: 'purple',
    Basic: 'blue',
    None: 'slate'
  };
  return <Badge variant={map[plan] || 'default'}>{plan}</Badge>;
};