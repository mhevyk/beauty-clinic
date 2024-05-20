import { lazy } from "react";
import { RouteObject } from "react-router-dom";

import RootLayout from "@layouts/RootLayout";
import ProtectedRoute from "@routes/helpers/ProtectedRoute";

import guestRoutes from "./guestRoutes";
import authRoutes from "./authRoutes";
import protectedRoutes from "./protectedRoutes";

const ErrorPage = lazy(() => import("@pages/ErrorPage"));
const NotFoundPage = lazy(() => import("@pages/NotFoundPage"));

const router: RouteObject[] = [
  {
    path: "/",
    errorElement: <ErrorPage />,
    children: [
      {
        element: <RootLayout />,
        children: guestRoutes,
      },
      {
        path: "auth",
        element: <ProtectedRoute protectionMode="no-auth" redirectPath="/" />,
        children: authRoutes,
      },
      {
        element: <ProtectedRoute />,
        children: protectedRoutes,
      },
    ],
  },
  { path: "*", element: <NotFoundPage /> },
];

export default router;
