import { act, renderHook } from "@testing-library/react";

import useDebouncedValue from "@/hooks/useDebouncedValue";

const renderHookWithValue = (value: string, delay?: number) => {
  return renderHook(({ value, delay }) => useDebouncedValue(value, delay), {
    initialProps: { value, delay },
  });
};

describe("useDebouncedValue()", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it("should return the initial value immediately", () => {
    const { result } = renderHookWithValue("initial value");
    expect(result.current).toBe("initial value");
  });

  it("should update the debounced value after the specified delay", () => {
    const delayMS = 500;
    const { result, rerender } = renderHookWithValue("initial value");

    rerender({ value: "new value", delay: delayMS });

    expect(result.current).toBe("initial value");

    act(() => {
      jest.advanceTimersByTime(delayMS);
    });

    expect(result.current).toBe("new value");
  });

  it("should reset the timer if the value changes before the delay", () => {
    const { result, rerender } = renderHookWithValue("initial value");

    rerender({ value: "new value 1", delay: 500 });

    act(() => {
      jest.advanceTimersByTime(300);
    });

    rerender({ value: "new value 2", delay: 500 });

    expect(result.current).toBe("initial value");

    act(() => {
      jest.advanceTimersByTime(200);
    });

    expect(result.current).toBe("initial value");

    act(() => {
      jest.advanceTimersByTime(300);
    });

    expect(result.current).toBe("new value 2");
  });
});
