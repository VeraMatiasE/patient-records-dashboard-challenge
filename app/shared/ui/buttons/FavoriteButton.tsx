interface FavoriteButtonProps {
  isFavorite: boolean;
  onClick: () => void;
}

export function FavoriteButton({ isFavorite, onClick }: FavoriteButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
      className={`w-8 h-8 flex items-center justify-center rounded-lg transition-colors hover:bg-surface-hover cursor-pointer ${
        isFavorite ? "text-warning" : "text-text-muted hover:text-warning"
      }`}
    >
      {isFavorite ? "★" : "☆"}
    </button>
  );
}
