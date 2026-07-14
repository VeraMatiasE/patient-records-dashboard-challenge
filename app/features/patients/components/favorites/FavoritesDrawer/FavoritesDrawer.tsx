import type { Patient } from "~/features/patients/types/patient";
import { Drawer } from "~/shared/ui/drawer/Drawer";
import { FavoritesList } from "../FavoritesList/FavoritesList";

interface FavoritesDrawerProps {
  open: boolean;
  onClose: () => void;
  patients: Patient[];
  onRemove: (id: string) => void;
  onSelect: (id: string) => void;
}

export function FavoritesDrawer({
  open,
  onClose,
  patients,
  onRemove,
  onSelect,
}: FavoritesDrawerProps) {
  return (
    <Drawer open={open} onClose={onClose} title="Favorites">
      <FavoritesList
        patients={patients}
        onRemove={onRemove}
        onSelect={(id) => {
          onSelect(id);
          onClose();
        }}
      />
    </Drawer>
  );
}
