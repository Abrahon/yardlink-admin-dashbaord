import React from "react";
import { ShieldIcon, MonitorIcon, FlagIcon, SaveIcon } from "lucide-react";
import { Toggle } from "@/components/ui/Toggle";
import { Button } from "@/components/ui/Button";
import { Textarea } from "@/components/ui/Textarea";

export interface SecurityTabProps {
  lastLogin: string;
  devices: Array<{
    device: string;
    browser: string;
    os: string;
    lastSeen: string;
    location: string;
  }>;
  ipLog: Array<{ ip: string; location: string; date: string; status: string }>;
  isFlagged: boolean;
  onToggleFlag: (flagged: boolean) => void;
  notes: Array<{ author: string; date: string; note: string }>;
  newNote: string;
  onNoteChange: (value: string) => void;
  onSaveNote: () => void;
}

export const SecurityTab = ({
  lastLogin,
  devices,
  ipLog,
  isFlagged,
  onToggleFlag,
  notes,
  newNote,
  onNoteChange,
  onSaveNote,
}: SecurityTabProps) => {
  return (
    <div className="space-y-6">
      {/* Last Login */}
      <div className="bg-slate-50 rounded-xl p-4">
        <div className="flex items-center gap-2 mb-1">
          <ShieldIcon className="w-4 h-4 text-blue-600" />
          <p className="text-sm font-semibold text-slate-700">Last Login</p>
        </div>
        <p className="text-sm text-slate-600">{lastLogin}</p>
      </div>

      {/* Devices */}
      <div>
        <h4 className="font-semibold text-slate-800 mb-3 flex items-center gap-2">
          <MonitorIcon className="w-4 h-4 text-slate-500" />
          Devices Used
        </h4>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50">
              <tr>
                {["Device", "Browser", "OS", "Last Seen", "Location"].map(
                  (h) => (
                    <th
                      key={h}
                      className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider px-4 py-3"
                    >
                      {h}
                    </th>
                  ),
                )}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {devices.map((d, i) => (
                <tr key={i} className="hover:bg-slate-50">
                  <td className="px-4 py-3 text-sm font-medium text-slate-800">
                    {d.device}
                  </td>
                  <td className="px-4 py-3 text-sm text-slate-600">
                    {d.browser}
                  </td>
                  <td className="px-4 py-3 text-sm text-slate-600">{d.os}</td>
                  <td className="px-4 py-3 text-sm text-slate-500">
                    {d.lastSeen}
                  </td>
                  <td className="px-4 py-3 text-sm text-slate-500">
                    {d.location}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* IP Log */}
      <div>
        <h4 className="font-semibold text-slate-800 mb-3">IP Address Log</h4>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50">
              <tr>
                {["IP Address", "Location", "Date & Time", "Status"].map(
                  (h) => (
                    <th
                      key={h}
                      className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider px-4 py-3"
                    >
                      {h}
                    </th>
                  ),
                )}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {ipLog.map((row, i) => (
                <tr key={i} className="hover:bg-slate-50">
                  <td className="px-4 py-3 text-sm font-mono text-slate-700">
                    {row.ip}
                  </td>
                  <td className="px-4 py-3 text-sm text-slate-600">
                    {row.location}
                  </td>
                  <td className="px-4 py-3 text-sm text-slate-500">
                    {row.date}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                        row.status === "Flagged"
                          ? "bg-red-100 text-red-700"
                          : "bg-green-100 text-green-700"
                      }`}
                    >
                      {row.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Flag Account */}
      <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
        <div className="flex items-center gap-3">
          <FlagIcon
            className={`w-5 h-5 ${isFlagged ? "text-red-500" : "text-slate-400"}`}
          />
          <div>
            <p className="text-sm font-semibold text-slate-800">Flag Account</p>
            <p className="text-xs text-slate-500">
              Mark this account for review
            </p>
          </div>
        </div>
        <Toggle checked={isFlagged} onChange={onToggleFlag} size="sm" />
      </div>

      {/* Admin Notes */}
      <div>
        <h4 className="font-semibold text-slate-800 mb-3">
          Internal Admin Notes
        </h4>
        <p className="text-xs text-slate-400 mb-3">
          These notes are hidden from the user
        </p>
        <div className="space-y-3 mb-4">
          {notes.map((note, i) => (
            <div
              key={i}
              className="bg-amber-50 border border-amber-100 rounded-xl p-4"
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-semibold text-amber-700">
                  {note.author}
                </span>
                <span className="text-xs text-amber-500">{note.date}</span>
              </div>
              <p className="text-sm text-slate-700">{note.note}</p>
            </div>
          ))}
        </div>
        <div className="flex gap-3">
          <Textarea
            value={newNote}
            onChange={(e) => onNoteChange(e.target.value)}
            placeholder="Add an internal note..."
            rows={3}
          />
          <Button
            onClick={onSaveNote}
            icon={<SaveIcon className="w-4 h-4" />}
            className="self-end"
          >
            Save
          </Button>
        </div>
      </div>
    </div>
  );
};
