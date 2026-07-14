import { SearchInput } from "~/shared/ui/search-input/SearchInput";
import type { PatientFilter } from "~/features/patients/types/patient";
import { PatientFilterSelector } from "./PatientFilterSelector";

interface SearchToolbarProps {
  search: string;
  filter: PatientFilter;
  totalCount: number;
  favoriteCount: number;
  onSearchChange: (value: string) => void;
  onFilterChange: (filter: PatientFilter) => void;
}

export function SearchToolbar({
  search,
  filter,
  totalCount,
  favoriteCount,
  onSearchChange,
  onFilterChange,
}: SearchToolbarProps) {
  return (
    <div className="flex gap-2 flex-wrap">
      <SearchInput
        value={search}
        placeholder="Search by name, ID or description…"
        onSearch={onSearchChange}
      />

      <PatientFilterSelector
        value={filter}
        totalCount={totalCount}
        favoriteCount={favoriteCount}
        onChange={onFilterChange}
      />
    </div>
  );
}
