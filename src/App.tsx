import { RouterProvider, createBrowserRouter } from "react-router-dom";
import routes from "./routes/routes";
import useRefreshToken from "@hooks/auth/useRefreshToken";
import AppSnackbar from "@components/AppSnackbar";

export default function App() {
  useRefreshToken();

  return (
    <>
      <RouterProvider router={createBrowserRouter(routes)} />
      <AppSnackbar />
    </>
  );
}
