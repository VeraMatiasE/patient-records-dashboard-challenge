import { act, renderHook } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { useToasts } from "./useToasts";

describe("useToasts", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.clearAllTimers();
    vi.useRealTimers();
  });

  it("starts with an empty toast list", () => {
    const { result } = renderHook(() => useToasts());

    expect(result.current.toasts).toEqual([]);
  });

  it("adds a success toast by default", () => {
    const { result } = renderHook(() => useToasts());

    act(() => {
      result.current.showToast("Patient saved");
    });

    expect(result.current.toasts).toHaveLength(1);
    expect(result.current.toasts[0]).toMatchObject({
      message: "Patient saved",
      type: "success",
    });
  });

  it("adds an error toast", () => {
    const { result } = renderHook(() => useToasts());

    act(() => {
      result.current.showToast("Failed to save patient", {
        type: "error",
      });
    });

    expect(result.current.toasts).toHaveLength(1);
    expect(result.current.toasts[0]).toMatchObject({
      message: "Failed to save patient",
      type: "error",
    });
  });

  it("removes a toast manually", () => {
    const { result } = renderHook(() => useToasts());

    act(() => {
      result.current.showToast("Patient saved");
    });

    const { id } = result.current.toasts[0];

    act(() => {
      result.current.removeToast(id);
    });

    expect(result.current.toasts).toEqual([]);
  });

  it("removes a success toast after the default duration", () => {
    const { result } = renderHook(() => useToasts());

    act(() => {
      result.current.showToast("Patient saved");
    });

    expect(result.current.toasts).toHaveLength(1);

    act(() => {
      vi.advanceTimersByTime(4000);
    });

    expect(result.current.toasts).toHaveLength(0);
  });

  it("removes an error toast after the default duration", () => {
    const { result } = renderHook(() => useToasts());

    act(() => {
      result.current.showToast("Failed", {
        type: "error",
      });
    });

    expect(result.current.toasts).toHaveLength(1);

    act(() => {
      vi.advanceTimersByTime(6000);
    });

    expect(result.current.toasts).toHaveLength(0);
  });

  it("uses a custom duration when provided", () => {
    const { result } = renderHook(() => useToasts());

    act(() => {
      result.current.showToast("Custom", {
        duration: 1000,
      });
    });

    expect(result.current.toasts).toHaveLength(1);

    act(() => {
      vi.advanceTimersByTime(999);
    });

    expect(result.current.toasts).toHaveLength(1);

    act(() => {
      vi.advanceTimersByTime(1);
    });

    expect(result.current.toasts).toHaveLength(0);
  });
});
