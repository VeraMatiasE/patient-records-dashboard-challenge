interface EmptyStateProps {
  title: string;
  description?: string;
}

export function EmptyState({ title, description }: EmptyStateProps) {
  return (
    <div className="text-center py-16 text-text-secondary">
      <p className="text-base font-medium">{title}</p>
      {description && (
        <p className="text-sm mt-1 text-text-muted">{description}</p>
      )}
    </div>
  );
}
