import React, { useRef, useEffect } from "react";
import { MessageBubble } from "./MessageBubble";

interface Message {
  id: number;
  sender: "admin" | "user" | string;
  text: string;
  time: string;
}

export interface MessageThreadProps {
  messages: Message[];
}

export const MessageThread = ({ messages }: MessageThreadProps) => {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex-1 overflow-y-auto p-6 space-y-4 scrollbar-thin">
      {messages.map((msg) => (
        <MessageBubble
          key={msg.id}
          text={msg.text}
          time={msg.time}
          sender={
            msg.sender === "admin" || msg.sender === "user"
              ? msg.sender
              : "user"
          }
        />
      ))}
      <div ref={bottomRef} />
    </div>
  );
};
