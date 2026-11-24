import type { Metadata } from "next";
import Link from "next/link";
import { PackageX } from "lucide-react";
import { appConfig } from "@/config/app.config";
import { AppShell } from "@/shared/components/layout/app-shell";
import { PageContainer } from "@/shared/components/layout/page-container";

export const metadata: Metadata = {
  title: "Page not found",
  description: "The page you requested could not be found.",
};

export default function NotFound() {
  return (
    <AppShell
      title="Page not found"
      description="The page you requested could not be found."
    >
      <PageContainer>
        <div className="mx-auto flex max-w-lg flex-col items-center rounded-lg border border-border bg-surface px-6 py-14 text-center shadow-xs">
          <div className="mb-4 flex size-12 items-center justify-center rounded-lg bg-muted text-muted-foreground">
            <PackageX className="size-5" aria-hidden />
          </div>
          <p className="text-sm font-medium text-primary">404</p>
          <h2 className="mt-2 text-xl font-semibold tracking-tight text-foreground">
            We couldn’t find that page
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            The product or page may have been removed, or the link might be incorrect.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
            <Link
              href="/products"
              className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground shadow-xs transition-colors hover:bg-primary-hover"
            >
              Browse products
            </Link>
            <Link
              href="/"
              className="inline-flex h-10 items-center justify-center rounded-md border border-border bg-surface px-4 text-sm font-medium text-foreground shadow-xs transition-colors hover:bg-surface-muted"
            >
              Back to {appConfig.name}
            </Link>
          </div>
        </div>
      </PageContainer>
    </AppShell>
  );
}
