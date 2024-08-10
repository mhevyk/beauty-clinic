import { act, renderHook } from "@testing-library/react";

import useToggle from "@/hooks/use-toggle/useToggle";

describe("useToggle()", () => {
  test("should initialize with the default value", () => {
    const { result } = renderHook(() => useToggle());

    expect(result.current.isOpen).toBe(false);
  });

  test("should open when open is called", () => {
    const { result } = renderHook(() => useToggle());

    act(() => {
      result.current.open();
    });

    expect(result.current.isOpen).toBe(true);
  });

  test("should close when close is called", () => {
    const { result } = renderHook(() => useToggle(true));

    act(() => {
      result.current.close();
    });

    expect(result.current.isOpen).toBe(false);
  });

  test("should toggle when toggle is called", () => {
    const { result } = renderHook(() => useToggle());

    act(() => {
      result.current.toggle();
    });

    expect(result.current.isOpen).toBe(true);

    act(() => {
      result.current.toggle();
    });

    expect(result.current.isOpen).toBe(false);
  });

  test("should set the value when setIsOpen is called", () => {
    const { result } = renderHook(() => useToggle());

    act(() => {
      result.current.setIsOpen(true);
    });

    expect(result.current.isOpen).toBe(true);

    act(() => {
      result.current.setIsOpen(false);
    });

    expect(result.current.isOpen).toBe(false);
  });
});
