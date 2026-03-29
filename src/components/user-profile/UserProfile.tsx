"use client";

import React, { useState } from "react";
import {
  ArrowLeftIcon,
  MessageSquareIcon,
  ArrowUpDownIcon,
  KeyIcon,
  BanIcon,
  Trash2Icon,
} from "lucide-react";
import { ProfileHeader } from "@/components/profile/ProfileHeader";
// import { Tabs } from '@/components/ui/Tabs';
import { Button } from "@/components/ui/Button";
import { Tabs } from "../ui/Tabs";
import { adminNotes } from "../data/user-profile";
import { useRouter } from "next/navigation";
import { useGetUserById } from "@/api/users";
import {
  BusinessProfile,
  OverviewTab,
  RecentJobs,
  SecurityTab,
  Subscription,
  SubscriptionCard,
  RecentJob as RecentJobParent,
} from "../profile";
type Tab = "overview" | "subscription" | "recent-jobs" | "security";

export const UserProfile = ({ id }: { id: string }) => {
  const {
    data: userData,
    isLoading,
    error,
  } = useGetUserById({ id: parseInt(id) });
  const role = userData?.role;
  const [activeTab, setActiveTab] = useState<Tab>("overview");
  const [isActive, setIsActive] = useState(true);
  const [isFlagged, setIsFlagged] = useState(false);
  const [newNote, setNewNote] = useState("");
  const [notes, setNotes] = useState(adminNotes);
  const router = useRouter();

  const tabs = [
    { id: "overview", label: "Overview" },
    ...(userData?.role === "landscaper"
      ? [{ id: "subscription", label: "Subscription" }]
      : []),
    ...(userData?.role === "landscaper"
      ? [{ id: "recent-jobs", label: "Recent Jobs" }]
      : []),
    { id: "security", label: "Security" },
  ];

  const handleSaveNote = () => {
    if (newNote.trim()) {
      setNotes([
        { author: "Admin User", date: "Just now", note: newNote },
        ...notes,
      ]);
      setNewNote("");
    }
  };

  const quickActions = (
    <>
      <Button
        variant="outline"
        size="sm"
        icon={<MessageSquareIcon className="w-3.5 h-3.5" />}
      >
        Message
      </Button>
      {/* <Button variant="secondary" size="sm" icon={<ArrowUpDownIcon className="w-3.5 h-3.5" />}>
        Upgrade/Downgrade
      </Button>
      <Button variant="secondary" size="sm" icon={<KeyIcon className="w-3.5 h-3.5" />}>
        Reset Password
      </Button> */}
      <Button
        variant="secondary"
        size="sm"
        icon={<BanIcon className="w-3.5 h-3.5" />}
      >
        Suspend
      </Button>
      <Button
        variant="danger"
        size="sm"
        icon={<Trash2Icon className="w-3.5 h-3.5" />}
      >
        Delete
      </Button>
    </>
  );

  return (
    <div className="p-6 space-y-6">
      {/* Back Button */}
      <button
        onClick={() => router.push("/users")}
        className="flex items-center gap-2 text-sm text-slate-500 hover:text-slate-800 transition-colors"
      >
        <ArrowLeftIcon className="w-4 h-4" />
        Back to Users
      </button>

      {/* Profile Header */}
      <ProfileHeader
        name={userData?.name || "User Name"}
        email={userData?.email || "user@example.com"}
        address={userData?.address || "123 Main St, City, State"}
        plan={
          role === "landscaper" ? userData?.subscription?.plan?.name : undefined
        }
        isActive={isActive}
        onToggleStatus={setIsActive}
        actions={quickActions}
      />

      {/* Tabs */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
        <Tabs
          tabs={tabs}
          activeTab={activeTab}
          onChange={(id) => setActiveTab(id as Tab)}
        />

        <div className="p-6">
          {activeTab === "overview" && (
            <OverviewTab
              profile={userData != undefined ? userData : undefined}
            />
          )}
          {userData?.role === "landscaper" && activeTab === "subscription" && (
            <SubscriptionCard
              subscription={userData.subscription as Subscription}
              businessProfile={userData.business_profile as BusinessProfile}
            />
          )}
          {userData?.role === "landscaper" && activeTab === "recent-jobs" && (
            <RecentJobs
              recentJobs={(userData?.recent_jobs as RecentJobParent[]) || []}
            />
          )}
          {activeTab === "security" && (
            <SecurityTab
              lastLogin={userData?.last_login || ""}
              loginActivity={userData?.login_activity || []}
              isFlagged={isFlagged}
              onToggleFlag={setIsFlagged}
              notes={notes}
              newNote={newNote}
              onNoteChange={setNewNote}
              onSaveNote={handleSaveNote}
            />
          )}
        </div>
      </div>
    </div>
  );
};
