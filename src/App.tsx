import { RouterProvider, createBrowserRouter } from "react-router-dom";

import AppSnackbar from "@/components/AppSnackbar";
import useRefreshToken from "@/hooks/auth/useRefreshToken";

import routes from "./routes/routes";

export default function App() {
  useRefreshToken();

  return (
    <>
      <RouterProvider router={createBrowserRouter(routes)} />
      <AppSnackbar />
    </>
  );
}
