/* eslint-disable @typescript-eslint/no-explicit-any */
import { Avatar } from '../ui/Avatar';
import { Badge } from '../ui/Badge';

export interface Conversation {
  id: number;
  name: string;
  email: string;
  preview: string;
  time: string;
  unread: number;
  avatar: string;
  category: string;
  avatarColor?: string;
}

export interface ConversationListProps {
  conversations: Conversation[];
  activeId: number;
  onSelect: (conv: Conversation) => void;
  tagColors: Record<string, string>;
}

export const ConversationList = ({
  conversations,
  activeId,
  onSelect,
  tagColors
}: ConversationListProps) => {
  return (
    <div className="flex-1 overflow-y-auto scrollbar-thin">
      {conversations.map((conv) => (
        <button
          key={conv.id}
          onClick={() => onSelect(conv)}
          className={`
            w-full p-4 text-left border-b border-slate-50 transition-colors
            ${activeId === conv.id ? 'bg-blue-50 border-l-2 border-l-blue-600' : 'hover:bg-slate-50'}
          `}
        >
          <div className="flex items-start gap-3">
            <Avatar name={conv.name} size="md" color={conv.avatarColor} />
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
              <div className="flex items-center justify-between mt-1">
                <Badge variant={tagColors[conv.category] as any || 'default'}>
                  {conv.category}
                </Badge>
                {conv.unread > 0 && (
                  <span className="bg-blue-600 text-white text-xs font-bold px-1.5 py-0.5 rounded-full min-w-4.5 text-center">
                    {conv.unread}
                  </span>
                )}
              </div>
            </div>
          </div>
        </button>
      ))}
    </div>
  );
};