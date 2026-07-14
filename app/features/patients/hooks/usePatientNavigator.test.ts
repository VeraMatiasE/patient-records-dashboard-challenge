import { act, renderHook } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { usePatientNavigator } from "./usePatientNavigator";

describe("usePatientNavigator", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  function createElement() {
    return {
      scrollIntoView: vi.fn(),
      focus: vi.fn(),
    } as unknown as HTMLElement;
  }

  it("scrolls and highlights a registered patient", () => {
    const setPage = vi.fn();
    const resolvePage = vi.fn(() => 2);

    const { result } = renderHook(() =>
      usePatientNavigator({
        resolvePage,
        setPage,
      }),
    );

    const element = createElement();

    act(() => {
      result.current.register("1")(element);
    });

    act(() => {
      result.current.focusPatient("1");
    });

    expect(resolvePage).toHaveBeenCalledWith("1");
    expect(setPage).toHaveBeenCalledWith(2);
    expect(element.scrollIntoView).toHaveBeenCalledWith({
      behavior: "smooth",
      block: "center",
    });
    expect(element.focus).toHaveBeenCalledWith({
      preventScroll: true,
    });
    expect(result.current.highlightedId).toBe("1");
  });

  it("waits until the element is registered", () => {
    const setPage = vi.fn();
    const resolvePage = vi.fn(() => 3);

    const { result } = renderHook(() =>
      usePatientNavigator({
        resolvePage,
        setPage,
      }),
    );

    act(() => {
      result.current.focusPatient("2");
    });

    expect(setPage).toHaveBeenCalledWith(3);
    expect(result.current.highlightedId).toBeNull();

    const element = createElement();

    act(() => {
      result.current.register("2")(element);
    });

    expect(element.scrollIntoView).toHaveBeenCalled();
    expect(element.focus).toHaveBeenCalled();
    expect(result.current.highlightedId).toBe("2");
  });

  it("does nothing when the patient cannot be resolved", () => {
    const setPage = vi.fn();
    const resolvePage = vi.fn(() => null);

    const { result } = renderHook(() =>
      usePatientNavigator({
        resolvePage,
        setPage,
      }),
    );

    act(() => {
      result.current.focusPatient("unknown");
    });

    expect(resolvePage).toHaveBeenCalledWith("unknown");
    expect(setPage).not.toHaveBeenCalled();
    expect(result.current.highlightedId).toBeNull();
  });

  it("clears the highlight after the configured duration", () => {
    const setPage = vi.fn();
    const resolvePage = vi.fn(() => 1);

    const { result } = renderHook(() =>
      usePatientNavigator({
        resolvePage,
        setPage,
        highlightDuration: 1000,
      }),
    );

    const element = createElement();

    act(() => {
      result.current.register("1")(element);
      result.current.focusPatient("1");
    });

    expect(result.current.highlightedId).toBe("1");

    act(() => {
      vi.advanceTimersByTime(1000);
    });

    expect(result.current.highlightedId).toBeNull();
  });

  it("removes an element when unregistering", () => {
    const setPage = vi.fn();
    const resolvePage = vi.fn(() => 1);

    const { result } = renderHook(() =>
      usePatientNavigator({
        resolvePage,
        setPage,
      }),
    );

    const element = createElement();

    act(() => {
      result.current.register("1")(element);
      result.current.register("1")(null);
    });

    act(() => {
      result.current.focusPatient("1");
    });

    expect(element.scrollIntoView).not.toHaveBeenCalled();
    expect(result.current.highlightedId).toBeNull();
  });
});
