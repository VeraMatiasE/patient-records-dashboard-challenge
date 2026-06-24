import { renderHook, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { usePatients } from "./usePatients";

vi.mock("~/features/patients/store/patientStore", () => ({
  usePatientStore: vi.fn(),
}));

import { usePatientStore } from "~/features/patients/store/patientStore";

describe("usePatients", () => {
  const loadPatientsMock = vi.fn();
  const addPatientMock = vi.fn();
  const updatePatientMock = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();

    (usePatientStore as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      patients: [{ id: "1", name: "John" }],
      status: "idle",
      error: null,
      loadPatients: loadPatientsMock,
      addPatient: addPatientMock,
      updatePatient: updatePatientMock,
    });
  });

  it("should load patients on mount", async () => {
    renderHook(() => usePatients());

    await waitFor(() => {
      expect(loadPatientsMock).toHaveBeenCalledTimes(1);
    });
  });

  it("should return mapped loading state correctly (idle)", () => {
    const { result } = renderHook(() => usePatients());

    expect(result.current.loading).toBe(true);
  });

  it("should return patients from store", () => {
    const { result } = renderHook(() => usePatients());

    expect(result.current.patients).toEqual([{ id: "1", name: "John" }]);
  });

  it("should expose store actions", () => {
    const { result } = renderHook(() => usePatients());

    result.current.addPatient({} as any);
    result.current.updatePatient({} as any);

    expect(addPatientMock).toHaveBeenCalled();
    expect(updatePatientMock).toHaveBeenCalled();
  });
});
