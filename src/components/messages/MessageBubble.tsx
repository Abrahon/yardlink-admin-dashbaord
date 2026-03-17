export interface MessageBubbleProps {
  text: string;
  time: string;
  sender: "admin" | "user";
}

export const MessageBubble = ({ text, time, sender }: MessageBubbleProps) => {
  const isAdmin = sender === "admin";

  return (
    <div className={`flex ${isAdmin ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-xs lg:max-w-md ${isAdmin ? "items-end" : "items-start"} flex flex-col`}
      >
        <div
          className={`
            px-4 py-3 rounded-2xl text-sm leading-relaxed
            ${
              isAdmin
                ? "bg-blue-600 text-white rounded-br-sm"
                : "bg-white text-slate-800 shadow-sm border border-slate-100 rounded-bl-sm"
            }
          `}
        >
          {text}
        </div>
        <span className="text-xs text-slate-400 mt-1 px-1">{time}</span>
      </div>
    </div>
  );
};
