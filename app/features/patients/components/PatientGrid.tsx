import type { Patient } from "~/features/patients/types/patient";
import { PatientCard } from "./PatientCard/PatientCard";
import { Grid } from "~/shared/ui/Grid";

interface PatientGridProps {
  patients: Patient[];
  isFavorite: (id: string) => boolean;
  onToggleFavorite: (id: string) => void;
  onEdit: (patient: Patient) => void;
}

export function PatientGrid({
  patients,
  isFavorite,
  onToggleFavorite,
  onEdit,
}: PatientGridProps) {
  return (
    <Grid>
      {patients.map((patient) => (
        <PatientCard
          key={patient.id}
          patient={patient}
          isFavorite={isFavorite(patient.id)}
          onToggleFavorite={onToggleFavorite}
          onEdit={onEdit}
        />
      ))}
    </Grid>
  );
}
