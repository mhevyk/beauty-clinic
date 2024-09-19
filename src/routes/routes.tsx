import { lazy } from "react";
import { RouteObject } from "react-router-dom";

import AppSuspenseWithOutlet from "@/components/app-suspense-with-outlet/AppSuspenseWithOutlet";
import { USER_ROLES } from "@/constants";
import { routePaths } from "@/constants/routePaths";
import AuthLayout from "@/layouts/auth-layout/AuthLayout";
import RootLayout from "@/layouts/root-layout/RootLayout";

const ProtectedRoute = lazy(
  () => import("@/routes/protected-route/ProtectedRoute")
);

const BlogPage = lazy(() => import("@/pages/blog/BlogPage"));
const BookSessionPage = lazy(
  () => import("@/pages/book-session/BookSessionPage")
);
const BookingFormPage = lazy(
  () => import("@/pages/booking-form/BookingFormPage")
);
const CartPage = lazy(() => import("@/pages/cart/CartPage"));
const CreatePostPage = lazy(() => import("@/pages/create-post/CreatePostPage"));
const EditPostPage = lazy(() => import("@/pages/edit-post/EditPostPage"));
const HomePage = lazy(() => import("@/pages/home/HomePage"));
const PostPage = lazy(() => import("@/pages/post/PostPage"));
const ResetPasswordPage = lazy(
  () => import("@/pages/reset-password/ResetPasswordPage")
);
const SignInPage = lazy(() => import("@/pages/sign-in/SignInPage"));
const SignUpPage = lazy(() => import("@/pages/sign-up/SignUpPage"));
const TreatmentsPage = lazy(() => import("@/pages/treatments/TreatmentsPage"));

const ErrorPage = lazy(() => import("@/pages/error/ErrorPage.tsx"));
const NotFoundPage = lazy(() => import("@/pages/not-found/NotFoundPage.tsx"));

const routes: RouteObject[] = [
  {
    path: routePaths.home.path,
    errorElement: (
      <AppSuspenseWithOutlet>
        <ErrorPage />
      </AppSuspenseWithOutlet>
    ),
    children: [
      {
        element: <RootLayout />,
        children: [
          { index: true, element: <HomePage /> },
          { path: routePaths.treatments.path, element: <TreatmentsPage /> },
          { path: routePaths.bookingForm.path, element: <BookingFormPage /> },
          {
            path: routePaths.bookingForm.details.path,
            element: <BookingFormPage />,
          },
          {
            path: routePaths.bookSession.details.path,
            element: <BookSessionPage />,
          },
          { path: routePaths.posts.path, element: <BlogPage /> },
          { path: routePaths.posts.details.path, element: <PostPage /> },
          {
            path: routePaths.posts.create.path,
            element: (
              <ProtectedRoute
                element={<CreatePostPage />}
                allowedRoles={[USER_ROLES.USER, USER_ROLES.ADMIN]}
              />
            ),
          },
          {
            path: routePaths.posts.edit.path,
            element: (
              <ProtectedRoute
                element={<EditPostPage />}
                allowedRoles={[USER_ROLES.USER, USER_ROLES.ADMIN]}
              />
            ),
          },
          { path: routePaths.cart.path, element: <CartPage /> },
        ],
      },
      {
        element: <AuthLayout />,
        children: [
          { path: routePaths.auth.signUp.path, element: <SignUpPage /> },
          { path: routePaths.auth.signIn.path, element: <SignInPage /> },
          {
            path: routePaths.auth.resetPassword.path,
            element: <ResetPasswordPage />,
          },
        ],
      },
    ],
  },
  {
    path: routePaths.any.path,
    element: (
      <AppSuspenseWithOutlet>
        <NotFoundPage />
      </AppSuspenseWithOutlet>
    ),
  },
];

export default routes;
