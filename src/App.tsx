import { RouterProvider, createBrowserRouter } from "react-router-dom";
import router from "./router";
import useRefreshToken from "@hooks/useRefreshToken";
import { CircularProgress } from "@mui/material";

export default function App() {
  const { isRefreshingToken } = useRefreshToken();

  // TODO: change UI if needed
  if (isRefreshingToken) {
    return <CircularProgress size={50} />;
  }

  return <RouterProvider router={createBrowserRouter(router)} />;
}
