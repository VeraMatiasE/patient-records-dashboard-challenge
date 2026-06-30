import { AppHeader } from "~/shared/layout/AppHeader";
import { PatientListSection } from "~/features/patients/components/PatientListSection";
import { usePatients } from "~/features/patients/hooks/usePatients";
import { usePagination } from "~/features/patients/hooks/usePagination";
import { useState } from "react";
import type { NewPatient, Patient } from "../types/patient";
import { PatientModal } from "../components/PatientModal";
import { useToasts } from "../hooks/useToats";
import { ToastList } from "~/shared/ui/toast/ToastList";
import type { PatientFormData } from "../schemas/patient.schema";

type ModalState =
  | { mode: "create" }
  | { mode: "edit"; patient: Patient }
  | null;

export function PatientsDashboard() {
  const { patients, loading, error, addPatient, updatePatient } = usePatients();
  const { paged, currentPage, totalPages, setPage } = usePagination(patients);
  const [modal, setModal] = useState<ModalState>(null);
  const { toasts, showToast } = useToasts();

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

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <AppHeader onAddPatient={() => setModal({ mode: "create" })} />

      <div className="flex flex-1 overflow-hidden">
        <PatientListSection
          patients={paged}
          totalCount={patients.length}
          loading={loading}
          error={error}
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setPage}
          onEdit={(patient) =>
            setModal({
              mode: "edit",
              patient,
            })
          }
        />
      </div>

      {modal !== null && (
        <PatientModal
          open={!!modal}
          patient={modal.mode === "edit" ? modal.patient : null}
          onClose={() => setModal(null)}
          onSave={handleSave}
        />
      )}

      <ToastList toasts={toasts} />
    </div>
  );
}
