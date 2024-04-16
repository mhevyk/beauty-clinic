import { RouterProvider, createBrowserRouter } from "react-router-dom";
import router from "./routes/router";
import useRefreshToken from "@hooks/auth/useRefreshToken";
import AppSnackbar from "@components/AppSnackbar";

export default function App() {
  useRefreshToken();

  return (
    <>
      <RouterProvider router={createBrowserRouter(router)} />
      <AppSnackbar />
    </>
  );
}
