export function PatientCardSkeleton() {
  return (
    <div
      className="bg-surface border border-border rounded-xl p-4 overflow-hidden"
      aria-hidden="true"
    >
      <div className="flex items-start gap-3">
        <div className="w-11 h-11 rounded-full bg-skeleton animate-pulse flex-shrink-0" />

        <div className="flex-1 pt-0.5 space-y-2">
          <div className="h-3 bg-skeleton animate-pulse rounded w-3/5" />
          <div className="h-2.5 bg-skeleton animate-pulse rounded w-2/5" />
        </div>

        <div className="flex gap-1.5 flex-shrink-0">
          <div className="w-8 h-8 bg-skeleton/60 animate-pulse rounded-lg" />
          <div className="w-8 h-8 bg-skeleton/60 animate-pulse rounded-lg" />
        </div>
      </div>

      <div className="mt-4 pt-3 border-t border-border flex justify-center">
        <div className="h-2.5 bg-skeleton/60 animate-pulse rounded w-1/3" />
      </div>
    </div>
  );
}
