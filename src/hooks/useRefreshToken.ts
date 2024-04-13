import { useUserStore } from "@store/user/userStore";
import fetchAccessToken from "@utils/fetchAccessToken";
import { useEffect } from "react";

type RefreshTokenResponse = {
  ok: boolean;
  accessToken: string;
};

export default function useRefreshToken() {
  const setAccessToken = useUserStore((store) => store.setAccessToken);
  const setIsAuthenticating = useUserStore(
    (store) => store.setIsAuthenticating
  );

  useEffect(() => {
    setIsAuthenticating(true);

    const controller = new AbortController();
    const signal = controller.signal;

    fetchAccessToken({ signal })
      .then(async (response) => {
        const data = (await response.json()) as RefreshTokenResponse;
        setAccessToken(data.accessToken);
      })
      .catch((error) => {
        if (error.name === "AbortError") {
          return; //request is canceled here
        }

        // TODO: handle and show error in snackbar
        setAccessToken(null);
      })
      .finally(() => {
        if (!signal.aborted) {
          setIsAuthenticating(false);
        }
      });

    return () => controller.abort();
  }, []);
}
