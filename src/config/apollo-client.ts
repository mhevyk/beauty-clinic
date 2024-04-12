import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { useUserStore } from "@store/user/userStore";
import concatUrls from "@utils/concatUrls";

const httpLink = createHttpLink({
  uri: concatUrls(import.meta.env.VITE_API_URL, "/graphql"),
});

const authLink = setContext((_, { headers }) => {
  const accessToken = useUserStore.getState().accessToken;

  return {
    headers: {
      ...headers,
      authorization: accessToken ? `Bearer ${accessToken}` : "",
    },
  };
});

export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});
