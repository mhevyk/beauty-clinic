import { lazy } from "react";
import { RouteObject } from "react-router-dom";

import AuthLayout from "@/layouts/auth-layout/AuthLayout";
import AppSuspense from "@/routes/helpers/AppSuspense";

const SignUpPage = lazy(() => import("@/pages/sign-up/SignUpPage.tsx"));
const SignInPage = lazy(() => import("@/pages/sign-in/SignInPage.tsx"));
const ResetPasswordPage = lazy(() => import("@/pages/reset-password/ResetPasswordPage.tsx"));

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
