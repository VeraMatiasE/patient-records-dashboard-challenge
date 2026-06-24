import { create } from "zustand";
import { persist } from "zustand/middleware";
import { getPatients } from "~/features/patients/api/patientApi";
import type { Patient } from "~/features/patients/types/patient";

interface PatientStore {
  patients: Patient[];
  status: "idle" | "loading" | "success" | "error";
  error: string | null;

  loadPatients: () => Promise<void>;
  addPatient: (patient: Patient) => void;
  updatePatient: (patient: Patient) => void;
  deletePatient: (id: string) => void;
}

export const usePatientStore = create<PatientStore>()(
  persist(
    (set, get) => ({
      patients: [],
      status: "idle",
      error: null,

      loadPatients: async () => {
        if (get().status !== "idle") return;

        try {
          set({
            status: "loading",
            error: null,
          });

          const patients = await getPatients();

          set({
            patients,
            status: "success",
          });
        } catch (error) {
          set({
            status: "error",
            error: error instanceof Error ? error.message : "Unknown error",
          });
        }
      },

      addPatient: (patient) =>
        set((state) => ({
          patients: [...state.patients, patient],
        })),

      updatePatient: (updatedPatient) =>
        set((state) => ({
          patients: state.patients.map((patient) =>
            patient.id === updatedPatient.id ? updatedPatient : patient,
          ),
        })),

      deletePatient: (id) =>
        set((state) => ({
          patients: state.patients.filter((patient) => patient.id !== id),
        })),
    }),
    {
      name: "patients-storage",
    },
  ),
);
