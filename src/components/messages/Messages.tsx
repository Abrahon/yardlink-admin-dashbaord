"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  PenSquareIcon,
  BellIcon,
  ChevronDownIcon,
} from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";
import { SplitPane } from "@/components/layout/SplitPane";
import { Button } from "@/components/ui/Button";
import { SearchInput } from "@/components/ui/SearchInput";
import { Toggle } from "@/components/ui/Toggle";
import { Conversation, ConversationList } from "./ConversionList";
import { MessageThread } from "./MessageThread";
import { MessageInput } from "./MessageInput";
import { InternalNotes } from "./InternalNodes";
import { categories, internalNotes } from "../data/message";
import {
  useAdminConversation,
  useAdminConversations,
  useReplyConversation,
} from "@/api/messages/query";
import { createSocket } from "@/lib/socket";
import type {
  AdminConversationDetail,
  AdminConversationItem,
  AdminMessage,
} from "@/api/messages/api";

type ConversationItem = Conversation & {
  receiver_id?: number;
  user_id?: number;
  other_user_id?: number;
  tag?: string;
};

const getConversationName = (item: AdminConversationItem): string => {
  // Try nested client/landscaper structure
  if (item.client?.name) return item.client.name;
  if (item.landscaper?.name) return item.landscaper.name;
  
  // Fallback to flat fields
  const possibleNames = [
    item.client_name,
    item.landscaper_name,
    item.user_name,
    item.sender_name,
    item.receiver_name,
    item.name,
    item.email,
    item.customer_name,
    item.provider_name,
  ];

  const found = possibleNames.find(
    (value) => typeof value === "string" && value.trim().length > 0
  );

  return found || `Conversation ${item.id ?? item.thread_id ?? 0}`;
};

const getProfileImage = (item: AdminConversationItem): string | null => {
  if (item.client?.profile_image) return item.client.profile_image;
  if (item.landscaper?.profile_image) return item.landscaper.profile_image;
  return null;
};

const getMessageTime = (lastMessage: any): string => {
  if (!lastMessage) return "";
  return lastMessage.created_at || lastMessage.sent_at || lastMessage.timestamp || "";
};

const getPreviewText = (value: any): string => {
  if (typeof value === "string") return value;
  if (typeof value === "object" && value !== null) {
    return (
      value.text ||
      value.message ||
      value.body ||
      value.preview ||
      ""
    );
  }
  return "";
};

