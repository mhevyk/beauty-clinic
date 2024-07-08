import { render, screen } from "@testing-library/react";

import ErrorBoundary from "@/components/ErrorBoundary";

class TestError extends Error {}

const ThrowError = () => {
  throw new TestError("Test error");
};

describe("<ErrorBoundary />", () => {
  beforeEach(() => {
    // Don't clutter the console with expected error text
    // Also used in tests for react-error-boundary: https://github.com/bvaughn/react-error-boundary/blob/master/src/ErrorBoundary.test.tsx
    jest.spyOn(console, "error").mockImplementation(() => {});
  });

  it("should render children when no error is thrown", () => {
    render(
      <ErrorBoundary>
        <div data-testid="child">Child Component</div>
      </ErrorBoundary>
    );

    expect(screen.getByTestId("child")).toBeInTheDocument();
  });

  it("should render fallback when an error is thrown", () => {
    render(
      <ErrorBoundary
        fallback={<div data-testid="fallback">Fallback Component</div>}
      >
        <ThrowError />
      </ErrorBoundary>
    );

    expect(ThrowError).toThrow();
    expect(screen.getByTestId("fallback")).toBeInTheDocument();
  });

  it("should call onError when an error is thrown", () => {
    const onErrorMock = jest.fn();

    render(
      <ErrorBoundary
        onError={onErrorMock}
        fallback={<div>Fallback Component</div>}
      >
        <ThrowError />
      </ErrorBoundary>
    );

    expect(ThrowError).toThrow();
    expect(onErrorMock).toHaveBeenCalledWith(
      expect.any(TestError),
      expect.any(Object)
    );
  });

  it("should render fallback function when an error is thrown", () => {
    const fallback = jest.fn((error: TestError | null) => (
      <div data-testid="fallback">{error?.message}</div>
    ));

    render(
      <ErrorBoundary fallback={fallback}>
        <ThrowError />
      </ErrorBoundary>
    );

    expect(ThrowError).toThrow();
    expect(screen.getByTestId("fallback")).toHaveTextContent("Test error");
    expect(fallback).toHaveBeenCalledWith(expect.any(TestError));
  });
});
