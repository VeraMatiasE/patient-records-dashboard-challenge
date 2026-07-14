import { Icon } from "../icons/Icon";
import { IconButton } from "./IconButton";

interface FavoriteButtonProps {
  isFavorite: boolean;
  onClick: () => void;
}

export function FavoriteButton({ isFavorite, onClick }: FavoriteButtonProps) {
  return (
    <IconButton
      icon={
        <Icon name={isFavorite ? "starFilled" : "star"} className="h-4 w-4" />
      }
      ariaLabel={isFavorite ? "Remove from favorites" : "Add to favorites"}
      onClick={onClick}
      className={
        isFavorite
          ? "text-warning hover:scale-120"
          : "text-text-muted hover:text-warning"
      }
    />
  );
}
