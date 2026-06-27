"use client";
import { useMemo, useState } from "react";
import { BellIcon, SearchIcon, ChevronDownIcon } from "lucide-react";
import { usePathname } from "next/navigation";
import { getPageFromPath, pageTitles } from "@/config/navigation";
import { useAdminNotifications, useMarkNotificationAsRead } from "@/api/notifications/query";

export function Header() {
  const [showNotifications, setShowNotifications] = useState(false);
  const pathname = usePathname();
  const pageKey = getPageFromPath(pathname);
  const { title, subtitle } = pageTitles[pageKey];
  const { data, isLoading } = useAdminNotifications();
  const markAsRead = useMarkNotificationAsRead();

  const notifications = useMemo(() => data?.results ?? [], [data]);
  const unreadCount = useMemo(
    () => notifications.filter((item) => !item.is_read).length,
    [notifications]
  );

  const handleNotificationClick = (id: number) => {
    if (!id) return;
    markAsRead.mutate(id);
  };

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
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 min-w-5 h-5 px-1 flex items-center justify-center rounded-full bg-red-500 text-[10px] font-semibold text-white border-2 border-white">
                {unreadCount > 9 ? "9+" : unreadCount}
              </span>
            )}
          </button>

          {showNotifications && (
            <div className="absolute right-0 top-full mt-2 w-80 bg-white rounded-xl shadow-lg border border-slate-100 z-50">
              <div className="p-4 border-b border-slate-100 flex items-center justify-between">
                <h3 className="font-semibold text-slate-800">Notifications</h3>
                {data?.count ? (
                  <span className="text-xs text-slate-500">{data.count} total</span>
                ) : null}
              </div>
              <div className="max-h-80 overflow-y-auto divide-y divide-slate-50">
                {isLoading ? (
                  <div className="p-4 text-sm text-slate-500">Loading notifications...</div>
                ) : notifications.length === 0 ? (
                  <div className="p-4 text-sm text-slate-500">No notifications yet.</div>
                ) : (
                  notifications.map((notification) => (
                    <div
                      key={notification.id}
                      onClick={() => handleNotificationClick(notification.id)}
                      className={`p-4 hover:bg-slate-50 cursor-pointer ${notification.is_read ? "opacity-70" : "bg-blue-50/40"}`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <p className="text-sm font-medium text-slate-800">
                          {notification.title}
                        </p>
                        {!notification.is_read && (
                          <span className="w-2 h-2 bg-blue-600 rounded-full mt-1.5 shrink-0" />
                        )}
                      </div>
                      <p className="text-xs text-slate-500 mt-0.5">
                        {notification.message}
                      </p>
                      <p className="text-xs text-slate-400 mt-1">
                        {notification.created_at
                          ? new Date(notification.created_at).toLocaleString()
                          : ""}
                      </p>
                    </div>
                  ))
                )}
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
