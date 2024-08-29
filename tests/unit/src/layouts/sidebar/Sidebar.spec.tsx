import { fireEvent, screen } from "@testing-library/react";

import { useMediaQuery } from "@mui/material";
import renderWithProviders from "@tests/unit/utils/renderWithProviders.tsx";

import useToggle from "@/hooks/use-toggle/useToggle";
import Sidebar from "@/layouts/sidebar/Sidebar.tsx";

jest.mock("@/hooks/use-toggle/useToggle", () => ({
  __esModule: true,
  default: jest.fn(),
}));

jest.mock("@mui/material", () => {
  const actualMUI = jest.requireActual("@mui/material");
  return {
    ...actualMUI,
    useMediaQuery: jest.fn(),
  };
});

describe("<Sidebar />", () => {
  const mockUseToggle = useToggle as jest.Mock;
  const mockUseMediaQuery = useMediaQuery as jest.Mock;

  beforeEach(() => {
    jest.spyOn(console, "error").mockImplementation(() => jest.fn());

    mockUseToggle.mockReturnValue({
      isOpen: false,
      open: jest.fn(),
      close: jest.fn(),
    });
  });

  it("should render correctly on large screens", () => {
    mockUseMediaQuery.mockReturnValue(false);

    renderWithProviders(<Sidebar />);

    const burgerButton = screen.getByRole("button");
    expect(burgerButton).toBeInTheDocument();

    const logo = screen.getByText(/Lily/i);
    expect(logo).toBeInTheDocument();
  });

  it("should not render on small screens", () => {
    mockUseMediaQuery.mockReturnValue(true);

    renderWithProviders(<Sidebar />);

    const burgerButton = screen.queryByRole("button");
    expect(burgerButton).not.toBeInTheDocument();
  });

  it("should call open when BurgerButton is clicked", () => {
    mockUseMediaQuery.mockReturnValue(false);
    const openMock = jest.fn();
    mockUseToggle.mockReturnValue({
      isOpen: false,
      open: openMock,
      close: jest.fn(),
    });

    renderWithProviders(<Sidebar />);

    const burgerButton = screen.getByRole("button");
    fireEvent.click(burgerButton);

    expect(openMock).toHaveBeenCalled();
  });
});
