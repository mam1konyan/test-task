import { Skeleton } from './Skeleton';

export function PostCardSkeleton() {
  return (
    <div className="flex flex-col h-full rounded-xl border border-white/5 bg-white/5 p-5 backdrop-blur-sm">
      <Skeleton className="mb-3 h-6 w-3/4" />
      <div className="flex-grow space-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-2/3" />
      </div>
      <div className="mt-6 flex items-center gap-4 pt-2">
        <Skeleton className="h-4 w-12" />
        <Skeleton className="h-4 w-12" />
        <Skeleton className="h-8 w-16 rounded-xl" />
      </div>
    </div>
  );
}
