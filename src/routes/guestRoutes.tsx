import { lazy } from "react";
import { RouteObject } from "react-router-dom";

import AppSuspense from "@/routes/helpers/AppSuspense";

const PostPage = lazy(() => import("@/pages/post/PostPage"));

const BlogPage = lazy(() => import("@/pages/blog/BlogPage"));

const HomePage = lazy(() => import("@/pages/home/HomePage.tsx"));
const TreatmentsPage = lazy(
  () => import("@/pages/treatments/TreatmentsPage.tsx")
);
const BookingFormPage = lazy(
  () => import("@/pages/booking-form/BookingFormPage.tsx")
);
const BookSessionPage = lazy(
  () => import("@/pages/book-session/BookSessionPage.tsx")
);
const CartPage = lazy(() => import("@/pages/cart/CartPage.tsx"));
const CreatePostPage = lazy(
  () => import("@/pages/create-post/CreatePostPage.tsx")
);
const EditPostPage = lazy(() => import("@/pages/edit-post/EditPostPage.tsx"));

const guestRoutes: RouteObject[] = [
  {
    element: <AppSuspense />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "treatments", element: <TreatmentsPage /> },
      {
        path: "booking-form",
        children: [
          { index: true, element: <BookingFormPage /> },
          { path: ":treatmentId", element: <BookingFormPage /> },
        ],
      },
      {
        path: "book-session",
        children: [{ path: ":treatmentId", element: <BookSessionPage /> }],
      },
      {
        path: "posts",
        children: [
          { index: true, element: <BlogPage /> },
          { path: ":postId", element: <PostPage /> },
        ],
      },
      { path: "cart", children: [{ index: true, element: <CartPage /> }] },
      // TODO: refactor routes to make it more fancy
      { path: "posts/create", element: <CreatePostPage /> },
      { path: "posts/:postId/edit", element: <EditPostPage /> },
    ],
  },
];

export default guestRoutes;
