import { fireEvent, screen } from "@testing-library/react";

import renderWithProviders from "@tests/unit/utils/renderWithProviders";

import BlogSearch from "@/layouts/blog-tab-layout/components/blog-search/BlogSearch";

jest.mock(
  "@/layouts/blog-tab-layout/components/blog-search-input/BlogSearchInput",
  () => ({
    __esModule: true,
    default: () => <input data-testid="search-input" />,
  })
);

describe("<BlogSearch />", () => {
  beforeEach(() => {
    // ignore error with svgs
    jest.spyOn(console, "error").mockImplementation(() => jest.fn());
  });

  it("should render search icon by default", () => {
    renderWithProviders(<BlogSearch />);

    const openSearchModeButton = screen.getByTestId("open-search-mode");
    expect(openSearchModeButton).toBeInTheDocument();
  });

  it("should render search input when search icon is pressed", () => {
    renderWithProviders(<BlogSearch />);

    const openSearchModeButton = screen.getByTestId("open-search-mode");
    fireEvent.click(openSearchModeButton);

    const searchInput = screen.getByTestId("search-input");
    expect(searchInput).toBeInTheDocument();
  });
});
