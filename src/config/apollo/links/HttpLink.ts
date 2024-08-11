import { HttpLink } from "@apollo/client";

import concatUrls from "@/utils/concat-urls/concatUrls";

export default new HttpLink({
  uri: concatUrls(import.meta.env.VITE_API_URL, "/graphql"),
  credentials: "include",
});
