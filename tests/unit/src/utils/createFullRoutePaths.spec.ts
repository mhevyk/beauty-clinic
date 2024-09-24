import { RoutePaths } from "@/constants/routePaths";
import createFullRoutePaths from "@/utils/create-full-route-paths/createFullRoutePaths";

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
  any: {
    path: "*",
  },
};

describe("createFullRoutePaths", () => {
  let routePaths: typeof pathsTree;

  beforeEach(() => {
    routePaths = createFullRoutePaths(pathsTree) as typeof pathsTree;
  });

  it("should return correct root path", () => {
    expect(routePaths.home.path).toBe("/");
  });
  it("should return correct path for nested route", () => {
    expect(routePaths.treatments.path).toBe("/treatments");
  });
  it("should return correct path for nested route with params", () => {
    expect(routePaths.posts.path).toBe("/posts");
    expect(routePaths.posts.create.path).toBe("/posts/create");
    expect(routePaths.posts.edit.path).toBe("/posts/:postId/edit");

    expect(routePaths.bookingForm.path).toBe("booking-form");
    expect(routePaths.bookingForm.details.path).toBe(
      "/booking-form/:treatmentId"
    );
  });
  it("should return correct path for non-existed route", () => {
    expect((routePaths as RoutePaths).nlkn).toBe("*");
    expect(routePaths.any?.path).toBe("*");
  });
});
