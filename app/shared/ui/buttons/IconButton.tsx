import type { ButtonHTMLAttributes } from "react";

type IconButtonSize = "sm" | "md" | "lg";

interface IconButtonProps extends Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  "children"
> {
  icon: React.ReactNode;
  ariaLabel: string;
  size?: IconButtonSize;
  onClick: () => void;
  className?: string;
  type?: "button" | "submit" | "reset";
}

const sizeStyles: Record<IconButtonSize, string> = {
  sm: "w-7 h-7",
  md: "w-8 h-8",
  lg: "w-10 h-10",
};

export function IconButton({
  icon,
  ariaLabel,
  onClick,
  type = "button",
  size = "md",
  className = "",
  disabled,
  ...props
}: IconButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      aria-label={ariaLabel}
      disabled={disabled}
      className={[
        "inline-flex items-center justify-center rounded-lg transition-colors",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50",
        "hover:bg-surface-hover",
        "disabled:opacity-50 disabled:pointer-events-none cursor-pointer",
        "active:scale-90 transition-transform",
        sizeStyles[size],
        className,
      ].join(" ")}
      {...props}
    >
      {icon}
    </button>
  );
}
