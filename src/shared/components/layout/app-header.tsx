"use client";

import type { ReactNode } from "react";
import { Menu } from "lucide-react";
import { Button } from "@/shared/components/ui/button";

export interface AppHeaderProps {
  title: string;
  description?: string;
  actions?: ReactNode;
  onMenuClick?: () => void;
}

export function AppHeader({ title, description, actions, onMenuClick }: AppHeaderProps) {
  return (
    <header className="sticky top-0 z-20 border-b border-border bg-surface/95 backdrop-blur supports-[backdrop-filter]:bg-surface/80">
      <div className="flex min-h-[var(--header-height)] items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <div className="flex min-w-0 items-start gap-3">
          {onMenuClick ? (
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="mt-0.5 shrink-0 px-2 lg:hidden"
              onClick={onMenuClick}
              aria-label="Open navigation menu"
            >
              <Menu className="size-4" aria-hidden />
            </Button>
          ) : null}
          <div className="min-w-0">
            <h1 className="truncate text-lg font-semibold tracking-tight text-foreground sm:text-xl">
              {title}
            </h1>
            {description ? (
              <p className="mt-0.5 truncate text-sm text-muted-foreground">{description}</p>
            ) : null}
          </div>
        </div>
        {actions ? <div className="flex shrink-0 items-center gap-2">{actions}</div> : null}
      </div>
    </header>
  );
}
