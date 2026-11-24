import { cn } from "@/shared/lib/cn";
import { Skeleton } from "./skeleton";

export interface LoadingStateProps {
  label?: string;
  className?: string;
  rows?: number;
}

export function LoadingState({
  label = "Loading…",
  className,
  rows = 3,
}: LoadingStateProps) {
  return (
    <div
      className={cn("space-y-3 rounded-lg border border-border bg-surface p-5", className)}
      role="status"
      aria-live="polite"
      aria-busy="true"
    >
      <span className="sr-only">{label}</span>
      <Skeleton className="h-5 w-40" />
      {Array.from({ length: rows }).map((_, index) => (
        <Skeleton key={index} className="h-10 w-full" />
      ))}
    </div>
  );
}
