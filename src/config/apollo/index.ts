import { ApolloClient, ApolloLink, InMemoryCache } from "@apollo/client";

import AuthorizationHeaderLink from "./links/AuthorizationHeaderLink";
import HttpLink from "./links/HttpLink";
import RefreshTokenLink from "./links/RefreshTokenLink";

const cache = new InMemoryCache();

export const client = new ApolloClient({
  link: ApolloLink.from([RefreshTokenLink, AuthorizationHeaderLink, HttpLink]),
  cache,
});
