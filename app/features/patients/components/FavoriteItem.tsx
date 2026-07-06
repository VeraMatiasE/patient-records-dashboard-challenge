import { Avatar } from "~/shared/ui/Avatar";
import type { Patient } from "~/features/patients/types/patient";
import { IconButton } from "~/shared/ui/buttons/IconButton";
import { Icon } from "~/shared/ui/icons/Icon";

interface FavoriteItemProps {
  patient: Patient;
  onRemove: (id: string) => void;
}

export function FavoriteItem({ patient, onRemove }: FavoriteItemProps) {
  return (
    <li className="flex items-center gap-2 px-1.5 py-1.5 rounded-[var(--radius-button)] hover:bg-surface-hover transition-colors">
      <Avatar src={patient.avatar} name={patient.name} size="sm" />
      <div className="flex-1 min-w-0">
        <p className="text-xs font-medium text-text truncate">{patient.name}</p>
        <p className="text-[10px] text-text-muted">#{patient.id}</p>
      </div>
      <IconButton
        icon={<Icon name="x" className="h-4 w-4" />}
        ariaLabel={`Remove ${patient.name} from favorites`}
        onClick={() => onRemove(patient.id)}
        className="flex-shrink-0 text-text-muted hover:text-danger"
      />
    </li>
  );
}
