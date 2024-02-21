import { RouteObject } from "react-router-dom";
import RootLayout from "./layouts/RootLayout";
import ErrorPage from "./pages/ErrorPage";
import HomePage from "./pages/HomePage";
import NotFoundPage from "./pages/NotFoundPage";

const router: RouteObject[] = [
  {
    path: "/",
    errorElement: <ErrorPage />,
    element: <RootLayout />,
    children: [
      { index: true, element: <HomePage /> },
      /* Add new routes here
         Example: { path: "/test", element: <MyComponent /> }
      */
    ],
  },
  { path: "*", element: <NotFoundPage /> },
];

export default router;
