import { axios } from "@/lib/axios";

export interface AdminUser {
  id: number;
  name?: string;
  email?: string;
  role?: string;
  profile_image?: string;
}

export interface AdminMessageData {
  id: number;
  sender_id?: number;
  sender_name?: string;
  text?: string;
  message?: string;
  body?: string;
  content?: string;
  file_url?: string;
  created_at?: string;
  sent_at?: string;
  timestamp?: string;
  [key: string]: any;
}

export interface AdminConversationItem {
  id?: number;
  thread_id?: number;
  client?: AdminUser;
  landscaper?: AdminUser;
  last_message?: AdminMessageData;
  last_message_preview?: string;
  messages_count?: number;
  tag?: string;
  created_at?: string;
  updated_at?: string;
  unread_count?: number;
  unread?: number;
  category?: string;
  avatar?: string;
  avatar_color?: string;
  receiver_id?: number;
  user_id?: number;
  other_user_id?: number;
  [key: string]: any;
}

export interface AdminMessage {
  id: number;
  sender?: string;
  text?: string;
  time?: string;
  created_at?: string;
  timestamp?: string;
  sent_at?: string;
  is_admin?: boolean;
  [key: string]: any;
}

export interface AdminConversationDetail extends AdminConversationItem {
  messages?: AdminMessageData[];
}

export interface AdminConversationListResponse {
  count?: number;
  results?: AdminConversationItem[];
  [key: string]: any;
}

export const getAdminConversations = async (params: {
  search?: string;
  tag?: string;
}) => {
  const { data } = await axios.get<AdminConversationListResponse>(
    "/admin/conversations/",
    { params }
  );
  
  // Handle various response formats
  let conversations: AdminConversationItem[] = [];
  
  if (Array.isArray(data)) {
    conversations = data;
  } else if (data?.results && Array.isArray(data.results)) {
    conversations = data.results;
  } else if (data?.data && Array.isArray(data.data)) {
    conversations = data.data;
  }
  
  return conversations;
};

export const getAdminConversation = async (
  id: number
): Promise<AdminConversationDetail> => {
  const { data } = await axios.get<AdminConversationDetail>(
    `/admin/conversations/${id}/`
  );
  return data;
};

export const replyToAdminConversation = async (
  id: number,
  body: { text: string; receiver_id: number }
) => {
  const { data } = await axios.post(`/admin/conversations/${id}/reply/`, body);
  return data;
};

export const updateConversationTag = async (
  id: number,
  tag: string
) => {
  const { data } = await axios.post(`/conversations/${id}/tag/`, { tag });
  return data;
};
