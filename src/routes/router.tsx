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
import ResetPasswordpage from "@pages/ResetPasswordPage";
import BookSessionPage from "@pages/BookSessionPage";
import PostPage from "@pages/PostPage";
import CartPage from "@pages/CartPage";

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
          {
            path: "book-session",
            children: [{ path: ":treatmentId", element: <BookSessionPage /> }],
          },
          {
            path: "posts",
            children: [
              { index: true, element: <p>Posts page</p> },
              { path: ":postId", element: <PostPage /> },
            ],
          },
          { path: "cart", element: <CartPage /> },
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
              { path: "reset-password", element: <ResetPasswordpage /> },
            ],
          },
        ],
      },
      // TODO: replace with actual protected routes
      {
        element: <ProtectedRoute />,
        children: [{ path: "protected", element: <h1>I am protected</h1> }],
      },
      /* Add new routes here
         Example: { path: "/test", element: <MyComponent /> }
      */
    ],
  },
  { path: "*", element: <NotFoundPage /> },
];

export default router;
