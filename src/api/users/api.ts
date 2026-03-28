import { axios } from "@/lib/axios";
import { GetUsersParams } from "./query";
import { User } from "@/types/user";
export const fetchUsersByRole = async (
    params: GetUsersParams
) => {
  const { data } = await axios.get("/users-list/", {
    params
  });
  return data;
};

// GET single user by ID
export const fetchUserById = async (id: { id: number }):Promise<User> => {
  const { data } = await axios.get(`/admin/users/${id.id}/`);
  return data;
};
