import { HttpLink } from "@apollo/client";

export default new HttpLink({
  uri: import.meta.env.VITE_GRAPHQL_API_URL,
  credentials: "include",
});
