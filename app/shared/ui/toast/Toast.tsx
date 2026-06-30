import type { ToastItem } from "./toast.types";

interface ToastProps {
  toast: ToastItem;
}

const variants = {
  success: {
    className: "bg-success text-white",
    icon: "✓",
    iconLabel: "Success",
  },
  error: {
    className: "bg-danger text-white",
    icon: "✕",
    iconLabel: "Error",
  },
} as const;

export function Toast({ toast }: ToastProps) {
  const variant = variants[toast.type];

  return (
    <div
      role="status"
      aria-live="polite"
      className={`
        min-w-80
        max-w-md
        flex
        items-center
        gap-3
        rounded-[var(--radius-card)]
        px-5
        py-4
        shadow-xl
        ${variant.className}
      `}
    >
      <span aria-hidden="true" className="text-lg font-bold leading-none">
        {variant.icon}
      </span>
      <p className="flex-1 text-sm font-medium">{toast.message}</p>
    </div>
  );
}
