import { RouteObject } from "react-router-dom";
import RootLayout from "@layouts/RootLayout";
import ErrorPage from "@pages/ErrorPage";
import HomePage from "@pages/HomePage";
import NotFoundPage from "@pages/NotFoundPage";
import SignUpPage from "@pages/SignUpPage";
import AuthLayout from "@layouts/AuthLayout";
import SignInPage from "@pages/SignInPage";
import TreatmentsPage from "@pages/TreatmentsPage";
import ProtectedRoute from "@routes/helpers/ProtectedRoute";
import OrderPage from "@pages/OrderPage";

const router: RouteObject[] = [
  {
    path: "/",
    errorElement: <ErrorPage />,
    children: [
      {
        element: <RootLayout />,
        children: [
          { index: true, element: <HomePage /> },
          { path: "treatments", element: <TreatmentsPage /> },
          { path: "order", element: <OrderPage /> },
        ],
      },
      {
        path: "auth",
        element: <ProtectedRoute protectionMode="no-auth" redirectPath="/" />,
        children: [
          {
            element: <AuthLayout />,
            children: [
              { path: "signup", element: <SignUpPage /> },
              { path: "signin", element: <SignInPage /> },
            ],
          },
        ],
      },
      // TODO: replace with actual protected routes
      {
        element: <ProtectedRoute />,
        children: [{ path: "protected", element: <h1>I am protected</h1> }],
      },
      {
        element: <RootLayout />,
        path: "book-session",
        children: [{ path: ":treatmentId", element: <OrderPage /> }],
      },
      /* Add new routes here
         Example: { path: "/test", element: <MyComponent /> }
      */
    ],
  },
  { path: "*", element: <NotFoundPage /> },
];

export default router;
