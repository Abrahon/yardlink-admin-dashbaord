import React from "react";
import { StickyNoteIcon, ChevronDownIcon } from "lucide-react";

export interface InternalNotesProps {
  isOpen: boolean;
  onToggle: () => void;
  notes: string[];
  newNote: string;
  onNoteChange: (value: string) => void;
  onSaveNote: () => void;
}

export const InternalNotes = ({
  isOpen,
  onToggle,
  notes,
  newNote,
  onNoteChange,
  onSaveNote,
}: InternalNotesProps) => {
  return (
    <div className="bg-white border-t border-slate-200">
      <button
        onClick={onToggle}
        className="w-full flex items-center gap-2 px-6 py-3 text-sm font-medium text-amber-700 hover:bg-amber-50 transition-colors border-b border-slate-100"
      >
        <StickyNoteIcon className="w-4 h-4" />
        Internal Notes (hidden from user)
        <ChevronDownIcon
          className={`w-4 h-4 ml-auto transition-transform ${isOpen ? "rotate-180" : ""}`}
        />
      </button>
      {isOpen && (
        <div className="bg-amber-50 px-6 py-4 space-y-3">
          {notes.map((note, i) => (
            <div
              key={i}
              className="bg-amber-100 rounded-lg px-3 py-2 text-sm text-amber-800"
            >
              {note}
            </div>
          ))}
          <div className="flex gap-2">
            <input
              type="text"
              value={newNote}
              onChange={(e) => onNoteChange(e.target.value)}
              placeholder="Add internal note..."
              className="flex-1 border border-amber-200 bg-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
            />
            <button
              onClick={onSaveNote}
              className="bg-amber-500 hover:bg-amber-600 text-white px-3 py-2 rounded-lg text-sm font-medium transition-colors"
            >
              Save
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
