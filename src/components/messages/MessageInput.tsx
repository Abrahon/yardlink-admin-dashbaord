import React, { useState } from "react";
import { SendIcon, PaperclipIcon, SmileIcon } from "lucide-react";

export interface MessageInputProps {
  onSend: (message: string) => void;
}

export const MessageInput = ({ onSend }: MessageInputProps) => {
  const [message, setMessage] = useState("");

  const handleSend = () => {
    if (message.trim()) {
      onSend(message);
      setMessage("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="bg-white border-t border-slate-200 px-6 py-4 shrink-0">
      <div className="flex items-end gap-3">
        <div className="flex-1 border border-slate-200 rounded-xl overflow-hidden focus-within:ring-2 focus-within:ring-blue-500">
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type a message... (Enter to send)"
            rows={2}
            className="w-full px-4 py-3 text-sm focus:outline-none resize-none"
          />
          <div className="flex items-center gap-2 px-4 py-2 border-t border-slate-100">
            <button className="text-slate-400 hover:text-slate-600 transition-colors">
              <PaperclipIcon className="w-4 h-4" />
            </button>
            <button className="text-slate-400 hover:text-slate-600 transition-colors">
              <SmileIcon className="w-4 h-4" />
            </button>
          </div>
        </div>
        <button
          onClick={handleSend}
          className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-xl transition-colors shrink-0"
        >
          <SendIcon className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};
