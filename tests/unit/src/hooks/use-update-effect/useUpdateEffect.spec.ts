import { renderHook } from "@testing-library/react";

import useUpdateEffect from "@/hooks/use-update-effect/useUpdateEffect";

const mockCleanup = jest.fn();
const mockCallback = jest.fn(() => mockCleanup);

describe("useUpdateEffect()", () => {
  it("should not call the callback on initial render", () => {
    renderHook(() => useUpdateEffect(mockCallback));
    expect(mockCallback).not.toHaveBeenCalled();
  });

  it("should call the callback on subsequent updates", () => {
    const { rerender } = renderHook(
      deps => useUpdateEffect(mockCallback, deps),
      {
        initialProps: [1],
      }
    );

    expect(mockCallback).not.toHaveBeenCalled();

    rerender([1]);
    expect(mockCallback).not.toHaveBeenCalled();

    rerender([2]);
    expect(mockCallback).toHaveBeenCalledTimes(1);
  });
});
