import { Toast } from "./Toast";
import type { ToastItem } from "./toast.types";

interface ToastListProps {
  toasts: ToastItem[];
}

export function ToastList({ toasts }: ToastListProps) {
  if (toasts.length === 0) return null;

  return (
    <div
      aria-live="polite"
      aria-atomic="true"
      className="fixed right-6 bottom-6 z-[100] flex flex-col gap-3 pointer-events-none"
    >
      {toasts.map((t) => (
        <Toast key={t.id} toast={t} />
      ))}
    </div>
  );
}