const mapConversation = (item: AdminConversationItem): ConversationItem => {
  const name = getConversationName(item);
  const profileImage = getProfileImage(item);
  
  const preview =
    item.last_message_preview ||
    getPreviewText(item.last_message) ||
    "";

  const time = getMessageTime(item.last_message) || item.updated_at || "";
  const unread = item.unread_count ?? item.unread ?? 0;
  const tag = item.tag || item.category || "General";
  
  const avatar = name
    .split(" ")
    .map((part: string) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return {
    id: item.id ?? item.thread_id ?? 0,
    name,
    email: item.client?.email || item.landscaper?.email || "",
    preview,
    time,
    unread,
    avatar,
    profileImage,
    avatarColor: item.avatar_color || "bg-slate-400",
    category: tag,
    tag,
    receiver_id: item.receiver_id,
    user_id: item.user_id,
    other_user_id: item.other_user_id,
  };
};

const mapMessages = (messages?: any[]): any[] =>
  (messages ?? []).map((message: any) => ({
    id: message.id,
    sender: message.is_admin ? "admin" : "user",
    text:
      message.text ??
      message.message ??
      message.content ??
      message.body ??
      "",
    time:
      message.time ??
      message.sent_at ??
      message.created_at ??
      message.timestamp ??
      "",
  }));

const getReceiverId = (item?: {
  receiver_id?: number;
  user_id?: number;
  other_user_id?: number;
  participants?: Array<{ id: number; role?: string }>;
}) => {
  if (!item) return undefined;
  if (item.receiver_id) return item.receiver_id;
  if (item.user_id) return item.user_id;
  if (item.other_user_id) return item.other_user_id;
  const otherParticipant = item.participants?.find((participant) => participant.role !== "admin");
  return otherParticipant?.id;
};

export const Messages = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [activeConversationId, setActiveConversationId] = useState<number | null>(null);
  const [pushNotif, setPushNotif] = useState(false);
  const [notesOpen, setNotesOpen] = useState(false);
  const [notes, setNotes] = useState(internalNotes);
  const [noteText, setNoteText] = useState("");

  const queryClient = useQueryClient();
  const activeConversationIdRef = useRef<number | null>(null);

  const { data: rawConversations = [] } = useAdminConversations({
    search,
    tag: activeCategory !== "All" ? activeCategory : "",
  });

  const conversations = useMemo(
    () => {
      if (!Array.isArray(rawConversations)) return [];
      return rawConversations.map(mapConversation);
    },
    [rawConversations]
  );

  useEffect(() => {
    if (!activeConversationId && conversations.length > 0) {
      setActiveConversationId(conversations[0].id);
    }
  }, [activeConversationId, conversations]);

  const selectedConversation = useMemo(
    () =>
      conversations.find((conversation: ConversationItem) => conversation.id === activeConversationId) ||
      conversations[0] ||
      null,
    [activeConversationId, conversations]
  );

  const { data: activeConversationDetail } = useAdminConversation(
    activeConversationId ?? undefined
  );

  const messages = useMemo(
    () => mapMessages(activeConversationDetail?.messages),
    [activeConversationDetail?.messages]
  );

  const replyMutation = useReplyConversation();

  useEffect(() => {
    activeConversationIdRef.current = activeConversationId;
  }, [activeConversationId]);

  useEffect(() => {
    const socket = createSocket();
    if (!socket) return;

    const handleNewMessage = (payload: any) => {
      const conversationId =
        payload?.conversation_id ?? payload?.conversation?.id ?? payload?.id;
      const previewText = payload?.text ?? payload?.message ?? payload?.last_message;
      const updatedTime = payload?.time ?? payload?.created_at ?? payload?.updated_at;

      queryClient.invalidateQueries({
        queryKey: ["admin-conversations"],
        exact: false,
      });

      if (conversationId === activeConversationIdRef.current) {
        queryClient.setQueryData(["admin-conversation", conversationId], (old: any) => {
          if (!old) return old;
          const nextMessage = {
            id: payload?.id ?? Date.now(),
            sender: payload?.is_admin ? "admin" : "user",
            text: previewText ?? "",
            time: updatedTime ?? "",
          };

          return {
            ...old,
            messages: [...(old.messages ?? []), nextMessage],
          };
        });
      }

      queryClient.setQueriesData(
        { queryKey: ["admin-conversations"], exact: false },
        (oldData: any) => {
          if (!Array.isArray(oldData)) return oldData;
          return oldData.map((conversation: any) => {
            if (conversation.id !== conversationId) return conversation;
            return {
              ...conversation,
              last_message: previewText ?? conversation.last_message,
              last_message_preview: previewText ?? conversation.last_message_preview,
              last_message_time: updatedTime ?? conversation.last_message_time,
              unread_count:
                conversation.id === activeConversationIdRef.current
                  ? conversation.unread_count
                  : (conversation.unread_count ?? conversation.unread ?? 0) + 1,
            };
          });
        }
      );
    };

    socket.on("new_message", handleNewMessage);

    return () => {
      socket.off("new_message", handleNewMessage);
      socket.disconnect();
    };
  }, [queryClient]);

  const handleSend = (message: string) => {
    if (!activeConversationId) return;

    const receiverId = getReceiverId(activeConversationDetail ?? selectedConversation ?? undefined);
    if (!receiverId) return;

    replyMutation.mutate({
      id: activeConversationId,
      body: {
        text: message,
        receiver_id: receiverId,
      },
    });
  };

  const handleSaveNote = () => {
    if (noteText.trim()) {
      setNotes([...notes, noteText]);
      setNoteText("");
    }
  };

  const handleSelectConversation = (conversation: ConversationItem) => {
    setActiveConversationId(conversation.id);
  };

  const leftPanel = (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b border-slate-100">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold text-slate-800">Messages</h3>
          <Button
            variant="primary"
            size="sm"
            icon={<PenSquareIcon className="w-4 h-4" />}
            className="p-2"
          />
        </div>
        <SearchInput
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onClear={() => setSearch("")}
          placeholder="Search messages..."
        />
      </div>

      {/* Category Filters */}
      <div className="px-4 py-2 border-b border-slate-100 overflow-x-auto">
        <div className="flex gap-1">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                activeCategory === cat
                  ? "bg-blue-600 text-white"
                  : "text-slate-500 hover:bg-slate-100"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Conversation List */}
      <ConversationList
        conversations={conversations}
        activeId={selectedConversation?.id ?? 0}
        onSelect={handleSelectConversation}
      />
    </div>
  );
  

  const rightPanel = (
    <div className="flex flex-col h-full">
      {/* Thread Header */}
      <div className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between shrink-0 ">
        <div className="flex items-center gap-3">
          <div
            className={`w-9 h-9 rounded-full ${selectedConversation?.avatarColor ?? "bg-slate-400"} flex items-center justify-center`}
          >
            <span className="text-white text-xs font-bold">
              {selectedConversation?.avatar ?? "?"}
            </span>
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-800">
              {selectedConversation?.name ?? "Conversation"}
            </p>
            <p className="text-xs text-slate-500">{selectedConversation?.email ?? ""}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          {/* Push Notification Toggle */}
          <div className="flex items-center gap-2">
            <BellIcon
              className={`w-4 h-4 ${pushNotif ? "text-blue-600" : "text-slate-400"}`}
            />
            <Toggle checked={pushNotif} onChange={setPushNotif} size="sm" />
          </div>
        </div>
      </div>

      {/* Messages */}
      <MessageThread messages={messages} />

      {/* Internal Notes */}
      <InternalNotes
        isOpen={notesOpen}
        onToggle={() => setNotesOpen(!notesOpen)}
        notes={notes}
        newNote={noteText}
        onNoteChange={setNoteText}
        onSaveNote={handleSaveNote}
      />

      {/* Message Input */}
      <MessageInput onSend={handleSend} />
    </div>
  );

  return <SplitPane left={leftPanel} right={rightPanel} />;
};
