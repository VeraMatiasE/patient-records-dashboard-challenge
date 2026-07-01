import type { Patient } from "~/features/patients/types/patient";
import { PatientGrid } from "./PatientGrid";
import { EmptyState } from "~/shared/ui/EmptyState";
import { Pagination } from "~/shared/ui/Pagination";
import { SKELETON_COUNT } from "~/shared/constants/skeleton";
import { Grid } from "~/shared/ui/Grid";
import { PatientCardSkeleton } from "./PatientCardSkeleton";

interface PatientListSectionProps {
  patients: Patient[];
  totalCount: number;
  loading: boolean;
  error: string | null;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  onEdit: (patient: Patient) => void;
  isFavorite(id: string): boolean;
  onToggleFavorite(id: string): void;
}

export function PatientListSection({
  patients,
  totalCount,
  loading,
  error,
  currentPage,
  totalPages,
  onPageChange,
  onEdit,
  isFavorite,
  onToggleFavorite,
}: PatientListSectionProps) {
  const isEmpty = !loading && !error && patients.length === 0;

  return (
    <section className="flex flex-1 min-w-0 flex-col p-6">
      <div className="mb-5">
        <h1 className="text-xl font-bold text-text">Patient Records</h1>
        <p className="text-sm text-text-muted mt-1">
          {loading ? "Loading…" : `${totalCount} patients found`}
        </p>
      </div>

      <div>
        {error && !loading && (
          <EmptyState title="Failed to load patients" description={error} />
        )}

        {isEmpty && (
          <EmptyState
            title="No patients found"
            description="Try a different search or filter"
          />
        )}

        {loading && !error && (
          <Grid>
            {Array.from({ length: SKELETON_COUNT }).map((_, i) => (
              <PatientCardSkeleton key={i} />
            ))}
          </Grid>
        )}

        {!loading && !error && (
          <PatientGrid
            patients={patients}
            isFavorite={isFavorite}
            onToggleFavorite={onToggleFavorite}
            onEdit={onEdit}
          />
        )}
      </div>

      {!loading && !error && (
        <div className="mt-6">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={onPageChange}
          />
        </div>
      )}
    </section>
  );
}
