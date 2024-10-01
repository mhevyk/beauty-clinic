import { act, renderHook } from "@testing-library/react";

import useLazyImage from "@/hooks/use-lazy-mage/useLazyImage";

const src = "image.jpg";
const placeholderSrc = "placeholder.jpg";

describe("useLazyImage()", () => {
  let loadCallback: () => void;
  let errorCallback: () => void;

  beforeEach(() => {
    global.Image = class {
      src?: string;
      addEventListener: (event: "load" | "error", callback: () => void) => void;

      constructor() {
        this.addEventListener = (event, callback) => {
          if (event === "load") {
            loadCallback = callback;
          } else if (event === "error") {
            errorCallback = callback;
          }
        };
      }

      removeEventListener() {}
    } as jest.Mock;
  });

  it("should return the placeholder source initially", () => {
    const { result } = renderHook(() => useLazyImage({ src, placeholderSrc }));

    const [source, { isLoading, hasError }] = result.current;

    expect(source).toBe(placeholderSrc);
    expect(isLoading).toBe(true);
    expect(hasError).toBe(false);
  });

  it("should handle image load correctly", () => {
    const { result } = renderHook(() => useLazyImage({ src, placeholderSrc }));

    act(() => {
      loadCallback();
    });

    const [source, { isLoading, hasError }] = result.current;

    expect(source).toBe(src);
    expect(isLoading).toBe(false);
    expect(hasError).toBe(false);
  });

  it("should handle image error correctly", () => {
    const { result } = renderHook(() => useLazyImage({ src, placeholderSrc }));

    act(() => {
      errorCallback();
    });

    const [source, { isLoading, hasError }] = result.current;

    expect(source).toBe(placeholderSrc);
    expect(isLoading).toBe(false);
    expect(hasError).toBe(true);
  });

  it("should remove event listeners on cleanup", () => {
    const { unmount } = renderHook(() => useLazyImage({ src, placeholderSrc }));

    const removeEventListenerSpy = jest.spyOn(
      global.Image.prototype,
      "removeEventListener"
    );

    unmount();

    expect(removeEventListenerSpy).toHaveBeenCalledTimes(2);
  });
});
