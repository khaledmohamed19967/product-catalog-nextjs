"use client";

import Link from "next/link";
import { Suspense } from "react";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Package, Plus } from "lucide-react";
import { cn } from "@/shared/lib/cn";

export interface NavItem {
  href: string;
  label: string;
  icon: typeof Package;
  exact?: boolean;
}

const navItems: NavItem[] = [
  {
    href: "/",
    label: "Overview",
    icon: LayoutDashboard,
    exact: true,
  },
  {
    href: "/products",
    label: "Products",
    icon: Package,
  },
  {
    href: "/products/new",
    label: "Add product",
    icon: Plus,
  },
];

function isActivePath(pathname: string, href: string, exact?: boolean): boolean {
  if (exact || href === "/products/new") {
    return pathname === href;
  }

  if (href === "/products") {
    return (
      pathname === "/products" ||
      /^\/products\/[^/]+(?:\/edit)?$/.test(pathname)
    );
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}

export interface AppNavigationProps {
  onNavigate?: () => void;
  className?: string;
}

export function AppNavigation(props: AppNavigationProps) {
  return (
    <Suspense fallback={<NavigationList {...props} />}>
      <NavigationListActive {...props} />
    </Suspense>
  );
}

function NavigationListActive({ onNavigate, className }: AppNavigationProps) {
  const pathname = usePathname();
  return (
    <NavigationList
      onNavigate={onNavigate}
      className={className}
      pathname={pathname}
    />
  );
}

interface NavigationListProps extends AppNavigationProps {
  pathname?: string;
}

function NavigationList({ onNavigate, className, pathname }: NavigationListProps) {
  return (
    <nav aria-label="Primary" className={cn("flex flex-col gap-1", className)}>
      {navItems.map((item) => {
        const Icon = item.icon;
        const active = pathname
          ? isActivePath(pathname, item.href, item.exact)
          : false;

        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={onNavigate}
            aria-current={active ? "page" : undefined}
            className={cn(
              "group flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
              active
                ? "bg-primary-muted text-primary"
                : "text-muted-foreground hover:bg-muted hover:text-foreground",
            )}
          >
            <Icon
              className={cn(
                "size-4 shrink-0",
                active ? "text-primary" : "text-muted-foreground group-hover:text-foreground",
              )}
              aria-hidden
            />
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
