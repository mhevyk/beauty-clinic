import { screen } from "@testing-library/react";

import renderWithProviders from "@tests/unit/utils/renderWithProviders";

import RootLayout from "@/layouts/root-layout/RootLayout";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  ScrollRestoration: () => <div data-testid="scroll-restoration" />,
}));

jest.mock("@/layouts/footer/Footer", () => ({
  __esModule: true,
  default: () => <div data-testid="footer" />,
}));

jest.mock(
  "@/components/app-suspense-with-outlet/AppSuspenseWithOutlet",
  () => ({
    __esModule: true,
    default: () => <div data-testid="children" />,
  })
);

describe("<RootLayout />", () => {
  it("should render correctly", () => {
    renderWithProviders(<RootLayout />);

    const footer = screen.getByTestId("footer");
    expect(footer).toBeInTheDocument();

    const children = screen.getByTestId("children");
    expect(children).toBeInTheDocument();
  });
});
