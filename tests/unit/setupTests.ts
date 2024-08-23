import { cleanup } from "@testing-library/react";

import "@testing-library/jest-dom";
import { TextEncoder } from "util";

afterEach(() => {
  cleanup();
  jest.clearAllMocks();
  jest.restoreAllMocks();
});

global.TextEncoder = TextEncoder;

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});
