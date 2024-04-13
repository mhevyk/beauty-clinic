import { ApolloClient, InMemoryCache, ApolloLink } from "@apollo/client";
import AuthorizationHeaderLink from "./links/AuthorizationHeaderLink";
import RefreshTokenLink from "./links/RefreshTokenLink";
import HttpLink from "./links/HttpLink";

const cache = new InMemoryCache();

export const client = new ApolloClient({
  link: ApolloLink.from([RefreshTokenLink, AuthorizationHeaderLink, HttpLink]),
  cache,
});
