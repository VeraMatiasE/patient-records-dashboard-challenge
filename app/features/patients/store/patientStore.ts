import { create } from "zustand";
import { persist } from "zustand/middleware";
import { getPatients } from "~/features/patients/api/patientApi";
import type { NewPatient, Patient } from "~/features/patients/types/patient";

interface PatientStore {
  patients: Patient[];
  status: "idle" | "loading" | "success" | "error";
  error: string | null;
  nextId: number;

  loadPatients: () => Promise<void>;
  addPatient: (patient: NewPatient) => void;
  updatePatient: (patient: Patient) => void;
  deletePatient: (id: string) => void;
}

export const usePatientStore = create<PatientStore>()(
  persist(
    (set, get) => ({
      patients: [],
      status: "idle",
      nextId: 1,
      error: null,

      loadPatients: async () => {
        if (get().status !== "idle") return;

        try {
          set({
            status: "loading",
            error: null,
          });

          const patients = await getPatients();

          const maxId = Math.max(
            0,
            ...patients.map((patient) => Number(patient.id)),
          );

          set({
            patients,
            status: "success",
            nextId: maxId + 1,
          });
        } catch (error) {
          set({
            status: "error",
            error: error instanceof Error ? error.message : "Unknown error",
          });
        }
      },

      addPatient: (patient) =>
        set((state) => {
          const newPatient = {
            ...patient,
            id: String(state.nextId),
            createdAt: new Date().toISOString(),
          };

          return {
            patients: [...state.patients, newPatient],
            nextId: state.nextId + 1,
          };
        }),

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
