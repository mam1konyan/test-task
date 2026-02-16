import { Skeleton } from './Skeleton';

export function CommentSkeleton() {
  return (
    <div className="rounded-xl border border-white/5 bg-white/5 p-4">
      <Skeleton className="mb-2 h-5 w-1/3" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
      </div>
      <Skeleton className="mt-4 h-3 w-1/4" />
    </div>
  );
}
