import { AppHeader } from "~/shared/layout/AppHeader";
import { PatientListSection } from "~/features/patients/components/patients/PatientListSection";
import { usePatients } from "~/features/patients/hooks/usePatients";
import { usePagination } from "~/features/patients/hooks/usePagination";

export function PatientsDashboard() {
  const { patients, loading, error } = usePatients();
  const { paged, currentPage, totalPages, setPage } = usePagination(patients);

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <AppHeader onAddPatient={() => {}} />

      <div className="flex flex-1 overflow-hidden">
        <PatientListSection
          patients={paged}
          totalCount={patients.length}
          loading={loading}
          error={error}
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setPage}
        />
      </div>
    </div>
  );
}
