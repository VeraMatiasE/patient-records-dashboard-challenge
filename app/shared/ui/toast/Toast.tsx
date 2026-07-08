import type { IconName } from "../icons";
import { Icon } from "../icons/Icon";
import type { ToastItem } from "./toast.types";

interface ToastProps {
  toast: ToastItem;
}

const variants: Record<
  ToastItem["type"],
  {
    className: string;
    icon: IconName;
    iconLabel: string;
  }
> = {
  success: {
    className: "bg-success text-white",
    icon: "check",
    iconLabel: "Success",
  },
  error: {
    className: "bg-danger text-white",
    icon: "x",
    iconLabel: "Error",
  },
};

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
        <Icon name={variant.icon} className="w-5 h-5 flex-shrink-0" />
      </span>
      <p className="flex-1 text-sm font-medium">{toast.message}</p>
    </div>
  );
}
