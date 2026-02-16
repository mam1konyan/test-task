import { Skeleton } from './Skeleton';

export function PostDetailsSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="mb-8 rounded-xl border border-white/5 bg-white/5 p-6 shadow-xl backdrop-blur-sm">
        <Skeleton className="mb-4 h-8 w-1/2" />
        <div className="space-y-3">
          <Skeleton className="h-5 w-full" />
          <Skeleton className="h-5 w-full" />
          <Skeleton className="h-5 w-4/5" />
        </div>
        <Skeleton className="mt-6 h-4 w-24" />
      </div>
    </div>
  );
}
