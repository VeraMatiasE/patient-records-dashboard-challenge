import type { ReactNode } from "react";

interface SegmentedControlItemProps {
  active: boolean;
  onClick: () => void;
  children: ReactNode;
}

export function SegmentedControlItem({
  active,
  onClick,
  children,
}: SegmentedControlItemProps) {
  return (
    <button
      type="button"
      role="tab"
      aria-selected={active}
      onClick={onClick}
      className={`
        group
        flex
        items-center
        gap-2
        rounded-full
        px-4
        py-1.5
        text-sm
        font-medium
        transition-all
        cursor-pointer

        ${
          active
            ? "bg-accent text-accent-foreground shadow-sm"
            : "text-text-secondary hover:text-text"
        }
      `}
    >
      {children}
    </button>
  );
}
