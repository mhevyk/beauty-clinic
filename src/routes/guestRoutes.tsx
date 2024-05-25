import { lazy } from "react";
import { RouteObject } from "react-router-dom";

import AppSuspense from "@routes/helpers/AppSuspense";

const HomePage = lazy(() => import("@pages/HomePage"));
const TreatmentsPage = lazy(() => import("@pages/TreatmentsPage"));
const BookingFormPage = lazy(() => import("@pages/BookingFormPage"));
const BookSessionPage = lazy(() => import("@pages/BookSessionPage"));
const PostPage = lazy(() => import("@pages/PostPage"));

const guestRoutes: RouteObject[] = [
  {
    element: <AppSuspense />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "treatments", element: <TreatmentsPage /> },
      {
        path: "booking-form",
        children: [{ path: ":treatmentId", element: <BookingFormPage /> }],
      },
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
    ],
  },
];

export default guestRoutes;