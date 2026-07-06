import { act, renderHook } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { usePatientSearch } from "./usePatientSearch";
import type { Patient } from "~/features/patients/types/patient";

const patients: Patient[] = [
  {
    id: "1",
    name: "John Doe",
    description: "Cardiologist",
    avatar: "",
    website: "",
    createdAt: "",
  },
  {
    id: "2",
    name: "Jane Smith",
    description: "Neurologist",
    avatar: "",
    website: "",
    createdAt: "",
  },
  {
    id: "ABC-3",
    name: "Alice Brown",
    description: "Pediatrician",
    avatar: "",
    website: "",
    createdAt: "",
  },
];

describe("usePatientSearch", () => {
  it("returns the initial state", () => {
    const { result } = renderHook(() =>
      usePatientSearch({
        patients,
        favoriteIds: ["2"],
      }),
    );

    expect(result.current.search).toBe("");
    expect(result.current.filter).toBe("all");
    expect(result.current.totalCount).toBe(3);
    expect(result.current.favoriteCount).toBe(1);
    expect(result.current.filteredPatients).toEqual(patients);
  });

  it("filters by patient name", () => {
    const { result } = renderHook(() =>
      usePatientSearch({
        patients,
        favoriteIds: [],
      }),
    );

    act(() => {
      result.current.handleSearchChange("john");
    });

    expect(result.current.filteredPatients).toEqual([patients[0]]);
    expect(result.current.totalCount).toBe(1);
  });

  it("filters by patient id", () => {
    const { result } = renderHook(() =>
      usePatientSearch({
        patients,
        favoriteIds: [],
      }),
    );

    act(() => {
      result.current.handleSearchChange("abc");
    });

    expect(result.current.filteredPatients).toEqual([patients[2]]);
  });

  it("filters by patient description", () => {
    const { result } = renderHook(() =>
      usePatientSearch({
        patients,
        favoriteIds: [],
      }),
    );

    act(() => {
      result.current.handleSearchChange("neuro");
    });

    expect(result.current.filteredPatients).toEqual([patients[1]]);
  });

  it("performs case-insensitive searches", () => {
    const { result } = renderHook(() =>
      usePatientSearch({
        patients,
        favoriteIds: [],
      }),
    );

    act(() => {
      result.current.handleSearchChange("PEDIATRICIAN");
    });

    expect(result.current.filteredPatients).toEqual([patients[2]]);
  });

  it("shows only favorite patients when the filter is favorites", () => {
    const { result } = renderHook(() =>
      usePatientSearch({
        patients,
        favoriteIds: ["1", "3"],
      }),
    );

    act(() => {
      result.current.handleFilterChange("favorites");
    });

    expect(result.current.filteredPatients).toEqual([patients[0]]);
    expect(result.current.favoriteCount).toBe(1);
  });

  it("updates favoriteCount after searching", () => {
    const { result } = renderHook(() =>
      usePatientSearch({
        patients,
        favoriteIds: ["2"],
      }),
    );

    act(() => {
      result.current.handleSearchChange("jane");
    });

    expect(result.current.totalCount).toBe(1);
    expect(result.current.favoriteCount).toBe(1);
  });

  it("calls onSearchChange", () => {
    const onSearchChange = vi.fn();

    const { result } = renderHook(() =>
      usePatientSearch({
        patients,
        favoriteIds: [],
        onSearchChange,
      }),
    );

    act(() => {
      result.current.handleSearchChange("john");
    });

    expect(onSearchChange).toHaveBeenCalledTimes(1);
  });

  it("calls onFilterChange", () => {
    const onFilterChange = vi.fn();

    const { result } = renderHook(() =>
      usePatientSearch({
        patients,
        favoriteIds: [],
        onFilterChange,
      }),
    );

    act(() => {
      result.current.handleFilterChange("favorites");
    });

    expect(onFilterChange).toHaveBeenCalledTimes(1);
    expect(result.current.filter).toBe("favorites");
  });
});
