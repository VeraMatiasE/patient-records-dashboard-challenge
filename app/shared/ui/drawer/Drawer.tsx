import { Icon } from "~/shared/ui/icons/Icon";

interface DrawerProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export function Drawer({ open, onClose, title, children }: DrawerProps) {
  return (
    <>
      <div
        className={`fixed inset-0 z-40 bg-black/40 transition-opacity duration-300 ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={onClose}
        aria-hidden="true"
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-label={title}
        inert={!open}
        className={`fixed inset-y-0 right-0 z-50 w-72 max-w-[85vw] flex flex-col bg-surface shadow-xl transition-transform duration-300 ease-in-out ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="shrink-0 flex items-center justify-between border-b border-border p-4">
          <p className="flex items-center gap-1 text-xs font-semibold uppercase tracking-wider text-text-muted select-none">
            <Icon
              name="starFilled"
              className="h-3.5 w-3.5"
              aria-hidden="true"
            />
            {title}
          </p>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="text-text-muted hover:text-text transition-colors cursor-pointer"
          >
            <Icon name="x" className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4">{children}</div>
      </div>
    </>
  );
}
