import concatUrls from "@/utils/concat-urls/concatUrls";

export default function fetchAccessToken(
  options?: Omit<RequestInit, "method" | "credentials">
) {
  const refreshTokenUrl = concatUrls(
    import.meta.env.VITE_REST_API_URL,
    "/refresh_token"
  );

  return fetch(refreshTokenUrl, {
    method: "POST",
    credentials: "include",
    ...options,
  });
}
