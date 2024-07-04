import { TokenRefreshLink } from "apollo-link-token-refresh";

import { useUserStore } from "@/store/user/userStore";
import fetchAccessToken from "@/utils/fetchAccessToken";

import isTokenExpired from "../utils/isTokenExpired";

export default new TokenRefreshLink({
  accessTokenField: "accessToken",
  isTokenValidOrUndefined: async () => {
    const token = useUserStore.getState().accessToken;

    if (token === null) {
      return true;
    }

    return !isTokenExpired(token);
  },
  fetchAccessToken: fetchAccessToken,
  handleFetch: accessToken => {
    useUserStore.getState().setAccessToken(accessToken);
  },
});
