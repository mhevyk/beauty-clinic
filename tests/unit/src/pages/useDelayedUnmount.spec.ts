import { act, renderHook } from "@testing-library/react";

import { useDelayedUnmount } from "@/layouts/footer/hooks/useDelayedUnmount";

const delay = 1000; // 1 second

describe("useDelayedUnmount()", () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  it("should shouldRender with value 'false' by default", () => {
    const { result } = renderHook(() => useDelayedUnmount(delay));
    expect(result.current[0]).toBe(false);
  });

  it("should mount, wait for delay and then unmount", () => {
    const { result } = renderHook(() => useDelayedUnmount(delay));

    act(() => {
      result.current[1]();
    });

    expect(result.current[0]).toBe(true);

    act(() => {
      jest.advanceTimersByTime(delay);
    });

    expect(result.current[0]).toBe(false);
  });
});
