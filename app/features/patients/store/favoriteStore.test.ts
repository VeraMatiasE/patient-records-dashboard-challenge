import { beforeEach, describe, expect, it, vi } from "vitest";
import { useFavoriteStore } from "./favoriteStore";

vi.mock("zustand/middleware", async () => {
  const actual =
    await vi.importActual<typeof import("zustand/middleware")>(
      "zustand/middleware",
    );

  return {
    ...actual,
    persist: (fn: Parameters<typeof actual.persist>[0]) => fn,
  };
});

describe("useFavoriteStore", () => {
  beforeEach(() => {
    useFavoriteStore.setState({
      favoriteIds: [],
    });
  });

  it("starts with an empty favorites list", () => {
    expect(useFavoriteStore.getState().favoriteIds).toEqual([]);
  });

  it("adds a patient to favorites", () => {
    useFavoriteStore.getState().toggle("1");

    expect(useFavoriteStore.getState().favoriteIds).toEqual(["1"]);
  });

  it("removes a patient when toggled again", () => {
    useFavoriteStore.getState().toggle("1");
    useFavoriteStore.getState().toggle("1");

    expect(useFavoriteStore.getState().favoriteIds).toEqual([]);
  });

  it("adds multiple favorites", () => {
    useFavoriteStore.getState().toggle("1");
    useFavoriteStore.getState().toggle("2");

    expect(useFavoriteStore.getState().favoriteIds).toEqual(["1", "2"]);
  });

  it("checks whether a patient is favorite", () => {
    useFavoriteStore.getState().toggle("1");

    expect(useFavoriteStore.getState().isFavorite("1")).toBe(true);
    expect(useFavoriteStore.getState().isFavorite("2")).toBe(false);
  });

  it("clears all favorites", () => {
    useFavoriteStore.getState().toggle("1");
    useFavoriteStore.getState().toggle("2");

    useFavoriteStore.getState().clear();

    expect(useFavoriteStore.getState().favoriteIds).toEqual([]);
  });
});
