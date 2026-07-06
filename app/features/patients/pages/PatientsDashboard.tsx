import { AppHeader } from "~/shared/layout/AppHeader";
import { PatientListSection } from "~/features/patients/components/PatientListSection";
import { usePatients } from "~/features/patients/hooks/usePatients";
import { usePagination } from "~/shared/hooks/usePagination";
import { useMemo, useState } from "react";
import type { Patient } from "../types/patient";
import { PatientModal } from "../components/PatientModal";
import { useToasts } from "~/shared/hooks/useToasts";
import { ToastList } from "~/shared/ui/toast/ToastList";
import type { PatientFormData } from "../schemas/patient.schema";
import { useFavorites } from "../hooks/useFavorites";
import { FavoritesSidebar } from "../components/FavoritesSidebar";
import { usePatientSearch } from "~/features/patients/hooks/usePatientSearch";

type ModalState =
  | { mode: "create" }
  | { mode: "edit"; patient: Patient }
  | null;

export function PatientsDashboard() {
  const { patients, loading, error, addPatient, updatePatient } = usePatients();
  const [modal, setModal] = useState<ModalState>(null);
  const { toasts, showToast } = useToasts();
  const { favoriteIds, isFavorite, toggleFavorite } = useFavorites();

  const {
    search,
    filter,
    filteredPatients,
    totalCount,
    favoriteCount,
    handleSearchChange,
    handleFilterChange,
  } = usePatientSearch({
    patients,
    favoriteIds,
    onSearchChange: () => setPage(1),
    onFilterChange: () => setPage(1),
  });

  const { paged, currentPage, totalPages, setPage } =
    usePagination(filteredPatients);

  function handleSave(data: PatientFormData) {
    if (!modal) return;

    try {
      if (modal.mode === "create") {
        addPatient(data);
        showToast(`'${data.name}' was added successfully`);
      } else {
        updatePatient({
          ...modal.patient,
          ...data,
        });

        showToast(`'${data.name}' was updated successfully`);
      }

      setModal(null);
    } catch {
      showToast("Failed to save patient", {
        type: "error",
      });
    }
  }

  const favoritePatients = useMemo(
    () => patients.filter((p) => favoriteIds.includes(p.id)),
    [patients, favoriteIds],
  );

  return (
    <div className="flex min-h-screen flex-col bg-background font-sans">
      <AppHeader onAddPatient={() => setModal({ mode: "create" })} />

      <div className="flex flex-1 items-start gap-0">
        <PatientListSection
          patients={paged}
          totalCount={totalCount}
          loading={loading}
          error={error}
          favoriteCount={favoriteCount}
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setPage}
          onEdit={(patient) =>
            setModal({
              mode: "edit",
              patient,
            })
          }
          search={search}
          filter={filter}
          onSearchChange={handleSearchChange}
          onFilterChange={handleFilterChange}
          isFavorite={isFavorite}
          onToggleFavorite={toggleFavorite}
        />
        <FavoritesSidebar
          className="hidden lg:block"
          onRemove={toggleFavorite}
          patients={favoritePatients}
        />
      </div>

      {modal !== null && (
        <PatientModal
          open={modal !== null}
          patient={modal.mode === "edit" ? modal.patient : null}
          onClose={() => setModal(null)}
          onSave={handleSave}
        />
      )}

      <ToastList toasts={toasts} />
    </div>
  );
}
