import { Avatar } from "~/shared/ui/avatar/Avatar";
import { EditButton } from "./EditButton";
import { FavoriteButton } from "./FavoriteButton";
import type { Patient } from "../../types/patient";

interface PatientCardHeaderProps {
  patient: Patient;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
  onEdit: (patient: Patient) => void;
}

export function PatientCardHeader({
  patient,
  isFavorite,
  onToggleFavorite,
  onEdit,
}: PatientCardHeaderProps) {
  return (
    <header className="flex items-start gap-3 p-4">
      <Avatar src={patient.avatar} name={patient.name} size="md" />

      <div className="flex-1 min-w-0">
        <h3 className="font-semibold text-sm text-text truncate">
          {patient.name}
        </h3>
        <p className="text-xs text-text-secondary mt-0.5">ID #{patient.id}</p>
      </div>

      <div className="flex items-center gap-1 flex-shrink-0">
        <FavoriteButton
          isFavorite={isFavorite}
          onClick={() => onToggleFavorite(patient.id)}
        />
        <EditButton onClick={() => onEdit(patient)} />
      </div>
    </header>
  );
}
