interface EmptyStateProps {
  title: string;
  description?: string;
  compact?: boolean;
}

export function EmptyState({
  title,
  description,
  compact = false,
}: EmptyStateProps) {
  return (
    <div className={`text-center ${compact ? "py-6" : "py-16"}`}>
      <p
        className={`font-medium ${compact ? "text-xs" : "text-base"} text-text`}
      >
        {title}
      </p>

      {description && (
        <p
          className={`mt-1 ${
            compact
              ? "text-[11px] text-text-muted/60"
              : "text-sm text-text-muted"
          }`}
        >
          {description}
        </p>
      )}
    </div>
  );
}
