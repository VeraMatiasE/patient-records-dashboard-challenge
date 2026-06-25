import { describe, it, expect, vi, beforeEach } from "vitest";
import { usePatientStore } from "./patientStore";
import * as api from "~/features/patients/api/patientApi";

vi.mock("~/features/patients/api/patientApi", () => ({
  getPatients: vi.fn(),
}));

const mockPatient = {
  id: "1",
  name: "John",
  createdAt: "2024-01-01",
  avatar: "https://i.pravatar.cc/150?img=1",
  description: "Test patient",
  website: "example.com",
};

const { getPatients } = api;

describe("usePatientStore", () => {
  beforeEach(() => {
    usePatientStore.setState({
      patients: [],
      status: "idle",
      error: null,
    });

    vi.clearAllMocks();
  });

  it("should load patients successfully", async () => {
    (getPatients as any).mockResolvedValue([{ id: "1", name: "John" }]);

    await usePatientStore.getState().loadPatients();

    const state = usePatientStore.getState();

    expect(state.status).toBe("success");
    expect(state.patients).toHaveLength(1);
    expect(state.error).toBeNull();
  });

  it("should set error when load fails", async () => {
    (getPatients as any).mockRejectedValue(new Error("API error"));

    await usePatientStore.getState().loadPatients();

    const state = usePatientStore.getState();

    expect(state.status).toBe("error");
    expect(state.error).toBe("API error");
  });

  it("should not reload if status is not idle", async () => {
    usePatientStore.setState({ status: "loading" });

    await usePatientStore.getState().loadPatients();

    expect(getPatients).not.toHaveBeenCalled();
  });

  it("should add patient", () => {
    usePatientStore.getState().addPatient(mockPatient);

    expect(usePatientStore.getState().patients).toContain(mockPatient);
  });

  it("should update patient", () => {
    usePatientStore.setState({
      patients: [mockPatient],
    });

    usePatientStore.getState().updatePatient({
      ...mockPatient,
      name: "Updated",
    });

    expect(usePatientStore.getState().patients[0].name).toBe("Updated");
  });

  it("should delete patient", () => {
    usePatientStore.setState({
      patients: [mockPatient],
    });

    usePatientStore.getState().deletePatient("1");

    expect(usePatientStore.getState().patients).toHaveLength(0);
  });
});
