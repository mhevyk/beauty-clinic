import { RouterProvider, createBrowserRouter } from "react-router-dom";

import AppSnackbar from "@/components/app-snackbar/AppSnackbar";
import useRefreshToken from "@/hooks/use-refresh-token/useRefreshToken";
import routes from "@/routes/routes";

export default function App() {
  useRefreshToken();

  return (
    <>
      <RouterProvider router={createBrowserRouter(routes)} />
      <AppSnackbar />
    </>
  );
}
