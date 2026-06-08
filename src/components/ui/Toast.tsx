"use client";

import { useEffect, useState } from "react";
import { CheckCircleIcon, XCircleIcon, XIcon } from "lucide-react";

type ToastType = "success" | "error";

interface ToastItem {
  id: number;
  type: ToastType;
  message: string;
}

type Listener = (toasts: ToastItem[]) => void;

let toasts: ToastItem[] = [];
let nextId = 1;
const listeners = new Set<Listener>();

const emit = () => {
  listeners.forEach((l) => l(toasts));
};

const addToast = (type: ToastType, message: string, duration = 3000) => {
  const id = nextId++;
  toasts = [...toasts, { id, type, message }];
  emit();
  setTimeout(() => {
    toasts = toasts.filter((t) => t.id !== id);
    emit();
  }, duration);
};

export const toast = {
  success: (message: string) => addToast("success", message),
  error: (message: string) => addToast("error", message),
};

export const Toaster = () => {
  const [items, setItems] = useState<ToastItem[]>([]);

  useEffect(() => {
    const listener: Listener = (next) => setItems([...next]);
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  }, []);

  const dismiss = (id: number) => {
    toasts = toasts.filter((t) => t.id !== id);
    emit();
  };

  return (
    <div className="fixed top-4 right-4 z-[9999] flex flex-col gap-2">
      {items.map((t) => (
        <div
          key={t.id}
          className="flex items-center gap-2 bg-white border border-slate-200 shadow-lg rounded-lg px-4 py-3 text-sm text-slate-700 min-w-[260px] animate-in slide-in-from-right"
        >
          {t.type === "success" ? (
            <CheckCircleIcon className="w-4 h-4 text-green-500 shrink-0" />
          ) : (
            <XCircleIcon className="w-4 h-4 text-red-500 shrink-0" />
          )}
          <span className="flex-1">{t.message}</span>
          <button
            onClick={() => dismiss(t.id)}
            className="text-slate-400 hover:text-slate-600"
          >
            <XIcon className="w-3.5 h-3.5" />
          </button>
        </div>
      ))}
    </div>
  );
};
