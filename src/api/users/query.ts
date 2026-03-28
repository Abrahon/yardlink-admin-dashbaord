import { useQuery } from "@tanstack/react-query";
import { fetchUserById, fetchUsersByRole } from "./api";
import { User } from "@/types/user";

export interface GetUsersParams {
  page?: number;
  role?: "client" | "landscaper" | "admin";
  limit?: number;
}

export const useGetUsers = (params: GetUsersParams) => {
  return useQuery({
    queryKey: ["users", "list", { ...params }], // Include pagination in cache key
    queryFn: () => fetchUsersByRole(params),
    // keepPreviousData: true, // Keeps previous data while fetching new page
    // Optional: Add staleTime to prevent excessive refetching
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

// Query hook for single user by ID
export const useGetUserById = (id: { id: number }) => {
  return useQuery({
    queryKey: ["user", id],
    queryFn: (): Promise<User> => fetchUserById(id),
    enabled: !!id, // Only run if id exists
  });
};
