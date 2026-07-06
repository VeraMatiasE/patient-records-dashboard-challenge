import { Icon } from "../icons/Icon";
import { IconButton } from "./IconButton";

export function EditButton({ onClick }: { onClick: () => void }) {
  return (
    <IconButton
      icon={<Icon name="edit" className="h-4 w-4" />}
      ariaLabel="Edit patient"
      onClick={onClick}
      className="text-text-muted hover:text-accent"
    />
  );
}
