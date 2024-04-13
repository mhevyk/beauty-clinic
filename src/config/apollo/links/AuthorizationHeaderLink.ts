import { setContext } from "@apollo/client/link/context";
import { useUserStore } from "@store/user/userStore";

export default setContext((_, { headers }) => {
  const token = useUserStore.getState().accessToken;

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});
