import type { ReactNode } from "react";
import { AlertTriangle } from "lucide-react";
import { cn } from "@/shared/lib/cn";
import { Button } from "./button";

export interface ErrorStateProps {
  title?: string;
  message: string;
  onRetry?: () => void;
  action?: ReactNode;
  className?: string;
}

export function ErrorState({
  title = "Something went wrong",
  message,
  onRetry,
  action,
  className,
}: ErrorStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center rounded-lg border border-danger/20 bg-danger-muted/40 px-6 py-12 text-center",
        className,
      )}
      role="alert"
    >
      <div className="mb-4 flex size-12 items-center justify-center rounded-lg bg-danger-muted text-danger">
        <AlertTriangle className="size-5" aria-hidden />
      </div>
      <h3 className="text-base font-semibold text-foreground">{title}</h3>
      <p className="mt-1 max-w-md text-sm text-muted-foreground">{message}</p>
      {(onRetry || action) && (
        <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
          {onRetry ? (
            <Button type="button" variant="outline" onClick={onRetry}>
              Try again
            </Button>
          ) : null}
          {action}
        </div>
      )}
    </div>
  );
}
