import { screen } from "@testing-library/react";
import { createBrowserRouter } from "react-router-dom";

import renderWithProviders from "@tests/unit/utils/renderWithProviders";

import App from "@/App";
import useRefreshToken from "@/hooks/auth/useRefreshToken";

const mockUseRefreshToken = jest.fn();
const mockCreateBrowserRouter = jest.fn();

const mockConfig = [
  {
    path: "/",
    element: <div>Test page</div>,
  },
];

jest.mock("@/routes/routes", () => ({
  __esModule: true,
  get default() {
    return mockConfig;
  },
}));

jest.mock("@/components/AppSnackbar", () => ({
  __esModule: true,
  default: () => <div>AppSnackbar</div>,
}));

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  RouterProvider: () => <div>RouterProvider</div>,
  createBrowserRouter: jest.fn(),
}));

jest.mock("@/hooks/auth/useRefreshToken", () => ({
  __esModule: true,
  default: jest.fn(),
}));

describe("<App />", () => {
  beforeEach(() => {
    (useRefreshToken as jest.Mock).mockImplementationOnce(mockUseRefreshToken);
    (createBrowserRouter as jest.Mock).mockImplementationOnce(
      mockCreateBrowserRouter
    );
    renderWithProviders(<App />);
  });

  it("should render children correctly", () => {
    const snackbar = screen.getByText("AppSnackbar");
    expect(snackbar).toBeInTheDocument();

    const routerProvider = screen.getByText("RouterProvider");
    expect(routerProvider).toBeInTheDocument();
  });

  it('should call "useRefreshToken" hook', () => {
    expect(mockUseRefreshToken).toHaveBeenCalled();
  });

  it('should call "createBrowserRouter" function', () => {
    expect(mockCreateBrowserRouter).toHaveBeenCalledWith(mockConfig);
  });
});
