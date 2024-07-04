import { RouteObject } from "react-router-dom";

import AppSuspense from "@/routes/helpers/AppSuspense";

// TODO: add protected routes
const protectedRoutes: RouteObject[] = [
  {
    element: <AppSuspense />,
    children: [{ path: "protected", element: <h1>I am protected route!</h1> }],
  },
];

export default protectedRoutes;
