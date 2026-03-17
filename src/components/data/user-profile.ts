export const userProfile = {
  name: 'James Anderson',
  email: 'james.anderson@email.com',
  address: 'New York, NY 10001',
  plan: 'Pro',
  nextBilling: 'Feb 1, 2025',
  lifetimePaid: '$588.00',
  lastLogin: '2 hours ago from Chrome on MacOS — New York, US',
  memberSince: 'March 2023',
  jobsCompleted: '156 jobs',
  clients: '47 clients',
  rating: 4.8
};

export const billingHistory = [
  { date: 'Jan 1, 2025', description: 'Pro Plan - Monthly', amount: '$49.00', status: 'Paid' },
  { date: 'Dec 1, 2024', description: 'Pro Plan - Monthly', amount: '$49.00', status: 'Paid' },
  { date: 'Nov 1, 2024', description: 'Pro Plan - Monthly', amount: '$49.00', status: 'Paid' },
  { date: 'Oct 1, 2024', description: 'Pro Plan - Monthly', amount: '$49.00', status: 'Paid' },
  { date: 'Sep 1, 2024', description: 'Basic Plan - Monthly', amount: '$19.00', status: 'Paid' },
  { date: 'Aug 1, 2024', description: 'Basic Plan - Monthly', amount: '$19.00', status: 'Paid' }
];

export const activityTimeline = [
  {
    type: 'quote',
    date: 'Jan 14, 2025',
    description: 'Sent quote to Sarah Mitchell for lawn care',
    status: 'Accepted',
    icon: 'BriefcaseIcon'
  },
  {
    type: 'job',
    date: 'Jan 12, 2025',
    description: 'Completed landscaping job for Robert Chen',
    status: 'Completed',
    icon: 'CheckCircleIcon'
  },
  {
    type: 'quote',
    date: 'Jan 10, 2025',
    description: 'Sent quote to Emily Davis for garden design',
    status: 'Pending',
    icon: 'BriefcaseIcon'
  },
  {
    type: 'job',
    date: 'Jan 8, 2025',
    description: 'Completed tree trimming for Wilson residence',
    status: 'Completed',
    icon: 'CheckCircleIcon'
  },
  {
    type: 'message',
    date: 'Jan 6, 2025',
    description: 'Received 5-star review from Amanda Foster',
    status: 'Review',
    icon: 'StarIcon'
  }
];

export const devices = [
  { device: 'MacBook Pro', browser: 'Chrome 120', os: 'macOS 14', lastSeen: '2 hours ago', location: 'New York, US' },
  { device: 'iPhone 15', browser: 'Safari 17', os: 'iOS 17', lastSeen: '1 day ago', location: 'New York, US' },
  { device: 'iPad Air', browser: 'Safari 17', os: 'iPadOS 17', lastSeen: '5 days ago', location: 'New York, US' }
];

export const ipLog = [
  { ip: '192.168.1.1', location: 'New York, US', date: 'Jan 14, 2025 10:32 AM', status: 'Normal' },
  { ip: '192.168.1.1', location: 'New York, US', date: 'Jan 13, 2025 2:15 PM', status: 'Normal' },
  { ip: '10.0.0.45', location: 'New York, US', date: 'Jan 12, 2025 9:00 AM', status: 'Normal' },
  { ip: '203.45.67.89', location: 'Los Angeles, US', date: 'Jan 10, 2025 6:45 PM', status: 'Flagged' }
];

export const adminNotes = [
  { author: 'Admin User', date: 'Jan 10, 2025', note: 'User contacted support about billing issue. Resolved.' },
  { author: 'Manager', date: 'Dec 15, 2024', note: 'Upgraded from Basic to Pro. Verified payment method.' }
];