import type { Patient } from "~/features/patients/types/patient";
import { PatientCard } from "../patient-card/PatientCard";
import { Grid } from "~/shared/ui/grid/Grid";

interface PatientGridProps {
  patients: Patient[];
  highlightedId: string | null;
  register: (id: string) => (element: HTMLElement | null) => void;
  isFavorite: (id: string) => boolean;
  onToggleFavorite: (id: string) => void;
  onEdit: (patient: Patient) => void;
}

const GRID_ITEM_DELAY = 20;
const GRID_MAX_DELAY = 200;

export function PatientGrid({
  patients,
  isFavorite,
  highlightedId,
  register,
  onToggleFavorite,
  onEdit,
}: PatientGridProps) {
  return (
    <Grid>
      {patients.map((patient, index) => {
        const animationDelay = Math.min(
          index * GRID_ITEM_DELAY,
          GRID_MAX_DELAY,
        );

        return (
          <div
            key={patient.id}
            className="animate-grid-enter"
            style={{ animationDelay: `${animationDelay}ms` }}
          >
            <PatientCard
              ref={register(patient.id)}
              patient={patient}
              isFavorite={isFavorite(patient.id)}
              highlighted={highlightedId === patient.id}
              onToggleFavorite={onToggleFavorite}
              onEdit={onEdit}
            />
          </div>
        );
      })}
    </Grid>
  );
}
