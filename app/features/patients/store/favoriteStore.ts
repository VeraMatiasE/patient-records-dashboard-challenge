import { create } from "zustand";
import { persist } from "zustand/middleware";

interface FavoriteStore {
  favoriteIds: string[];

  toggle: (id: string) => void;
  isFavorite: (id: string) => boolean;
  clear: () => void;
}

export const useFavoriteStore = create<FavoriteStore>()(
  persist(
    (set, get) => ({
      favoriteIds: [],

      toggle: (id) =>
        set((state) => ({
          favoriteIds: state.favoriteIds.includes(id)
            ? state.favoriteIds.filter((favoriteId) => favoriteId !== id)
            : [...state.favoriteIds, id],
        })),

      isFavorite: (id) => get().favoriteIds.includes(id),

      clear: () =>
        set({
          favoriteIds: [],
        }),
    }),
    {
      name: "favorites-storage",
    },
  ),
);
