import { fireEvent, screen, waitFor } from "@testing-library/react";

import mockSignInCredentials from "@tests/unit/mocks/mockSignInCredentials";
import renderWithProviders from "@tests/unit/utils/renderWithProviders";
import typeIntoInput from "@tests/unit/utils/typeIntoInput";

import useSignIn from "@/hooks/use-sign-in/useSignIn";
import SignInPage from "@/pages/sign-in/SignInPage.tsx";

jest.mock("@/hooks/auth/useSignIn", () => ({
  __esModule: true,
  default: jest.fn(),
}));

const mockSignIn = jest.fn();
(useSignIn as jest.Mock).mockReturnValue([mockSignIn, { isSigningIn: false }]);

describe("<SignInPage />", () => {
  beforeEach(() => {
    renderWithProviders(<SignInPage />);
  });

  it("should not trigger signIn mutation if form is invalid", async () => {
    const submitButton = screen.getByRole("button", { name: "Sign In" });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockSignIn).not.toHaveBeenCalled();
    });
  });

  it("should trigger signIn mutation when form in valid", async () => {
    const usernameOrEmailInput = screen.getByLabelText(/email/i);
    await typeIntoInput(
      usernameOrEmailInput,
      mockSignInCredentials.usernameOrEmail
    );

    const passwordInput = screen.getByLabelText(/password/i);
    await typeIntoInput(passwordInput, mockSignInCredentials.password);

    const submitButton = screen.getByRole("button", { name: "Sign In" });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockSignIn).toHaveBeenCalledWith(mockSignInCredentials);
    });
  });
});
