import { renderHook, act } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { usePatientForm } from "./usePatientForm";
import type { PatientFormData } from "../schemas/patient.schema";

const validData: PatientFormData = {
  name: "John Doe",
  description: "Patient description",
  website: "https://example.com",
  avatar: "https://example.com/avatar.png",
};

describe("usePatientForm", () => {
  it("should initialize with empty values when no initialValues are provided", () => {
    const onSubmit = vi.fn();

    const { result } = renderHook(() => usePatientForm({ onSubmit }));

    expect(result.current.form).toEqual({
      name: "",
      description: "",
      website: "",
      avatar: "",
    });

    expect(result.current.errors).toEqual({});
    expect(result.current.saving).toBe(false);
  });

  it("should initialize with initialValues", () => {
    const onSubmit = vi.fn();

    const { result } = renderHook(() =>
      usePatientForm({
        initialValues: validData,
        onSubmit,
      }),
    );

    expect(result.current.form).toEqual(validData);
  });

  it("should update a field", () => {
    const onSubmit = vi.fn();

    const { result } = renderHook(() => usePatientForm({ onSubmit }));

    act(() => {
      result.current.setField("name", "Jane Doe");
    });

    expect(result.current.form.name).toBe("Jane Doe");
  });

  it("should submit valid data", async () => {
    const onSubmit = vi.fn();

    const { result } = renderHook(() => usePatientForm({ onSubmit }));

    act(() => {
      result.current.setField("name", validData.name);
      result.current.setField("description", validData.description);
      result.current.setField("website", validData.website);
      result.current.setField("avatar", validData.avatar);
    });

    await act(async () => {
      await result.current.handleSubmit();
    });

    expect(onSubmit).toHaveBeenCalledTimes(1);
    expect(onSubmit).toHaveBeenCalledWith(validData);

    expect(result.current.errors).toEqual({});
    expect(result.current.saving).toBe(false);
  });

  it("should not submit invalid data and should populate errors", async () => {
    const onSubmit = vi.fn();

    const { result } = renderHook(() => usePatientForm({ onSubmit }));

    await act(async () => {
      await result.current.handleSubmit();
    });

    expect(onSubmit).not.toHaveBeenCalled();

    expect(result.current.errors.name).toBeDefined();
    expect(result.current.errors.description).toBeDefined();
  });

  it("should clear the error when editing a field", async () => {
    const onSubmit = vi.fn();

    const { result } = renderHook(() => usePatientForm({ onSubmit }));

    await act(async () => {
      await result.current.handleSubmit();
    });

    expect(result.current.errors.name).toBeDefined();

    act(() => {
      result.current.setField("name", "John Doe");
    });

    expect(result.current.errors.name).toBeUndefined();
  });

  it("should reset the form to initial values", () => {
    const onSubmit = vi.fn();

    const { result } = renderHook(() =>
      usePatientForm({
        initialValues: validData,
        onSubmit,
      }),
    );

    act(() => {
      result.current.setField("name", "Another Name");
    });

    expect(result.current.form.name).toBe("Another Name");

    act(() => {
      result.current.reset();
    });

    expect(result.current.form).toEqual(validData);
    expect(result.current.errors).toEqual({});
  });

  it("should reset to empty values when no initialValues are provided", () => {
    const onSubmit = vi.fn();

    const { result } = renderHook(() => usePatientForm({ onSubmit }));

    act(() => {
      result.current.setField("name", "John");
      result.current.setField("description", "Description");
    });

    act(() => {
      result.current.reset();
    });

    expect(result.current.form).toEqual({
      name: "",
      description: "",
      website: "",
      avatar: "",
    });
  });
});
