export function SkeletonCircle({ className = "" }) {
  return (
    <div className={`rounded-full bg-skeleton animate-pulse ${className}`} />
  );
}

export function SkeletonLine({ className = "" }) {
  return <div className={`bg-skeleton animate-pulse rounded ${className}`} />;
}

export function SkeletonBox({ className = "" }) {
  return <div className={`bg-skeleton animate-pulse rounded ${className}`} />;
}
