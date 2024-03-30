import { RouteObject } from "react-router-dom";
import RootLayout from "@layouts/RootLayout";
import ErrorPage from "@pages/ErrorPage";
import HomePage from "@pages/HomePage";
import NotFoundPage from "@pages/NotFoundPage";
import SignUpPage from "@pages/SignUpPage";
import AuthLayout from "@layouts/AuthLayout";

const router: RouteObject[] = [
  {
    path: "/",
    errorElement: <ErrorPage />,
    children: [
      {
        element: <RootLayout />,
        children: [{ index: true, element: <HomePage /> }],
      },
      {
        path: "auth",
        element: <AuthLayout />,
        children: [{ path: "signup", element: <SignUpPage /> }],
      },
    ],
  },
  { path: "*", element: <NotFoundPage /> },
];

export default router;
