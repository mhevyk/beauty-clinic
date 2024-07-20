import { renderHook } from "@testing-library/react";
import { useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";

import { useRecaptcha } from "@/layouts/footer/hooks/useRecaptcha";

const mockSetRecaptcha = jest.fn();
const mockReset = jest.fn();

jest.mock("react", () => ({
  ...jest.requireActual("react"),
  useState: jest.fn(),
}));

const mockRecaptchaRef = {
  reset: mockReset,
};

describe("useRecaptcha()", () => {
  it("sets recaptcha ref correctly", () => {
    (useState as jest.Mock).mockReturnValueOnce([null, mockSetRecaptcha]);
    const { result } = renderHook(() => useRecaptcha());

    const recaptchaRefCallback = result.current;
    recaptchaRefCallback(mockRecaptchaRef as unknown as ReCAPTCHA);

    expect(mockSetRecaptcha).toHaveBeenCalledWith(mockRecaptchaRef);
  });

  it("should reset recaptcha on unmount", () => {
    (useState as jest.Mock).mockReturnValueOnce([
      mockRecaptchaRef,
      mockSetRecaptcha,
    ]);
    const { unmount } = renderHook(() => useRecaptcha());

    unmount();

    expect(mockReset).toHaveBeenCalled();
  });
});
