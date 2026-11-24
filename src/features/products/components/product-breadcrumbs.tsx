import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { cn } from "@/shared/lib/cn";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export interface ProductBreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
}

export function ProductBreadcrumbs({ items, className }: ProductBreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className={cn("min-w-0", className)}>
      <ol className="flex flex-wrap items-center gap-1.5 text-sm text-muted-foreground">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <li key={`${item.label}-${index}`} className="flex min-w-0 items-center gap-1.5">
              {index > 0 ? (
                <ChevronRight className="size-3.5 shrink-0 text-border-strong" aria-hidden />
              ) : null}
              {item.href && !isLast ? (
                <Link
                  href={item.href}
                  className="truncate transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                >
                  {item.label}
                </Link>
              ) : (
                <span
                  className={cn("truncate", isLast && "font-medium text-foreground")}
                  aria-current={isLast ? "page" : undefined}
                >
                  {item.label}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
