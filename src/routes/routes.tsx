import { lazy } from "react";
import { RouteObject } from "react-router-dom";

import RootLayout from "@/layouts/RootLayout";
import ProtectedRoute from "@routes/helpers/ProtectedRoute";

import guestRoutes from "./guestRoutes";
import authRoutes from "./authRoutes";
import protectedRoutes from "./protectedRoutes";
import AppSuspense from "./helpers/AppSuspense";

const ErrorPage = lazy(() => import("@/pages/ErrorPage"));
const NotFoundPage = lazy(() => import("@/pages/NotFoundPage"));

const routes: RouteObject[] = [
  {
    path: "/",
    errorElement: (
      <AppSuspense>
        <ErrorPage />
      </AppSuspense>
    ),
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
  {
    path: "*",
    element: (
      <AppSuspense>
        <NotFoundPage />
      </AppSuspense>
    ),
  },
];

export default routes;
