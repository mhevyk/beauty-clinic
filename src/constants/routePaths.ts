import createFullRoutePaths from "@/utils/create-full-route-paths/createFullRoutePaths";

type RouteNode = {
  path: string;
  [key: string]: RouteNode | string | undefined;
};

export type RoutePaths = Omit<RouteNode, "path">;

const pathsTree = {
  home: {
    path: "/",
  },
  treatments: {
    path: "/treatments",
  },
  bookingForm: {
    path: "booking-form",
    details: {
      path: ":treatmentId",
    },
  },
  bookSession: {
    path: "/book-session",
    details: {
      path: ":treatmentId",
    },
  },
  posts: {
    path: "/posts",
    details: {
      path: ":postId",
    },
    create: {
      path: "create",
    },
    edit: {
      path: ":postId/edit",
    },
  },
  cart: {
    path: "/cart",
  },
  auth: {
    path: "/auth",
    signUp: {
      path: "signup",
    },
    signIn: {
      path: "signin",
    },
    resetPassword: {
      path: "reset-password",
    },
  },
} as const satisfies RoutePaths;

const routePaths: RoutePaths = createFullRoutePaths(pathsTree);
export { routePaths };
