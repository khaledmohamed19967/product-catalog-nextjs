import { NextResponse, type NextRequest } from "next/server";
import { appConfig } from "@/config/app.config";
import { tryParseProductId } from "@/features/products/utils/product.utils";

/**
 * Cache Components / PPR streams a static shell and commits HTTP 200 before
 * page-level `notFound()` can run. For product detail/edit routes, decide 404
 * here so the response status is correct while still serving the app not-found UI.
 *
 * Network/server API failures intentionally fall through to the page so they
 * remain error states (not 404).
 */
export async function proxy(request: NextRequest) {
  const productRoute = matchProductRoute(request.nextUrl.pathname);
  if (!productRoute) {
    return NextResponse.next();
  }

  const productId = tryParseProductId(productRoute.id);
  if (productId === null) {
    return serveNotFound(request);
  }

  try {
    const response = await fetch(
      `${appConfig.api.baseUrl}${appConfig.api.productsPath}/${productId}`,
      {
        method: "GET",
        headers: { Accept: "application/json" },
        cache: "no-store",
        signal: AbortSignal.timeout(appConfig.api.defaultTimeoutMs),
      },
    );

    if (response.status === 404) {
      return serveNotFound(request);
    }

    // Non-404 failures (5xx, etc.) are handled by the page as errors.
    return NextResponse.next();
  } catch {
    // Timeouts / network errors: let the page show the recoverable error UI.
    return NextResponse.next();
  }
}

export const config = {
  matcher: ["/products/:id", "/products/:id/edit"],
};

function matchProductRoute(pathname: string): { id: string; isEdit: boolean } | null {
  const editMatch = pathname.match(/^\/products\/([^/]+)\/edit\/?$/);
  if (editMatch?.[1]) {
    const id = editMatch[1];
    if (id === "new") return null;
    return { id, isEdit: true };
  }

  const detailMatch = pathname.match(/^\/products\/([^/]+)\/?$/);
  if (detailMatch?.[1]) {
    const id = detailMatch[1];
    // Keep `/products/new` on the create route.
    if (id === "new") return null;
    return { id, isEdit: false };
  }

  return null;
}

async function serveNotFound(request: NextRequest): Promise<NextResponse> {
  const notFoundUrl = new URL("/_not-found", request.nextUrl.origin);
  const response = await fetch(notFoundUrl, {
    headers: {
      Accept: "text/html",
    },
    cache: "no-store",
  });

  const body = await response.text();

  return new NextResponse(body, {
    status: 404,
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "no-store",
    },
  });
}
