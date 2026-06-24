import type { Patient } from "~/features/patients/types/patient";
import { PatientCard } from "./PatientCard";
import { PatientCardSkeleton } from "./PatientCardSkeleton";
import { SKELETON_COUNT } from "~/shared/constants/skeleton";

interface PatientGridProps {
  patients: Patient[];
  loading: boolean;
}

export function PatientGrid({ patients, loading }: PatientGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 items-start">
      {loading
        ? Array.from({ length: SKELETON_COUNT }).map((_, i) => (
            <PatientCardSkeleton key={i} />
          ))
        : patients.map((patient) => (
            <PatientCard
              key={patient.id}
              patient={patient}
              isFavorite={false}
              onToggleFavorite={() => {}}
              onEdit={() => {}}
            />
          ))}
    </div>
  );
}
