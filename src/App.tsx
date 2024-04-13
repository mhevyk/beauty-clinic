import { RouterProvider, createBrowserRouter } from "react-router-dom";
import router from "./router";
import useRefreshToken from "@hooks/useRefreshToken";

export default function App() {
   useRefreshToken();

  return <RouterProvider router={createBrowserRouter(router)} />;
}
