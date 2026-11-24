"use client";

import { Suspense, useEffect, useState, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import { cn } from "@/shared/lib/cn";
import { AppHeader } from "./app-header";
import { AppSidebar } from "./app-sidebar";

export interface AppShellProps {
  children: ReactNode;
  title: string;
  description?: string;
  actions?: ReactNode;
}

/**
 * Application chrome with responsive sidebar.
 * Pathname-driven UI is streamed behind Suspense for Cache Components.
 */
export function AppShell(props: AppShellProps) {
  return (
    <Suspense fallback={<AppShellStatic {...props} mobileEnabled={false} />}>
      <AppShellClient {...props} />
    </Suspense>
  );
}

function AppShellStatic({
  children,
  title,
  description,
  actions,
  mobileEnabled,
  mobileNavOpen = false,
  onMenuClick,
  onNavigate,
  onCloseOverlay,
}: AppShellProps & {
  mobileEnabled: boolean;
  mobileNavOpen?: boolean;
  onMenuClick?: () => void;
  onNavigate?: () => void;
  onCloseOverlay?: () => void;
}) {
  return (
    <div className="min-h-full bg-background">
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-40 w-[var(--sidebar-width)] border-r border-border bg-surface transition-transform duration-200 ease-out",
          "lg:translate-x-0",
          mobileEnabled
            ? mobileNavOpen
              ? "translate-x-0"
              : "-translate-x-full"
            : "hidden lg:block",
        )}
        aria-label="Sidebar"
      >
        <AppSidebar onNavigate={onNavigate} />
      </aside>

      {mobileEnabled && mobileNavOpen ? (
        <button
          type="button"
          aria-label="Close navigation overlay"
          className="fixed inset-0 z-30 bg-foreground/40 lg:hidden"
          onClick={onCloseOverlay}
        />
      ) : null}

      <div className="lg:pl-[var(--sidebar-width)]">
        <AppHeader
          title={title}
          description={description}
          actions={actions}
          onMenuClick={mobileEnabled ? onMenuClick : undefined}
        />
        <main id="main-content">{children}</main>
      </div>
    </div>
  );
}

function AppShellClient({ children, title, description, actions }: AppShellProps) {
  const pathname = usePathname();
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [navPathname, setNavPathname] = useState(pathname);

  if (pathname !== navPathname) {
    setNavPathname(pathname);
    if (mobileNavOpen) {
      setMobileNavOpen(false);
    }
  }

  useEffect(() => {
    if (!mobileNavOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [mobileNavOpen]);

  return (
    <AppShellStatic
      title={title}
      description={description}
      actions={actions}
      mobileEnabled
      mobileNavOpen={mobileNavOpen}
      onMenuClick={() => setMobileNavOpen(true)}
      onNavigate={() => setMobileNavOpen(false)}
      onCloseOverlay={() => setMobileNavOpen(false)}
    >
      {children}
    </AppShellStatic>
  );
}
