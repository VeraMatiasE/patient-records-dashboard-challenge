import { useMemo, useState } from "react";
import type { Patient, PatientFilter } from "~/features/patients/types/patient";

interface UsePatientSearchProps {
  patients: Patient[];
  favoriteIds: string[];
  onSearchChange?: () => void;
  onFilterChange?: () => void;
}

export function usePatientSearch({
  patients,
  favoriteIds,
  onSearchChange,
  onFilterChange,
}: UsePatientSearchProps) {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<PatientFilter>("all");

  const favoriteSet = useMemo(() => new Set(favoriteIds), [favoriteIds]);

  const matchingPatients = useMemo(() => {
    const query = search.trim().toLowerCase();

    return patients.filter((patient) => {
      return (
        query === "" ||
        patient.name.toLowerCase().includes(query) ||
        patient.id.toLowerCase().includes(query) ||
        patient.description.toLowerCase().includes(query)
      );
    });
  }, [patients, search]);

  const totalCount = matchingPatients.length;

  const { filteredPatients, favoriteCount } = useMemo(() => {
    let favoriteCount = 0;
    const filteredPatients: Patient[] = [];

    for (const patient of matchingPatients) {
      const isFavorite = favoriteSet.has(patient.id);

      if (isFavorite) {
        favoriteCount++;
      }

      if (filter === "all" || isFavorite) {
        filteredPatients.push(patient);
      }
    }
    return {
      filteredPatients,
      favoriteCount,
    };
  }, [matchingPatients, filter, favoriteSet]);

  function handleSearchChange(value: string) {
    onSearchChange?.();
    setSearch(value);
  }

  function handleFilterChange(filter: PatientFilter) {
    setFilter(filter);
    onFilterChange?.();
  }

  return {
    search,
    filter,
    filteredPatients,
    totalCount,
    favoriteCount,
    handleSearchChange,
    handleFilterChange,
  };
}
