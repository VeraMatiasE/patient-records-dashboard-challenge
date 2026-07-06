import { useEffect } from "react";
import type { ReactNode } from "react";
import { IconButton } from "./buttons/IconButton";
import { Icon } from "./icons/Icon";

interface ModalProps {
  open: boolean;
  title?: string;
  onClose: () => void;
  children: ReactNode;
}

export function Modal({ open, title, onClose, children }: ModalProps) {
  useEffect(() => {
    function handleEscape(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }

    if (open) {
      window.addEventListener("keydown", handleEscape);
    }

    return () => window.removeEventListener("keydown", handleEscape);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 bg-black/45 flex items-center justify-center z-50 p-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-surface rounded-[var(--radius-card)] w-full max-w-md max-h-[90vh] w-[95vw] sm:w-full overflow-auto shadow-xl">
        <div className="flex items-center justify-between px-5 py-4 border-b border-border">
          {title ? (
            <h2 className="text-base font-semibold text-text">{title}</h2>
          ) : (
            <span />
          )}

          <IconButton
            icon={<Icon name="x" className="h-4 w-4" />}
            ariaLabel="Close modal"
            onClick={onClose}
            className="w-7 h-7 rounded-lg text-text-muted hover:bg-surface-hover"
          />
        </div>

        <div>{children}</div>
      </div>
    </div>
  );
}
