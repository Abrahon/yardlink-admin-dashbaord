export const payments = [
  {
    id: 'TXN-001',
    user: 'James Anderson',
    avatar: 'JA',
    type: 'Subscription',
    amount: '$49.00',
    fee: '$0.98',
    date: 'Jan 14, 2025',
    status: 'Completed',
    source: 'Subscription',
    avatarColor: 'bg-blue-500'
  },
  {
    id: 'TXN-002',
    user: 'Sarah Mitchell',
    avatar: 'SM',
    type: 'Service',
    amount: '$120.00',
    fee: '$2.40',
    date: 'Jan 14, 2025',
    status: 'Completed',
    source: 'Service Payment',
    avatarColor: 'bg-green-500'
  },
  {
    id: 'TXN-003',
    user: 'Carlos Rivera',
    avatar: 'CR',
    type: 'Subscription',
    amount: '$49.00',
    fee: '$0.98',
    date: 'Jan 13, 2025',
    status: 'Completed',
    source: 'Subscription',
    avatarColor: 'bg-purple-500'
  },
  {
    id: 'TXN-004',
    user: 'Emily Thompson',
    avatar: 'ET',
    type: 'Refund',
    amount: '-$49.00',
    fee: '$0.00',
    date: 'Jan 13, 2025',
    status: 'Completed',
    source: 'Refund',
    avatarColor: 'bg-orange-500'
  },
  {
    id: 'TXN-005',
    user: 'Michael Brown',
    avatar: 'MB',
    type: 'Service',
    amount: '$85.00',
    fee: '$1.70',
    date: 'Jan 12, 2025',
    status: 'Pending',
    source: 'Service Payment',
    avatarColor: 'bg-teal-500'
  },
  {
    id: 'TXN-006',
    user: 'Jessica Lee',
    avatar: 'JL',
    type: 'Subscription',
    amount: '$19.00',
    fee: '$0.38',
    date: 'Jan 12, 2025',
    status: 'Completed',
    source: 'Subscription',
    avatarColor: 'bg-pink-500'
  },
  {
    id: 'TXN-007',
    user: 'David Kim',
    avatar: 'DK',
    type: 'Service',
    amount: '$200.00',
    fee: '$4.00',
    date: 'Jan 11, 2025',
    status: 'Failed',
    source: 'Service Payment',
    avatarColor: 'bg-indigo-500'
  },
  {
    id: 'TXN-008',
    user: 'Amanda Foster',
    avatar: 'AF',
    type: 'Subscription',
    amount: '$49.00',
    fee: '$0.98',
    date: 'Jan 10, 2025',
    status: 'Completed',
    source: 'Subscription',
    avatarColor: 'bg-rose-500'
  }
];

export const paymentKpis = [
  {
    label: 'Total Transaction Revenue',
    value: '$284,920',
    trend: '+14.2%',
    trendUp: true,
    tooltip: 'Total revenue from all transactions on the platform'
  },
  {
    label: 'Total Platform Fees (2%)',
    value: '$5,698',
    trend: '+14.2%',
    trendUp: true,
    tooltip: 'Platform fee collected at 2% of each transaction'
  },
  {
    label: 'Total Transactions',
    value: '4,847',
    trend: '+8.7%',
    trendUp: true,
    tooltip: 'Total number of transactions processed this period'
  }
];