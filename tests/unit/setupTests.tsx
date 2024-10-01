import { cleanup } from "@testing-library/react";
import { PropsWithChildren } from "react";

import "@testing-library/jest-dom";
import { TextEncoder } from "util";

afterEach(() => {
  cleanup();
  jest.clearAllMocks();
  jest.restoreAllMocks();
});

jest.mock("react-helmet-async", () => ({
  Helmet: ({ children }: PropsWithChildren) => <>{children}</>,
}));

global.TextEncoder = TextEncoder;
