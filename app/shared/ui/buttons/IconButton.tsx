interface IconButtonProps {
  icon: React.ReactNode;
  ariaLabel: string;
  onClick: () => void;
  className?: string;
  type?: "button" | "submit" | "reset";
}

export function IconButton({
  icon,
  ariaLabel,
  onClick,
  className = "",
  type = "button",
}: IconButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      aria-label={ariaLabel}
      className={`inline-flex items-center justify-center transition-colors cursor-pointer ${className}`}
    >
      {icon}
    </button>
  );
}
