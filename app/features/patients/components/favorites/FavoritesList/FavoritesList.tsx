import { EmptyState } from "~/shared/ui/empty-state/EmptyState";
import type { Patient } from "~/features/patients/types/patient";
import { FavoriteItem } from "../FavoriteItem/FavoriteItem";

interface FavoritesListProps {
  patients: Patient[];
  onRemove: (id: string) => void;
  onSelect: (id: string) => void;
}

export function FavoritesList({
  patients,
  onRemove,
  onSelect,
}: FavoritesListProps) {
  if (patients.length === 0) {
    return (
      <EmptyState
        compact
        title="No favorites yet"
        description="Star a card to pin it here"
      />
    );
  }

  return (
    <ul className="space-y-0.5">
      {patients.map((p) => (
        <FavoriteItem
          key={p.id}
          patient={p}
          onRemove={onRemove}
          onClick={() => onSelect(p.id)}
        />
      ))}
    </ul>
  );
}
