import { lazy } from "react";
import { RouteObject } from "react-router-dom";

import AuthLayout from "@/layouts/auth-layout/AuthLayout";
import AppSuspense from "@/routes/helpers/AppSuspense";

const SignUpPage = lazy(() => import("@/pages/SignUpPage"));
const SignInPage = lazy(() => import("@/pages/SignInPage"));
const ResetPasswordPage = lazy(() => import("@/pages/ResetPasswordPage"));

const authRoutes: RouteObject[] = [
  {
    element: <AuthLayout />,
    children: [
      {
        element: <AppSuspense />,
        children: [
          { path: "signup", element: <SignUpPage /> },
          { path: "signin", element: <SignInPage /> },
          { path: "reset-password", element: <ResetPasswordPage /> },
        ],
      },
    ],
  },
];

export default authRoutes;
