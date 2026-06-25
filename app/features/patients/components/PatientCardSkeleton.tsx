import {
  SkeletonCircle,
  SkeletonLine,
  SkeletonBox,
} from "~/shared/ui/Skeleton";

export function PatientCardSkeleton() {
  return (
    <div
      className="bg-surface border border-border rounded-xl p-4 overflow-hidden"
      aria-hidden="true"
    >
      <div className="flex items-start gap-3">
        <SkeletonCircle className="w-11 h-11 flex-shrink-0" />

        <div className="flex-1 pt-0.5 space-y-2">
          <SkeletonLine className="h-3 w-3/5" />
          <SkeletonLine className="h-2.5 w-2/5" />
        </div>

        <div className="flex gap-1.5 flex-shrink-0">
          <SkeletonBox className="w-8 h-8 rounded-lg" />
          <SkeletonBox className="w-8 h-8 rounded-lg" />
        </div>
      </div>

      <div className="mt-4 pt-3 border-t border-border flex justify-center">
        <SkeletonLine className="h-2.5 w-1/3" />
      </div>
    </div>
  );
}
