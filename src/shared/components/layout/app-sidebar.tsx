import { Package } from "lucide-react";
import { appConfig } from "@/config/app.config";
import { AppNavigation } from "./app-navigation";

export interface AppSidebarProps {
  onNavigate?: () => void;
}

export function AppSidebar({ onNavigate }: AppSidebarProps) {
  return (
    <div className="flex h-full flex-col">
      <div className="flex h-[var(--header-height)] items-center gap-2.5 border-b border-border px-5">
        <span className="flex size-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
          <Package className="size-4" aria-hidden />
        </span>
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold tracking-tight text-foreground">
            {appConfig.name}
          </p>
          <p className="truncate text-xs text-muted-foreground">Management</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-3 py-4">
        <p className="mb-2 px-3 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
          Catalog
        </p>
        <AppNavigation onNavigate={onNavigate} />
      </div>

      <div className="border-t border-border px-5 py-4">
        <p className="text-xs text-muted-foreground">DummyJSON-powered demo</p>
      </div>
    </div>
  );
}
