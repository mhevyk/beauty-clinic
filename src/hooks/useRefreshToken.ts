import { useUserStore } from "@store/user/userStore";
import concatUrls from "@utils/concatUrls";
import { useEffect, useRef, useState } from "react";

const refreshTokenUrl = concatUrls(
  import.meta.env.VITE_API_URL,
  "/refresh_token"
);

type RefreshTokenResponse = {
  ok: boolean;
  accessToken: string;
};

export default function useCheckAuth() {
  const setAccessToken = useUserStore((store) => store.setAccessToken);
  const [isLoading, setIsLoading] = useState(false);
  const abortControllerRef = useRef(new AbortController());

  useEffect(() => {
    abortControllerRef.current = new AbortController();
    setIsLoading(true);

    fetch(refreshTokenUrl, {
      method: "POST",
      credentials: "include",
      signal: abortControllerRef.current.signal,
    })
      .then(async (response) => {
        const data = await response.json() as RefreshTokenResponse;
        setAccessToken(data.accessToken);
      })
      .catch((error) => {
        if (error.name === "AbortError") {
          return; //request is canceled here
        }
        // TODO: handle and show error in snackbar
        setAccessToken(null);
      })
      .finally(() => setIsLoading(false));

    return () => abortControllerRef.current.abort();
  }, []);

  return { isRefreshingToken: isLoading };
}
