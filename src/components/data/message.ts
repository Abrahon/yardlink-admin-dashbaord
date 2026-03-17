export const conversations = [
  {
    id: 1,
    name: 'James Anderson',
    email: 'james.a@email.com',
    preview: 'I need help with my subscription billing...',
    time: '2m ago',
    unread: 2,
    avatar: 'JA',
    category: 'Billing',
    avatarColor: 'bg-blue-500'
  },
  {
    id: 2,
    name: 'Sarah Mitchell',
    email: 'sarah.m@email.com',
    preview: 'Can you send me a quote for the lawn service?',
    time: '15m ago',
    unread: 0,
    avatar: 'SM',
    category: 'Quote Inquiry',
    avatarColor: 'bg-green-500'
  },
  {
    id: 3,
    name: 'Carlos Rivera',
    email: 'carlos.r@email.com',
    preview: 'Thank you for resolving my issue quickly!',
    time: '1h ago',
    unread: 1,
    avatar: 'CR',
    category: 'Support',
    avatarColor: 'bg-purple-500'
  },
  {
    id: 4,
    name: 'Emily Thompson',
    email: 'emily.t@email.com',
    preview: 'How do I upgrade my account to Pro?',
    time: '3h ago',
    unread: 0,
    avatar: 'ET',
    category: 'Support',
    avatarColor: 'bg-orange-500'
  },
  {
    id: 5,
    name: 'Michael Brown',
    email: 'michael.b@email.com',
    preview: 'I have a question about the payment processing...',
    time: '1d ago',
    unread: 0,
    avatar: 'MB',
    category: 'Billing',
    avatarColor: 'bg-teal-500'
  },
  {
    id: 6,
    name: 'Jessica Lee',
    email: 'jessica.l@email.com',
    preview: 'My account seems to be having issues logging in',
    time: '2d ago',
    unread: 0,
    avatar: 'JL',
    category: 'Support',
    avatarColor: 'bg-pink-500'
  }
];

export const messageThread = [
  { id: 1, sender: 'user', text: 'Hi, I need help with my subscription billing. I was charged twice this month.', time: '10:30 AM' },
  { id: 2, sender: 'admin', text: "Hello James! I'm sorry to hear about the double charge. Let me look into your account right away.", time: '10:32 AM' },
  { id: 3, sender: 'user', text: 'Thank you. The charges were on Jan 1st and Jan 3rd, both for $49.', time: '10:33 AM' },
  { id: 4, sender: 'admin', text: "I can see the issue in our system. It appears there was a processing error. I'll initiate a refund for the duplicate charge immediately.", time: '10:35 AM' },
  { id: 5, sender: 'user', text: "That's great! How long will the refund take?", time: '10:36 AM' },
  { id: 6, sender: 'admin', text: "The refund should appear in your account within 3-5 business days. I've also added a note to your account. Is there anything else I can help you with?", time: '10:38 AM' }
];

export const internalNotes = [
  'User has been a customer since March 2023. VIP status.'
];

export const categories = ['All', 'Support', 'Billing', 'Quote Inquiry', 'General'];

export const tagColors: Record<string, string> = {
  Support: 'bg-blue-100 text-blue-700',
  Billing: 'bg-orange-100 text-orange-700',
  'Quote Inquiry': 'bg-green-100 text-green-700',
  General: 'bg-slate-100 text-slate-700'
};