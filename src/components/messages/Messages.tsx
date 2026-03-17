"use client";

import  { useState } from "react";
import {
  PenSquareIcon,
  BellIcon,
  ChevronDownIcon,
} from "lucide-react";
import { SplitPane } from "@/components/layout/SplitPane";
import { Button } from "@/components/ui/Button";
import { SearchInput } from "@/components/ui/SearchInput";
import { Dropdown } from "@/components/ui/Dropdown";
import { Toggle } from "@/components/ui/Toggle";
// import { ConversationList } from '@/components/messages/ConversationList';
// import { MessageThread } from '@/components/messages/MessageThread';
// import { MessageInput } from '@/components/messages/MessageInput';
// import { InternalNotes } from '@/components/messages/InternalNotes';
// import { conversations, messageThread, internalNotes, categories, tagColors } from '@/data/messages';
import { Conversation, ConversationList } from "./ConversionList";
import { MessageThread } from "./MessageThread";
import { MessageInput } from "./MessageInput";
import {
  categories,
  conversations,
  internalNotes,
  messageThread,
  tagColors,
} from "../data/message";
import { InternalNotes } from "./InternalNodes";

export const Messages = () => {
  const [activeConv, setActiveConv] = useState<Conversation>(conversations[0]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [messages, setMessages] = useState(messageThread);
  const [selectedTag, setSelectedTag] = useState("Billing");
  const [pushNotif, setPushNotif] = useState(false);
  const [notesOpen, setNotesOpen] = useState(false);
  const [notes, setNotes] = useState(internalNotes);
  const [noteText, setNoteText] = useState("");

  const filteredConvs = conversations.filter((c) => {
    const matchesCategory =
      activeCategory === "All" || c.category === activeCategory;
    const matchesSearch =
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.preview.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleSend = (message: string) => {
    setMessages([
      ...messages,
      {
        id: messages.length + 1,
        sender: "admin",
        text: message,
        time: "Just now",
      },
    ]);
  };

  const handleSaveNote = () => {
    if (noteText.trim()) {
      setNotes([...notes, noteText]);
      setNoteText("");
    }
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
        conversations={filteredConvs}
        activeId={activeConv.id}
        onSelect={setActiveConv}
        tagColors={tagColors}
      />
    </div>
  );

  const rightPanel = (
    <div className="flex flex-col h-full">
      {/* Thread Header */}
      <div className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between shrink-0 ">
        <div className="flex items-center gap-3">
          <div
            className={`w-9 h-9 rounded-full ${activeConv.avatarColor} flex items-center justify-center`}
          >
            <span className="text-white text-xs font-bold">
              {activeConv.avatar}
            </span>
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-800">
              {activeConv.name}
            </p>
            <p className="text-xs text-slate-500">{activeConv.email}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          {/* Tag Dropdown */}
          <Dropdown
            trigger={
              <Button
                variant="secondary"
                size="sm"
                className={tagColors[selectedTag]}
              >
                {selectedTag}
                <ChevronDownIcon className="w-3 h-3" />
              </Button>
            }
            options={["Support", "Quote Inquiry", "Billing", "General"].map(
              (t) => ({ value: t, label: t }),
            )}
            value={selectedTag}
            onChange={setSelectedTag}
          />

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
