import { StarIcon } from "lucide-react";
import { Avatar } from "../ui/Avatar";
import { RoleBadge, PlanBadge, StatusBadge } from "../ui/Badge";
import { Button } from "../ui/Button";
import { Column, Table } from "../ui/Table";

export interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  subscription: string;
  status: string;
  revenue: string;
  rating: number;
  avatar: string;
}

export interface UsersTableProps {
  users: User[];
  onViewProfile: (user: User) => void;
}

export const UsersTable = ({ users, onViewProfile }: UsersTableProps) => {
  const columns: Column<User>[] = [
    {
      key: "name",
      header: "User",
      cell: (user) => (
        <div className="flex items-center gap-3">
          <Avatar name={user.name} size="md" />
          <span className="text-sm font-medium text-slate-800">
            {user.name}
          </span>
        </div>
      ),
    },
    {
      key: "email",
      header: "Email",
      cell: (user) => (
        <span className="text-sm text-slate-500">{user.email}</span>
      ),
    },
    {
      key: "role",
      header: "Role",
      cell: (user) => <RoleBadge role={user.role} />,
    },
    {
      key: "subscription",
      header: "Subscription",
      cell: (user) => <PlanBadge plan={user.subscription} />,
    },
    {
      key: "status",
      header: "Status",
      cell: (user) => <StatusBadge status={user.status} />,
    },
    {
      key: "revenue",
      header: "Revenue",
      cell: (user) => (
        <span className="text-sm font-semibold text-slate-800">
          {user.revenue}
        </span>
      ),
    },
    {
      key: "rating",
      header: "Rating",
      cell: (user) =>
        user.rating > 0 ? (
          <div className="flex items-center gap-1">
            <StarIcon className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
            <span className="text-sm text-slate-700">{user.rating}</span>
          </div>
        ) : (
          <span className="text-sm text-slate-400">—</span>
        ),
    },
    {
      key: "actions",
      header: "Actions",
      cell: (user) => (
        <Button
          size="sm"
          onClick={(e) => {
            e.stopPropagation();
            // This calls the parent's handleViewProfile function
            onViewProfile(user);
          }}
        >
          View Profile
        </Button>
      ),
    },
  ];

  return <Table columns={columns} data={users} onRowClick={onViewProfile} />;
};
