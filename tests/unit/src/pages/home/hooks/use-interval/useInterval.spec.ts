import { act, renderHook } from "@testing-library/react";

import useInterval from "@/pages/home/hooks/use-interval/useInterval.ts";

jest.useFakeTimers();

describe("useInterval()", () => {
  const onTick = jest.fn();
  const duration = 1000;

  it("should start the interval and call onTick after the specified duration", () => {
    renderHook(() => useInterval({ onTick, duration }));

    expect(onTick).not.toHaveBeenCalled();
    act(() => {
      jest.advanceTimersToNextTimer();
    });
    expect(onTick).toHaveBeenCalledTimes(1);
  });

  it("should stop the interval when stopInterval is called", () => {
    const { unmount } = renderHook(() => useInterval({ onTick, duration }));

    act(() => {
      jest.advanceTimersToNextTimer();
    });
    expect(onTick).toHaveBeenCalledTimes(1);

    unmount();

    act(() => {
      jest.advanceTimersToNextTimer();
    });

    expect(onTick).toHaveBeenCalledTimes(1);
  });

  it("should stop and restart the interval using stopInterval and startInterval", () => {
    const { result } = renderHook(() => useInterval({ onTick, duration }));

    act(() => {
      jest.advanceTimersToNextTimer();
    });
    expect(onTick).toHaveBeenCalledTimes(1);

    act(() => {
      result.current.stopInterval();
    });

    act(() => {
      jest.advanceTimersToNextTimer();
    });
    expect(onTick).toHaveBeenCalledTimes(1);

    act(() => {
      result.current.startInterval();
    });

    act(() => {
      jest.advanceTimersToNextTimer();
    });
    expect(onTick).toHaveBeenCalledTimes(2);
  });
});
