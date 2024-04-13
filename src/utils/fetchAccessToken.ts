import concatUrls from "@utils/concatUrls";

export default function fetchAccessToken(
  options?: Omit<RequestInit, "method" | "credentials">
) {
  const refreshTokenUrl = concatUrls(
    import.meta.env.VITE_API_URL,
    "/refresh_token"
  );

  return fetch(refreshTokenUrl, {
    method: "POST",
    credentials: 'include',
    ...options,
  });
}
