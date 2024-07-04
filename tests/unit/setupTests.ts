import { cleanup } from "@testing-library/react";

import "@testing-library/jest-dom";

afterEach(() => {
  cleanup();
  jest.clearAllMocks();
  jest.restoreAllMocks();
});
