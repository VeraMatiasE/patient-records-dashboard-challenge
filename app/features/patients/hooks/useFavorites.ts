import { useCallback } from "react";
import { useFavoriteStore } from "../store/favoriteStore";

export function useFavorites() {
  const favoriteIds = useFavoriteStore((s) => s.favoriteIds);
  const toggleFavorite = useFavoriteStore((s) => s.toggle);

  const isFavorite = useCallback(
    (id: string) => favoriteIds.includes(id),
    [favoriteIds],
  );

  return {
    favoriteIds,
    favoriteCount: favoriteIds.length,
    toggleFavorite,
    isFavorite,
  };
}
