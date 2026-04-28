const DEFAULT_API_BASE_URL = "/api";

function normalizeBaseUrl(value) {
  const raw = String(value || DEFAULT_API_BASE_URL).trim();
  return raw.endsWith("/") ? raw.slice(0, -1) : raw;
}

const API_BASE_URL = normalizeBaseUrl(import.meta.env.VITE_API_BASE_URL);

export class ApiError extends Error {
  constructor(message, status = 0, data = null) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.data = data;
  }
}

function buildHeaders(headers = {}, hasJsonBody = false, token) {
  const nextHeaders = { ...headers };

  if (hasJsonBody && !nextHeaders["Content-Type"]) {
    nextHeaders["Content-Type"] = "application/json";
  }

  if (token) {
    nextHeaders.Authorization = `Bearer ${token}`;
  }

  return nextHeaders;
}

async function parseResponseBody(response) {
  const contentType = response.headers.get("content-type") || "";

  if (!contentType.includes("application/json")) {
    const text = await response.text();
    return text ? { message: text } : null;
  }

  return response.json();
}

function resolveErrorMessage(data, fallback = "Request failed") {
  if (!data) {
    return fallback;
  }

  if (typeof data === "string") {
    return data;
  }

  if (typeof data.detail === "string") {
    return data.detail;
  }

  if (Array.isArray(data.detail)) {
    return data.detail
      .map((item) => {
        if (typeof item === "string") {
          return item;
        }

        if (item && typeof item.msg === "string") {
          return item.msg;
        }

        return "";
      })
      .filter(Boolean)
      .join(", ");
  }

  if (typeof data.message === "string") {
    return data.message;
  }

  return fallback;
}

export async function apiRequest(path, options = {}) {
  const urlPath = path.startsWith("/") ? path : `/${path}`;
  const url = `${API_BASE_URL}${urlPath}`;
  const { body, headers, token, ...restOptions } = options;
  const hasJsonBody = body !== undefined && body !== null && typeof body !== "string";

  const response = await fetch(url, {
    ...restOptions,
    credentials: "include",
    headers: buildHeaders(headers, hasJsonBody, token),
    body: hasJsonBody ? JSON.stringify(body) : body,
  });

  const data = await parseResponseBody(response);

  if (!response.ok) {
    throw new ApiError(resolveErrorMessage(data), response.status, data);
  }

  return data;
}

export { API_BASE_URL };
