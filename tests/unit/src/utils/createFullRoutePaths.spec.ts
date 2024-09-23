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
  any: {
    path: "*",
  },
};

const routePaths = createFullRoutePaths(pathsTree) as typeof pathsTree;

describe("createFullRoutePaths", () => {
  it("should return correct root path", () => {
    expect(routePaths.home.path).toBe("/");
  });
  it("should return correct path for nested route", () => {
    expect(routePaths.treatments.path).toBe("/treatments");
  });
  it("should return correct path for nested route with params", () => {
    expect(routePaths.bookingForm.path).toBe("booking-form");
    expect(routePaths.bookingForm.details.path).toBe(
      "/booking-form/:treatmentId"
    );
  });
  it("should return correct path for non-existed route", () => {
    const routePaths = createFullRoutePaths(pathsTree) as Record<
      string,
      { path: string }
    >;

    expect(routePaths.nlkn).toBe("*");
    expect(routePaths.any?.path).toBe("*");
  });
});
