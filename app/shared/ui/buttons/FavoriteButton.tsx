import { IconButton } from "./IconButton";

interface FavoriteButtonProps {
  isFavorite: boolean;
  onClick: () => void;
}

export function FavoriteButton({ isFavorite, onClick }: FavoriteButtonProps) {
  return (
    <IconButton
      icon={isFavorite ? "★" : "☆"}
      ariaLabel={isFavorite ? "Remove from favorites" : "Add to favorites"}
      onClick={onClick}
      className={
        isFavorite
          ? "w-8 h-8 rounded-lg text-warning hover:bg-surface-hover"
          : "w-8 h-8 rounded-lg text-text-muted hover:text-warning hover:bg-surface-hover"
      }
    />
  );
}
