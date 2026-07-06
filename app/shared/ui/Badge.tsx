import type { HTMLAttributes, ReactNode } from "react";

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  children: ReactNode;
  variant?: "neutral" | "primary" | "success" | "danger";
}

const variants = {
  neutral:
    "bg-surface text-text-secondary border border-border transition-all group-hover:text-text group-hover:border-border-hover group-hover:scale-105",
  primary: "bg-accent border text-accent-foreground",
  success: "bg-success text-text-inverse",
  danger: "bg-danger text-text-inverse",
};

export function Badge({
  children,
  variant = "neutral",
  className = "",
  ...props
}: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium
        ${variants[variant]}
        ${className}`}
      {...props}
    >
      {children}
    </span>
  );
}
