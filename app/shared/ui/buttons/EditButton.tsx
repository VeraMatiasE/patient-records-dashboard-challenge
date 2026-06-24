export function EditButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="Edit patient"
      className="w-8 h-8 flex items-center justify-center rounded-lg text-text-muted hover:text-accent hover:bg-surface-hover transition-colors cursor-pointer"
    >
      ✎
    </button>
  );
}
