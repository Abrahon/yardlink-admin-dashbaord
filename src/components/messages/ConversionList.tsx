/* eslint-disable @typescript-eslint/no-explicit-any */
import { Avatar } from '../ui/Avatar';

export interface Conversation {
  id: number;
  name: string;
  email: string;
  preview: string;
  time: string;
  unread: number;
  avatar: string;
  profileImage?: string | null;
  category: string;
  avatarColor?: string;
  receiver_id?: number;
  user_id?: number;
  other_user_id?: number;
  tag?: string;
}

export interface ConversationListProps {
  conversations: Conversation[];
  activeId: number;
  onSelect: (conv: Conversation) => void;
}

export const ConversationList = ({
  conversations,
  activeId,
  onSelect,
}: ConversationListProps) => {
  return (
    <div className="flex-1 overflow-y-auto scrollbar-thin">
      {conversations.map((conv, index) => (
        <button
          key={conv.id ?? `conv-${index}`}
          onClick={() => onSelect(conv)}
          className={`
            w-full p-4 text-left border-b border-slate-50 transition-colors
            ${activeId === conv.id ? 'bg-blue-50 border-l-2 border-l-blue-600' : 'hover:bg-slate-50'}
          `}
        >
          <div className="flex items-start gap-3">
            <Avatar name={conv.name} size="md" color={conv.avatarColor} image={conv.profileImage} />
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <span className={`text-sm ${conv.unread > 0 ? 'font-semibold text-slate-800' : 'font-medium text-slate-700'}`}>
                  {conv.name}
                </span>
                <span className="text-xs text-slate-400 shrink-0">{conv.time}</span>
              </div>
              <p className={`text-xs mt-0.5 truncate ${conv.unread > 0 ? 'text-slate-700 font-medium' : 'text-slate-500'}`}>
                {conv.preview}
              </p>
              {conv.unread > 0 && (
                <div className="mt-1">
                  <span className="bg-blue-600 text-white text-xs font-bold px-1.5 py-0.5 rounded-full min-w-4.5 text-center">
                    {conv.unread}
                  </span>
                </div>
              )}
            </div>
          </div>
        </button>
      ))}
    </div>
  );
};