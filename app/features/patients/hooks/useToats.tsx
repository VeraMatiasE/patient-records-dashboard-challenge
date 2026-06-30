import { useState } from "react";
import type { ToastItem, ToastType } from "~/shared/ui/toast/toast.types";

let counter = 0;
const DEFAULT_DURATION = {
  success: 4000,
  error: 6000,
} as const;

interface ToastOptions {
  type?: ToastType;
  duration?: number;
}

export function useToasts() {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  function removeToast(id: number) {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }

  function showToast(
    message: string,
    { type = "success", duration }: ToastOptions = {},
  ) {
    const id = ++counter;

    setToasts((prev) => [...prev, { id, message, type }]);

    const timeout = duration ?? DEFAULT_DURATION[type];

    setTimeout(() => removeToast(id), timeout);
  }

  return {
    toasts,
    showToast,
    removeToast,
  };
}
