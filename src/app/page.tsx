import Link from "next/link";
import { Package } from "lucide-react";
import { AppShell } from "@/shared/components/layout/app-shell";
import { PageContainer } from "@/shared/components/layout/page-container";
import { Badge } from "@/shared/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";

export default function HomePage() {
  return (
    <AppShell
      title="Overview"
      description="Foundation ready for the product catalog."
      actions={
        <Link
          href="/products"
          className="hidden h-10 items-center justify-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground shadow-xs transition-colors hover:bg-primary-hover sm:inline-flex"
        >
          Browse products
        </Link>
      }
    >
      <PageContainer>
        <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
          <Card>
            <CardHeader>
              <Badge variant="primary" className="w-fit">
                Phase 1
              </Badge>
              <CardTitle className="mt-3 text-xl">Product Catalog foundation</CardTitle>
              <CardDescription>
                Shared UI, layout shell, design tokens, validation schema, and DummyJSON
                service layer are in place. Product listing and CRUD screens land in the
                next phases.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex gap-2">
                  <span className="mt-1 size-1.5 shrink-0 rounded-full bg-primary" />
                  Feature-based architecture under{" "}
                  <code className="text-foreground">features/products</code>
                </li>
                <li className="flex gap-2">
                  <span className="mt-1 size-1.5 shrink-0 rounded-full bg-primary" />
                  Typed API methods with mutation reconciliation helpers
                </li>
                <li className="flex gap-2">
                  <span className="mt-1 size-1.5 shrink-0 rounded-full bg-primary" />
                  Accessible shared primitives and responsive navigation
                </li>
              </ul>
              <div className="flex flex-wrap gap-2 pt-2">
                <Link
                  href="/products"
                  className="inline-flex h-10 items-center justify-center gap-2 rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground shadow-xs transition-colors hover:bg-primary-hover"
                >
                  <Package className="size-4" aria-hidden />
                  Go to products
                </Link>
                <Link
                  href="/products/new"
                  className="inline-flex h-10 items-center justify-center rounded-md border border-border bg-surface px-4 text-sm font-medium text-foreground shadow-xs transition-colors hover:bg-surface-muted"
                >
                  Add product route
                </Link>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Stack</CardTitle>
              <CardDescription>Configured for the assessment scope.</CardDescription>
            </CardHeader>
            <CardContent>
              <dl className="space-y-3 text-sm">
                <div className="flex items-center justify-between gap-3 border-b border-border pb-3">
                  <dt className="text-muted-foreground">Framework</dt>
                  <dd className="font-medium text-foreground">Next.js App Router</dd>
                </div>
                <div className="flex items-center justify-between gap-3 border-b border-border pb-3">
                  <dt className="text-muted-foreground">Styling</dt>
                  <dd className="font-medium text-foreground">Tailwind CSS v4</dd>
                </div>
                <div className="flex items-center justify-between gap-3 border-b border-border pb-3">
                  <dt className="text-muted-foreground">Forms</dt>
                  <dd className="font-medium text-foreground">RHF + Zod</dd>
                </div>
                <div className="flex items-center justify-between gap-3">
                  <dt className="text-muted-foreground">API</dt>
                  <dd className="font-medium text-foreground">DummyJSON</dd>
                </div>
              </dl>
            </CardContent>
          </Card>
        </div>
      </PageContainer>
    </AppShell>
  );
}
