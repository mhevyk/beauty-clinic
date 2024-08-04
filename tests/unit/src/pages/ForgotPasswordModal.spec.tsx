import { fireEvent, screen, waitFor } from "@testing-library/react";
import { act } from "react";

import renderWithProviders from "@tests/unit/utils/renderWithProviders";
import typeIntoInput from "@tests/unit/utils/typeIntoInput";

import ForgotPasswordModal from "@/pages/SignInPage/components/ForgotPasswordModal";
import { RESEND_EMAIL_MIN_SECONDS } from "@/pages/SignInPage/components/ForgotPasswordModal/constants";
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

jest.mock("@/utils/showSnackbar", () => ({
  __esModule: true,
  default: jest.fn(),
}));

jest.mock("@api/hooks", () => ({
  __esModule: true,
  useForgotPasswordMutation: jest.fn(() => [mockSendEmail, { loading: true }]),
}));

jest.mock("@/pages/SignInPage/hooks/useCountdown", () => ({
  __esModule: true,
  ...jest.requireActual("@/pages/SignInPage/hooks/useCountdown"),
  default: jest
    .fn()
    .mockImplementation(
      jest.requireActual("@/pages/SignInPage/hooks/useCountdown").default
    ),
}));

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
  beforeEach(() => {
    jest.clearAllMocks();
  });

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

    expect(useCountdown).toHaveBeenCalledWith({
      seconds: RESEND_EMAIL_MIN_SECONDS,
    });

    act(() => {
      jest.advanceTimersToNextTimer();
    });

    jest.useRealTimers();

    const resendButtonAfterTimerFinished = screen.getByText("Send letter");
    expect(resendButtonAfterTimerFinished).toBeInTheDocument();

    const digitAfterTimerFinished = screen.queryByText("digit");
    expect(digitAfterTimerFinished).not.toBeInTheDocument();

    const openLockIconAfterTimerFinished = screen.getByTestId("open-lock-icon");
    expect(openLockIconAfterTimerFinished).toBeInTheDocument();
  });
});
