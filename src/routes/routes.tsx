import { lazy } from "react";
import { RouteObject } from "react-router-dom";

import RootLayout from "@/layouts/root-layout/RootLayout";
import ProtectedRoute from "@/routes/helpers/ProtectedRoute";

import authRoutes from "./authRoutes";
import guestRoutes from "./guestRoutes";
import AppSuspense from "./helpers/AppSuspense";
import protectedRoutes from "./protectedRoutes";

const ErrorPage = lazy(() => import("@/pages/error/ErrorPage.tsx"));
const NotFoundPage = lazy(() => import("@/pages/not-found/NotFoundPage.tsx"));

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
