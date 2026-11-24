import { appConfig } from "@/config/app.config";

export class ApiError extends Error {
  readonly status: number;
  readonly statusText: string;
  readonly body: unknown;

  constructor(status: number, statusText: string, body: unknown, message?: string) {
    super(message ?? `Request failed with status ${status}`);
    this.name = "ApiError";
    this.status = status;
    this.statusText = statusText;
    this.body = body;
  }
}

export class NetworkError extends Error {
  constructor(message = "Network request failed. Check your connection and try again.") {
    super(message);
    this.name = "NetworkError";
  }
}

export type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export interface RequestOptions {
  method?: HttpMethod;
  body?: unknown;
  signal?: AbortSignal;
  headers?: HeadersInit;
  /** Query string parameters. Undefined values are omitted. */
  searchParams?: Record<string, string | number | boolean | undefined | null>;
}

function buildUrl(path: string, searchParams?: RequestOptions["searchParams"]): string {
  const url = new URL(path.replace(/^\//, ""), `${appConfig.api.baseUrl}/`);

  if (searchParams) {
    for (const [key, value] of Object.entries(searchParams)) {
      if (value === undefined || value === null) continue;
      url.searchParams.set(key, String(value));
    }
  }

  return url.toString();
}

async function parseBody(response: Response): Promise<unknown> {
  const contentType = response.headers.get("content-type") ?? "";

  if (contentType.includes("application/json")) {
    try {
      return await response.json();
    } catch {
      return null;
    }
  }

  const text = await response.text();
  return text.length > 0 ? text : null;
}

/**
 * Typed fetch wrapper for DummyJSON (and future APIs).
 * Throws ApiError for HTTP failures and NetworkError for connectivity issues.
 */
export async function httpRequest<T>(path: string, options: RequestOptions = {}): Promise<T> {
  const { method = "GET", body, signal, headers, searchParams } = options;
  const url = buildUrl(path, searchParams);

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), appConfig.api.defaultTimeoutMs);

  const onAbort = () => controller.abort();
  signal?.addEventListener("abort", onAbort);

  try {
    const response = await fetch(url, {
      method,
      signal: controller.signal,
      headers: {
        Accept: "application/json",
        ...(body !== undefined ? { "Content-Type": "application/json" } : {}),
        ...headers,
      },
      body: body !== undefined ? JSON.stringify(body) : undefined,
      cache: "no-store",
    });

    const parsed = await parseBody(response);

    if (!response.ok) {
      throw new ApiError(
        response.status,
        response.statusText,
        parsed,
        typeof parsed === "object" &&
          parsed !== null &&
          "message" in parsed &&
          typeof parsed.message === "string"
          ? parsed.message
          : `Request failed with status ${response.status}`,
      );
    }

    return parsed as T;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }

    if (error instanceof DOMException && error.name === "AbortError") {
      throw new NetworkError("Request timed out. Please try again.");
    }

    if (error instanceof TypeError) {
      throw new NetworkError();
    }

    throw error;
  } finally {
    clearTimeout(timeoutId);
    signal?.removeEventListener("abort", onAbort);
  }
}
