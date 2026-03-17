export const auditLogs = [
  {
    admin: 'Admin User',
    action: 'Updated subscription plan',
    target: 'James Anderson',
    date: 'Jan 14, 2025 10:32 AM',
    ip: '192.168.1.1'
  },
  {
    admin: 'Manager',
    action: 'Suspended user account',
    target: 'David Kim',
    date: 'Jan 13, 2025 3:15 PM',
    ip: '192.168.1.2'
  },
  {
    admin: 'Admin User',
    action: 'Issued refund',
    target: 'Emily Thompson',
    date: 'Jan 13, 2025 11:00 AM',
    ip: '192.168.1.1'
  },
  {
    admin: 'Support Staff',
    action: 'Sent message to user',
    target: 'Sarah Mitchell',
    date: 'Jan 12, 2025 2:45 PM',
    ip: '10.0.0.45'
  },
  {
    admin: 'Admin User',
    action: 'Changed user role',
    target: 'Carlos Rivera',
    date: 'Jan 12, 2025 9:20 AM',
    ip: '192.168.1.1'
  },
  {
    admin: 'Manager',
    action: 'Exported user data',
    target: 'All Users',
    date: 'Jan 11, 2025 4:30 PM',
    ip: '192.168.1.2'
  },
  {
    admin: 'Admin User',
    action: 'Updated platform settings',
    target: 'System',
    date: 'Jan 10, 2025 1:15 PM',
    ip: '192.168.1.1'
  },
  {
    admin: 'Support Staff',
    action: 'Reset user password',
    target: 'Michael Brown',
    date: 'Jan 9, 2025 10:00 AM',
    ip: '10.0.0.45'
  }
];

export const permissions = [
  { label: 'View Dashboard', admin: true, manager: true, support: true },
  { label: 'Manage Users', admin: true, manager: true, support: false },
  { label: 'Edit Subscriptions', admin: true, manager: true, support: false },
  { label: 'View Payments', admin: true, manager: true, support: false },
  { label: 'Send Messages', admin: true, manager: true, support: true },
  { label: 'Access Reports', admin: true, manager: true, support: false },
  { label: 'Manage Settings', admin: true, manager: false, support: false },
  { label: 'Delete Users', admin: true, manager: false, support: false }
];

export const initialManagerPerms = permissions.reduce(
  (acc, p) => ({ ...acc, [p.label]: p.manager }),
  {} as Record<string, boolean>
);

export const initialSupportPerms = permissions.reduce(
  (acc, p) => ({ ...acc, [p.label]: p.support }),
  {} as Record<string, boolean>
);