import { useEffect } from "react";

import { usePatientStore } from "~/features/patients/store/patientStore";

export function usePatients() {
  const { patients, status, error, loadPatients, addPatient, updatePatient } =
    usePatientStore();

  useEffect(() => {
    loadPatients();
  }, [loadPatients]);

  return {
    patients,
    loading: status === "loading" || status === "idle",
    error,
    addPatient,
    updatePatient,
  };
}
