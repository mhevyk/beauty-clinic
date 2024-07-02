import { act, fireEvent, screen, waitFor } from "@testing-library/react";

import renderWithProviders from "@tests/unit/utils/renderWithProviders";
import typeIntoInput from "@tests/unit/utils/typeIntoInput";

import ForgotPasswordModal from "@/pages/SignInPage/components/ForgotPasswordModal";
import useCountdown from "@/pages/SignInPage/hooks/useCountdown";
import extractErrorMessage from "@/utils/extractErrorMessage";
import showSnackbar from "@/utils/showSnackbar";
import { useForgotPasswordMutation } from "@api/hooks";

const successSnackbarOptions = {
  variant: "success",
  message:
    "Reset password link was successfully sent\nPlease check your email inbox",
  autohide: true,
  autohideDuration: 5000,
};

const mockEmail = "test@gmail.com";

const mockHandleClose = jest.fn();
const mockSendEmail = jest.fn();

jest.mock("@utils/showSnackbar", () => ({
  __esModule: true,
  default: jest.fn(),
}));

jest.mock("@api/hooks", () => ({
  __esModule: true,
  useForgotPasswordMutation: jest.fn(() => [mockSendEmail, { loading: true }]),
}));

jest.mock("@pages/SignInPage/hooks/useCountdown");

(useCountdown as jest.Mock).mockImplementation(
  ({ onCountdownStarted, onCountdownFinished }) => {
    return {
      secondsLeft: 5,
      start: () => {
        onCountdownStarted();
        setTimeout(onCountdownFinished, 5000); // Simulate countdown end
      },
    };
  }
);

const renderAndSubmitForm = async () => {
  renderWithProviders(
    <ForgotPasswordModal isOpen handleClose={mockHandleClose} />
  );

  const emailInput = screen.getByLabelText("Email*");
  await typeIntoInput(emailInput, mockEmail);

  const submitButton = screen.getByText("Send letter");
  fireEvent.click(submitButton);
};

describe("<ForgotPasswordModal />", () => {
  it("should send letter to user's email correctly", async () => {
    (useForgotPasswordMutation as jest.Mock).mockReturnValue([
      mockSendEmail,
      { loading: true },
    ]);

    await renderAndSubmitForm();

    await waitFor(() => {
      expect(mockSendEmail).toHaveBeenCalledWith({
        variables: { email: mockEmail },
      });
      expect(showSnackbar).toHaveBeenCalledWith(successSnackbarOptions);
    });
  });

  it("should show error snackbar if error occured on server", async () => {
    const error = new Error("Test error");
    mockSendEmail.mockRejectedValue(error);

    await renderAndSubmitForm();

    await waitFor(() => {
      expect(mockSendEmail).not.toHaveBeenCalledWith(successSnackbarOptions);
      expect(showSnackbar).toHaveBeenCalledWith({
        message: extractErrorMessage(error),
        autohide: true,
        autohideDuration: 3000,
      });
    });
  });

  it("should stop timer and allow user to resend email when time is elapsed", async () => {
    jest.useFakeTimers();
    await renderAndSubmitForm();

    act(() => {
      jest.advanceTimersByTime(5000);
    });

    await waitFor(() => {
      expect(useCountdown).toHaveBeenCalled();
    });

    jest.useRealTimers();
  });
});
