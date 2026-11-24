import { forwardRef, type TextareaHTMLAttributes } from "react";
import { cn } from "@/shared/lib/cn";

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  hint?: string;
  error?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, id, label, hint, error, rows = 4, ...props }, ref) => {
    const textareaId = id ?? props.name;
    const describedBy = error
      ? `${textareaId}-error`
      : hint
        ? `${textareaId}-hint`
        : undefined;

    return (
      <div className="flex w-full flex-col gap-1.5">
        {label ? (
          <label htmlFor={textareaId} className="text-sm font-medium text-foreground">
            {label}
            {props.required ? (
              <span className="ml-0.5 text-danger" aria-hidden>
                *
              </span>
            ) : null}
          </label>
        ) : null}
        <textarea
          ref={ref}
          id={textareaId}
          rows={rows}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy}
          className={cn(
            "min-h-24 w-full rounded-md border bg-surface px-3 py-2 text-sm text-foreground shadow-xs",
            "placeholder:text-muted-foreground",
            "transition-[border-color,box-shadow]",
            "focus-visible:border-ring focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/20",
            "disabled:cursor-not-allowed disabled:bg-muted disabled:opacity-70",
            error ? "border-danger" : "border-input",
            className,
          )}
          {...props}
        />
        {error ? (
          <p id={`${textareaId}-error`} className="text-xs text-danger" role="alert">
            {error}
          </p>
        ) : hint ? (
          <p id={`${textareaId}-hint`} className="text-xs text-muted-foreground">
            {hint}
          </p>
        ) : null}
      </div>
    );
  },
);

Textarea.displayName = "Textarea";
