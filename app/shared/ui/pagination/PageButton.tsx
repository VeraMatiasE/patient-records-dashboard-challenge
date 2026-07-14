interface PageButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  active?: boolean;
  disabled?: boolean;
  "aria-label"?: string;
  "aria-current"?: "page" | undefined;
}

export function PageButton({
  onClick,
  children,
  active = false,
  disabled = false,
  ...ariaProps
}: PageButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`w-8 h-8 flex items-center justify-center border rounded-lg text-sm transition-colors ${
        active
          ? "bg-accent border-accent text-white"
          : "bg-surface border-border text-text-secondary hover:border-border-hover cursor-pointer"
      } disabled:opacity-40 disabled:cursor-not-allowed`}
      {...ariaProps}
    >
      {children}
    </button>
  );
}
