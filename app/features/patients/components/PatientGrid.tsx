import type { Patient } from "~/features/patients/types/patient";
import { PatientCard } from "./PatientCard/PatientCard";
import { Grid } from "~/shared/ui/Grid";

interface PatientGridProps {
  patients: Patient[];
  highlightedId: string | null;
  register: (id: string) => (element: HTMLElement | null) => void;
  isFavorite: (id: string) => boolean;
  onToggleFavorite: (id: string) => void;
  onEdit: (patient: Patient) => void;
}

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
      {patients.map((patient) => (
        <div key={patient.id}>
          <PatientCard
            key={patient.id}
            ref={register(patient.id)}
            patient={patient}
            isFavorite={isFavorite(patient.id)}
            highlighted={highlightedId === patient.id}
            onToggleFavorite={onToggleFavorite}
            onEdit={onEdit}
          />
        </div>
      ))}
    </Grid>
  );
}
