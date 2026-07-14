import { Modal } from "~/shared/ui/Modal";
import type { Patient } from "../types/patient";
import type { PatientFormData } from "../schemas/patient.schema";
import { PatientForm } from "./PatientForm";

interface PatientModalProps {
  open: boolean;
  patient: Patient | null;
  onClose: () => void;
  onSave: (data: PatientFormData) => void;
}

export function PatientModal({
  open,
  patient,
  onClose,
  onSave,
}: PatientModalProps) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      title={patient ? "Edit patient" : "Add patient"}
    >
      <PatientForm
        initialValues={
          patient
            ? {
                name: patient.name,
                description: patient.description,
                website: patient.website,
                avatar: patient.avatar,
              }
            : undefined
        }
        onSubmit={onSave}
        onCancel={onClose}
      />
    </Modal>
  );
}
