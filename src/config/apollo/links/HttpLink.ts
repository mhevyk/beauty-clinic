import { HttpLink } from "@apollo/client";
import fetch from "cross-fetch";

export default new HttpLink({
  uri: import.meta.env.VITE_GRAPHQL_API_URL,
  credentials: "include",
  fetch,
});
