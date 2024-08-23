import { cleanup } from "@testing-library/react";

import "@testing-library/jest-dom";
import { TextEncoder } from "util";

afterEach(() => {
  cleanup();
  jest.clearAllMocks();
  jest.restoreAllMocks();
});

global.TextEncoder = TextEncoder;
