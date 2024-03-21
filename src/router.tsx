import { RouteObject } from "react-router-dom";
import RootLayout from "@layouts/RootLayout";
import ErrorPage from "@pages/ErrorPage";
import HomePage from "@pages/HomePage";
import NotFoundPage from "@pages/NotFoundPage";
import SignUpPage from "@pages/Auth/SignUpPage";
import AuthLayout from "@layouts/AuthLayout";
import SignInPage from "@pages/Auth/SignInPage";
import OrderPage from "@pages/OrderPage";

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
        children: [
          { path: "signup", element: <SignUpPage /> },
          { path: "signin", element: <SignInPage /> },
        ],
      },
      { path: "order", element: <OrderPage /> },
      /* Add new routes here
         Example: { path: "/test", element: <MyComponent /> }
      */
    ],
  },
  { path: "*", element: <NotFoundPage /> },
];

export default router;
