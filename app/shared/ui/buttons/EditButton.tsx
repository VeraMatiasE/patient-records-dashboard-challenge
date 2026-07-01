import { IconButton } from "./IconButton";

export function EditButton({ onClick }: { onClick: () => void }) {
  return (
    <IconButton
      icon="✎"
      ariaLabel="Edit patient"
      onClick={onClick}
      className="w-8 h-8 rounded-lg text-text-muted hover:text-accent hover:bg-surface-hover"
    />
  );
}
