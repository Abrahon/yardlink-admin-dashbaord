export type Page =
  | "overview"
  | "reports"
  | "users"
  | "userProfile"
  | "subscriptions"
  | "messages"
  | "payments"
  | "adminSettings";

export const pageTitles: Record<Page, { title: string; subtitle: string }> = {
  overview: { title: "Overview", subtitle: "Welcome back, Admin" },
  reports: {
    title: "Reports & Analytics",
    subtitle: "Detailed platform insights",
  },
  users: { title: "Users", subtitle: "Manage all platform users" },
  userProfile: { title: "User Profile", subtitle: "Detailed user information" },
  subscriptions: {
    title: "Subscriptions",
    subtitle: "Manage subscription plans",
  },
  messages: { title: "Messages", subtitle: "Platform communications" },
  payments: { title: "Payments", subtitle: "Transaction history & revenue" },
  adminSettings: {
    title: "Admin Settings",
    subtitle: "System configuration & security",
  },
};

// Helper to map URL path to Page key
export const getPageFromPath = (path: string): Page => {
  if (path.includes("/reports")) return "reports";
  if (path.includes("/users/profile")) return "userProfile";
  if (path.includes("/users")) return "users";
  if (path.includes("/subscriptions")) return "subscriptions";
  if (path.includes("/messages")) return "messages";
  if (path.includes("/payments")) return "payments";
  if (path.includes("/settings")) return "adminSettings";
  return "overview";
};
