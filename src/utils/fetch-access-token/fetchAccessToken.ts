export default function fetchAccessToken(
  options?: Omit<RequestInit, "method" | "credentials">
) {
  const refreshTokenUrl = import.meta.env.VITE_REST_API_URL;

  return fetch(refreshTokenUrl, {
    method: "POST",
    credentials: "include",
    ...options,
  });
}
