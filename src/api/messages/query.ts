import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getAdminConversations,
  getAdminConversation,
  replyToAdminConversation,
  updateConversationTag,
  AdminConversationDetail,
} from "./api";

export const useAdminConversations = (params: {
  search: string;
  tag: string;
}) => {
  return useQuery({
    queryKey: ["admin-conversations", params.search ?? "", params.tag ?? ""],
    queryFn: async () => {
      const result = await getAdminConversations({
        search: params.search?.trim() || undefined,
        tag: params.tag || undefined,
      });
      // Ensure result is always an array
      return Array.isArray(result) ? result : [];
    },
    staleTime: 1000 * 60,
  });
};

export const useAdminConversation = (id?: number) => {
  return useQuery({
    queryKey: ["admin-conversation", id],
    queryFn: () => getAdminConversation(id!),
    enabled: Boolean(id),
    staleTime: 1000 * 60,
  });
};

export const useReplyConversation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      body,
    }: {
      id: number;
      body: { text: string; receiver_id: number };
    }) => replyToAdminConversation(id, body),
    onMutate: async ({ id, body }) => {
      await queryClient.cancelQueries({
        queryKey: ["admin-conversation", id],
        exact: false,
      });
      await queryClient.cancelQueries({
        queryKey: ["admin-conversations"],
        exact: false,
      });

      const previousDetail = queryClient.getQueryData<AdminConversationDetail>([
        "admin-conversation",
        id,
      ]);

      const optimisticMessage = {
        id: Date.now(),
        sender: "admin",
        text: body.text,
        time: "Just now",
      };

      if (previousDetail) {
        queryClient.setQueryData(["admin-conversation", id], {
          ...previousDetail,
          messages: [...(previousDetail.messages ?? []), optimisticMessage],
        });
      }

      queryClient.setQueriesData(
        { queryKey: ["admin-conversations"], exact: false },
        (oldData: any) => {
          if (!oldData) return oldData;
          return oldData.map((conv: any) => {
            if (conv.id !== id) return conv;
            return {
              ...conv,
              last_message: body.text,
              last_message_preview: body.text,
              last_message_time: "Just now",
            };
          });
        }
      );

      return { previousDetail };
    },
    onError: (_error, variables, context) => {
      if (context?.previousDetail) {
        queryClient.setQueryData(
          ["admin-conversation", variables.id],
          context.previousDetail
        );
      }
    },
    onSettled: (_data, _error, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["admin-conversation", variables.id],
        exact: false,
      });
      queryClient.invalidateQueries({
        queryKey: ["admin-conversations"],
        exact: false,
      });
    },
  });
};

export const useUpdateConversationTag = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, tag }: { id: number; tag: string }) =>
      updateConversationTag(id, tag),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["admin-conversation", variables.id],
        exact: false,
      });
      queryClient.invalidateQueries({
        queryKey: ["admin-conversations"],
        exact: false,
      });
    },
  });
};
