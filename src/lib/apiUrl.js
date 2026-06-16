export function apiUrl(path) {
  const base = (process.env.NEXT_PUBLIC_API_BASE || "").replace(/\/$/, "");
  // Join base and /api/path while avoiding double slashes
  const url = `${base}/api/${path}`;
  return url.replace(/([^:]\/)\/+/g, "$1");
}
