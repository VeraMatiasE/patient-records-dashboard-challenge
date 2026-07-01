import { EmptyState } from "~/shared/ui/EmptyState";
import type { Patient } from "../types/patient";
import { FavoriteItem } from "./FavoriteItem";

interface FavoritesSidebarProps {
  className?: string;
  patients: Patient[];
  onRemove: (id: string) => void;
}

export function FavoritesSidebar({
  className,
  patients,
  onRemove,
}: FavoritesSidebarProps) {
  return (
    <aside
      className={`w-56 self-stretch border-l border-border bg-surface ${className ?? ""}`}
    >
      <div className="sticky top-6 flex max-h-[calc(100vh-3rem)] flex-col">
        <div className="shrink-0 border-b border-border p-4">
          <p className="text-xs font-semibold uppercase tracking-wider text-text-muted">
            ★ Favorites
          </p>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          {patients.length === 0 ? (
            <EmptyState
              compact
              title="No favorites yet"
              description="Star a card to pin it here"
            />
          ) : (
            <ul className="space-y-0.5">
              {patients.map((p) => (
                <FavoriteItem key={p.id} patient={p} onRemove={onRemove} />
              ))}
            </ul>
          )}
        </div>
      </div>
    </aside>
  );
}
