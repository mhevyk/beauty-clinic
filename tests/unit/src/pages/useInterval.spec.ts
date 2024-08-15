import { act, renderHook } from "@testing-library/react";

import useInterval from "@/pages/HomePage/components/Testimonials/hooks/useInterval";

describe("useInterval()", () => {
  jest.useFakeTimers();

  it("should call onTick at specified intervals", () => {
    const onTick = jest.fn();
    const duration = 1000;

    renderHook(() => useInterval({ onTick, duration }));

    act(() => {
      jest.advanceTimersByTime(3000);
    });

    expect(onTick).toHaveBeenCalledTimes(3);
  });

  it("should stop the interval when stopInterval is called", () => {
    const onTick = jest.fn();
    const duration = 1000;

    const { result } = renderHook(() => useInterval({ onTick, duration }));

    act(() => {
      result.current.stopInterval();
    });

    act(() => {
      jest.advanceTimersByTime(3000);
    });

    expect(onTick).toHaveBeenCalledTimes(0);
  });

  it("should restart the interval when startInterval is called", () => {
    const onTick = jest.fn();
    const duration = 1000;

    const { result } = renderHook(() => useInterval({ onTick, duration }));

    act(() => {
      result.current.stopInterval();
    });

    act(() => {
      result.current.startInterval();
    });

    act(() => {
      jest.advanceTimersByTime(3000);
    });

    expect(onTick).toHaveBeenCalledTimes(3);
  });
});
