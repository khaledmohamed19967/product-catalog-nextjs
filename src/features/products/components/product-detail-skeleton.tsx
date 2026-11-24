import { Skeleton } from "@/shared/components/ui/skeleton";

export function ProductDetailSkeleton() {
  return (
    <div className="space-y-6" aria-busy="true" aria-live="polite">
      <span className="sr-only">Loading product details</span>
      <Skeleton className="h-4 w-64 max-w-full" />

      <div className="grid gap-8 lg:grid-cols-2 lg:gap-10">
        <div className="space-y-3">
          <Skeleton className="aspect-square w-full rounded-lg" />
          <div className="grid grid-cols-4 gap-2 sm:grid-cols-5">
            {Array.from({ length: 4 }).map((_, index) => (
              <Skeleton key={index} className="aspect-square w-full rounded-md" />
            ))}
          </div>
        </div>

        <div className="space-y-5">
          <div className="space-y-3">
            <Skeleton className="h-5 w-24" />
            <Skeleton className="h-9 w-4/5" />
            <Skeleton className="h-4 w-40" />
          </div>
          <Skeleton className="h-8 w-32" />
          <Skeleton className="h-20 w-full" />
          <div className="grid grid-cols-2 gap-3">
            <Skeleton className="h-16 w-full rounded-lg" />
            <Skeleton className="h-16 w-full rounded-lg" />
            <Skeleton className="h-16 w-full rounded-lg" />
            <Skeleton className="h-16 w-full rounded-lg" />
          </div>
          <div className="flex gap-2">
            <Skeleton className="h-10 w-36" />
            <Skeleton className="h-10 w-28" />
          </div>
        </div>
      </div>
    </div>
  );
}
