import type { ReactNode } from "react";

interface SegmentedControlProps {
  children: ReactNode;
}

export function SegmentedControl({ children }: SegmentedControlProps) {
  return (
    <div
      className="
        inline-flex
        items-center
        rounded-full
        border
        border-border
        bg-surface
        p-1
      "
      role="tablist"
    >
      {children}
    </div>
  );
}
