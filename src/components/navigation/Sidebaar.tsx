"use client";
import { useState } from "react";
import {
  LeafIcon,
  LayoutDashboardIcon,
  BarChart2Icon,
  UsersIcon,
  CreditCardIcon,
  MessageSquareIcon,
  DollarSignIcon,
  SettingsIcon,
  LogOutIcon,
  ChevronRightIcon,
} from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";

const navItems = [
  {
    id: "/overview",
    label: "Overview",
    icon: LayoutDashboardIcon,
  },
  {
    id: "/reports",
    label: "Reports",
    icon: BarChart2Icon,
  },
  {
    id: "/users",
    label: "Users",
    icon: UsersIcon,
  },
  {
    id: "/subscriptions",
    label: "Subscriptions",
    icon: CreditCardIcon,
  },
  {
    id: "/messages",
    label: "Messages",
    icon: MessageSquareIcon,
    badge: 3,
  },
  {
    id: "/payments",
    label: "Payments",
    icon: DollarSignIcon,
  },
  {
    id: "/adminsettings",
    label: "Admin Settings",
    icon: SettingsIcon,
  },
];

export function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const pathname = usePathname();
  return (
    <aside
      className="flex flex-col bg-white border-r border-slate-100 transition-all duration-300"
      style={{
        width: isCollapsed ? "64px" : "240px",
        minWidth: isCollapsed ? "64px" : "240px",
      }}
    >
      {/* Logo */}
      <div className="flex items-center gap-3 px-4 py-5 border-b border-slate-100">
        <div className="flex items-center justify-center w-8 h-8 bg-blue-600 rounded-lg shrink-0">
          <LeafIcon className="w-4 h-4 text-white" />
        </div>
        {!isCollapsed && (
          <span className="text-blue-600 font-bold text-xl tracking-tight">
            YardLink
          </span>
        )}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="ml-auto text-slate-400 hover:text-slate-600 transition-colors"
          aria-label="Toggle sidebar"
        >
          <ChevronRightIcon
            className={`w-4 h-4 transition-transform duration-300 ${isCollapsed ? "" : "rotate-180"}`}
          />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto scrollbar-thin">
        {!isCollapsed && (
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider px-3 mb-3">
            Main Menu
          </p>
        )}
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive =
            pathname === item.id ||
            (item.id === "/users" && pathname === "/userProfile");
          return (
            <Link
              key={item.id}
              href={item.id}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all duration-150 ${isActive ? "bg-blue-50 text-blue-600 font-medium" : "text-slate-600 hover:bg-slate-50 hover:text-slate-800"}`}
              title={isCollapsed ? item.label : undefined}
            >
              <Icon
                className={`w-5 h-5 shrink-0 ${isActive ? "text-blue-600" : "text-slate-500"}`}
              />

              {!isCollapsed && (
                <>
                  <span className="flex-1 text-left">{item.label}</span>
                  {item.badge && (
                    <span className="bg-blue-600 text-white text-xs font-bold px-1.5 py-0.5 rounded-full min-w-5 text-center">
                      {item.badge}
                    </span>
                  )}
                </>
              )}
              {isCollapsed && item.badge && (
                <span className="absolute top-1 right-1 w-2 h-2 bg-blue-600 rounded-full" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Bottom User Section */}
      <div className="border-t border-slate-100 p-3">
        <div
          className={`flex items-center gap-3 px-2 py-2 rounded-lg ${isCollapsed ? "justify-center" : ""}`}
        >
          <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center shrink-0">
            <span className="text-white text-xs font-bold">AU</span>
          </div>
          {!isCollapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-slate-800 truncate">
                Admin User
              </p>
              <p className="text-xs text-slate-500 truncate">
                admin@yardlink.com
              </p>
            </div>
          )}
        </div>
        {!isCollapsed && (
          <button className="w-full flex items-center gap-2 px-3 py-2 mt-1 text-sm text-slate-500 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors">
            <LogOutIcon className="w-4 h-4" />
            <span>Logout</span>
          </button>
        )}
      </div>
    </aside>
  );
}
