export const subscriptions = [
  {
    id: 1,
    user: 'James Anderson',
    avatar: 'JA',
    plan: 'Pro',
    status: 'Active',
    start: 'Jan 1, 2025',
    end: 'Feb 1, 2025',
    amount: '$49.00'
  },
  {
    id: 2,
    user: 'Sarah Mitchell',
    avatar: 'SM',
    plan: 'Basic',
    status: 'Active',
    start: 'Dec 15, 2024',
    end: 'Jan 15, 2025',
    amount: '$19.00'
  },
  {
    id: 3,
    user: 'Carlos Rivera',
    avatar: 'CR',
    plan: 'Pro',
    status: 'Active',
    start: 'Nov 1, 2024',
    end: 'Feb 1, 2025',
    amount: '$49.00'
  },
  {
    id: 4,
    user: 'Emily Thompson',
    avatar: 'ET',
    plan: 'Basic',
    status: 'Trial',
    start: 'Jan 10, 2025',
    end: 'Jan 24, 2025',
    amount: '$0.00'
  },
  {
    id: 5,
    user: 'Michael Brown',
    avatar: 'MB',
    plan: 'Basic',
    status: 'Active',
    start: 'Oct 1, 2024',
    end: 'Feb 1, 2025',
    amount: '$19.00'
  },
  {
    id: 6,
    user: 'Jessica Lee',
    avatar: 'JL',
    plan: 'Pro',
    status: 'Expired',
    start: 'Sep 1, 2024',
    end: 'Dec 1, 2024',
    amount: '$49.00'
  },
  {
    id: 7,
    user: 'David Kim',
    avatar: 'DK',
    plan: 'Basic',
    status: 'Expired',
    start: 'Aug 1, 2024',
    end: 'Nov 1, 2024',
    amount: '$19.00'
  },
  {
    id: 8,
    user: 'Amanda Foster',
    avatar: 'AF',
    plan: 'Pro',
    status: 'Active',
    start: 'Jan 5, 2025',
    end: 'Feb 5, 2025',
    amount: '$49.00'
  }
];

export const summaryCards = [
  { label: 'Total Subscriptions', value: '2,891', filter: 'all', color: 'text-blue-600', bg: 'bg-blue-50' },
  { label: 'Pro Plans', value: '1,044', filter: 'Pro', color: 'text-purple-600', bg: 'bg-purple-50' },
  { label: 'Basic Plans', value: '1,847', filter: 'Basic', color: 'text-blue-600', bg: 'bg-blue-50' },
  { label: 'Expired', value: '234', filter: 'Expired', color: 'text-red-600', bg: 'bg-red-50' },
  { label: 'Monthly Revenue', value: '$48,230', filter: 'revenue', color: 'text-green-600', bg: 'bg-green-50' }
];