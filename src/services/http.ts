export class ApiError extends Error {
  status?: number;
  url?: string;

  constructor(message: string, options?: { status?: number; url?: string; cause?: unknown }) {
    super(message);
    this.name = 'ApiError';
    this.status = options?.status;
    this.url = options?.url;
    if (options?.cause !== undefined) {
      (this as Error & { cause?: unknown }).cause = options.cause;
    }
  }
}

/**
 * Executes fetch with a timeout and converts network failures into ApiError.
 *
 * @param input - Request URL or input.
 * @param init - Fetch options.
 * @param timeoutMs - Abort timeout in milliseconds.
 */
export async function fetchWithTimeout(
  input: RequestInfo | URL,
  init: RequestInit = {},
  timeoutMs = 30_000,
): Promise<Response> {
  const controller = new AbortController();
  const timeoutId = globalThis.setTimeout(() => controller.abort(), timeoutMs);

  try {
    return await fetch(input, { ...init, signal: controller.signal });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Request failed';
    if (error instanceof DOMException && error.name === 'AbortError') {
      throw new ApiError(`Request timed out after ${timeoutMs}ms`, {
        url: String(input),
        cause: error,
      });
    }
    throw new ApiError(message, { url: String(input), cause: error });
  } finally {
    globalThis.clearTimeout(timeoutId);
  }
}

/**
 * Reads a response body as JSON and throws a descriptive error on failure.
 *
 * @param response - Fetch response.
 * @param url - Request URL for diagnostics.
 */
export async function readJson<T>(response: Response, url: string): Promise<T> {
  const text = await response.text();

  if (!response.ok) {
    throw new ApiError(`HTTP ${response.status} ${response.statusText}`, {
      status: response.status,
      url,
      cause: text,
    });
  }

  try {
    return JSON.parse(text) as T;
  } catch (error) {
    throw new ApiError('Invalid JSON response', { url, cause: error });
  }
}

/**
 * Reads a response body as text and throws a descriptive error on failure.
 *
 * @param response - Fetch response.
 * @param url - Request URL for diagnostics.
 */
export async function readText(response: Response, url: string): Promise<string> {
  const text = await response.text();

  if (!response.ok) {
    throw new ApiError(`HTTP ${response.status} ${response.statusText}`, {
      status: response.status,
      url,
      cause: text,
    });
  }

  return text;
}
