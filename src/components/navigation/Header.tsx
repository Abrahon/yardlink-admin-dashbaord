"use client";
import { useState } from "react";
import { BellIcon, SearchIcon, ChevronDownIcon } from "lucide-react";
import { usePathname } from "next/navigation";
import { getPageFromPath, pageTitles } from "@/config/navigation";

export function Header() {
  const [showNotifications, setShowNotifications] = useState(false);
  const pathname = usePathname();
  const pageKey = getPageFromPath(pathname);
  const { title, subtitle } = pageTitles[pageKey];
  return (
    <header className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between shrink-0 z-10">
      {/* Left: Title */}
      <div>
        <h1 className="text-xl font-semibold text-slate-800">{title}</h1>
        <p className="text-sm text-slate-500 mt-0.5">{subtitle}</p>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-3">
        {/* Search */}
        <button className="flex items-center gap-2 px-3 py-2 text-slate-500 hover:text-slate-700 hover:bg-slate-50 rounded-lg transition-colors">
          <SearchIcon className="w-4 h-4" />
          <span className="text-sm hidden md:block">Search...</span>
        </button>

        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-2 text-slate-500 hover:text-slate-700 hover:bg-slate-50 rounded-lg transition-colors"
          >
            <BellIcon className="w-5 h-5" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
          </button>

          {showNotifications && (
            <div className="absolute right-0 top-full mt-2 w-80 bg-white rounded-xl shadow-lg border border-slate-100 z-50">
              <div className="p-4 border-b border-slate-100">
                <h3 className="font-semibold text-slate-800">Notifications</h3>
              </div>
              <div className="divide-y divide-slate-50">
                <div className="p-4 hover:bg-slate-50 cursor-pointer">
                  <p className="text-sm font-medium text-slate-800">
                    New user registered
                  </p>
                  <p className="text-xs text-slate-500 mt-0.5">
                    John Smith signed up as a Landscaper
                  </p>
                  <p className="text-xs text-slate-400 mt-1">2 minutes ago</p>
                </div>
                <div className="p-4 hover:bg-slate-50 cursor-pointer">
                  <p className="text-sm font-medium text-slate-800">
                    Subscription upgraded
                  </p>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Maria Garcia upgraded to Pro plan
                  </p>
                  <p className="text-xs text-slate-400 mt-1">15 minutes ago</p>
                </div>
                <div className="p-4 hover:bg-slate-50 cursor-pointer">
                  <p className="text-sm font-medium text-slate-800">
                    Payment received
                  </p>
                  <p className="text-xs text-slate-500 mt-0.5">
                    $49.00 from Robert Johnson
                  </p>
                  <p className="text-xs text-slate-400 mt-1">1 hour ago</p>
                </div>
              </div>
              <div className="p-3 border-t border-slate-100 text-center">
                <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                  View all notifications
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Admin Avatar */}
        <div className="flex items-center gap-2 pl-3 border-l border-slate-200 cursor-pointer hover:opacity-80 transition-opacity">
          <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center">
            <span className="text-white text-xs font-bold">AU</span>
          </div>
          <div className="hidden md:block">
            <p className="text-sm font-medium text-slate-800">Admin User</p>
          </div>
          <ChevronDownIcon className="w-4 h-4 text-slate-400" />
        </div>
      </div>
    </header>
  );
}
