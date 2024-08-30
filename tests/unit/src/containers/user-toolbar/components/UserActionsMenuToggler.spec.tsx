import { fireEvent, screen } from "@testing-library/react";

import renderWithProviders from "@tests/unit/utils/renderWithProviders.tsx";

import UserActionsMenuToggler from "@/containers/user-toolbar/components/UserActionsMenuToggler";
import getAvatarLabel from "@/containers/user-toolbar/utils/getAvatarLabel";
import textToColor from "@/containers/user-toolbar/utils/textToColor";
import useCurrentUser from "@/hooks/use-current-user/useCurrentUser";

jest.mock("@/hooks/use-current-user/useCurrentUser", () => ({
  __esModule: true,
  default: jest.fn(),
}));

const mockUser = { username: "John Doe" };

describe("<UserActionsMenuToggler />", () => {
  it("should return null if user is not available", () => {
    (useCurrentUser as jest.Mock).mockReturnValueOnce(null);

    const { container } = renderWithProviders(
      <UserActionsMenuToggler isOpen={false} id="test-id" />
    );

    expect(container.firstChild).toBeNull();
  });

  it("should render the button with user avatar and correct attributes when user is available", () => {
    (useCurrentUser as jest.Mock).mockReturnValueOnce(mockUser);

    renderWithProviders(<UserActionsMenuToggler isOpen={true} id="test-id" />);

    const button = screen.getByRole("button");

    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute("id", "test-id-button");
    expect(button).toHaveAttribute("aria-controls", "test-id-menu");
    expect(button).toHaveAttribute("aria-expanded", "true");
    expect(button).toHaveAttribute("aria-haspopup", "true");

    const avatar = screen.getByText(getAvatarLabel(mockUser.username));
    expect(avatar).toBeInTheDocument();
    expect(avatar).toHaveStyle(
      `background-color: ${textToColor(mockUser.username)}`
    );
  });

  it("should call onClick when the button is clicked", () => {
    (useCurrentUser as jest.Mock).mockReturnValueOnce(mockUser);
    const handleClick = jest.fn();

    renderWithProviders(
      <UserActionsMenuToggler
        isOpen={true}
        id="test-id"
        onClick={handleClick}
      />
    );

    fireEvent.click(screen.getByRole("button"));

    expect(handleClick).toHaveBeenCalled();
  });

  it("should not have aria-controls and aria-expanded attributes when isOpen is false", () => {
    (useCurrentUser as jest.Mock).mockReturnValueOnce(mockUser);

    renderWithProviders(<UserActionsMenuToggler isOpen={false} id="test-id" />);

    const button = screen.getByRole("button");

    expect(button).not.toHaveAttribute("aria-controls");
    expect(button).not.toHaveAttribute("aria-expanded");
  });

  it("should not render avatar if user is not available", () => {
    (useCurrentUser as jest.Mock).mockReturnValueOnce(null);

    renderWithProviders(<UserActionsMenuToggler isOpen={true} id="test-id" />);

    expect(screen.queryByText(/JD/)).toBeNull();
  });
});
