import { renderHook, act } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { usePagination } from "./usePagination";
import { PAGE_SIZE } from "~/shared/constants/pagination";

const createItems = (n: number) =>
  Array.from({ length: n }, (_, i) => `item-${i + 1}`);

describe("usePagination", () => {
  it("should paginate items correctly", () => {
    const items = createItems(PAGE_SIZE * 2);

    const { result } = renderHook(() => usePagination(items));

    expect(result.current.totalPages).toBe(2);
    expect(result.current.paged.length).toBe(PAGE_SIZE);
    expect(result.current.currentPage).toBe(1);
  });

  it("should return first page items correctly", () => {
    const items = createItems(10);

    const { result } = renderHook(() => usePagination(items));

    expect(result.current.currentPage).toBe(1);
    expect(result.current.paged).toEqual(
      items.slice(0, result.current.paged.length),
    );
  });

  it("should change page correctly", () => {
    const items = createItems(20);

    const { result } = renderHook(() => usePagination(items));

    act(() => {
      result.current.setPage(2);
    });

    expect(result.current.currentPage).toBe(2);
  });

  it("should not exceed total pages", () => {
    const items = createItems(5);

    const { result } = renderHook(() => usePagination(items));

    act(() => {
      result.current.setPage(999);
    });

    expect(result.current.currentPage).toBe(result.current.totalPages);
  });

  it("should always have at least 1 page", () => {
    const { result } = renderHook(() => usePagination([]));

    expect(result.current.totalPages).toBe(1);
    expect(result.current.paged).toEqual([]);
  });
});
