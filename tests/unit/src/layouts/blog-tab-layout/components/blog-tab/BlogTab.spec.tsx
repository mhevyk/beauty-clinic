import { fireEvent, screen } from "@testing-library/react";

import renderWithProviders from "@tests/unit/utils/renderWithProviders";

import useSearchParamsActions from "@/hooks/use-search-params-actions/useSearchParamsActions";
import BlogTab from "@/layouts/blog-tab-layout/components/blog-tab/BlogTab";

jest.mock("@/hooks/use-search-params-actions/useSearchParamsActions");

const mockSetSearchParam = jest.fn();
const mockDeleteSearchParam = jest.fn();

describe("<BlogTab />", () => {
  beforeEach(() => {
    (useSearchParamsActions as jest.Mock).mockReturnValue({
      setSearchParam: mockSetSearchParam,
      deleteSearchParam: mockDeleteSearchParam,
    });
  });

  it('should delete "category" search param on tab click when categorySlug is falsy', () => {
    renderWithProviders(<BlogTab categoryLabel="Tab label" />);

    const button = screen.getByRole("button", { name: "Tab label" });
    fireEvent.click(button);

    expect(mockDeleteSearchParam).toHaveBeenCalledWith("category");
    expect(mockSetSearchParam).not.toHaveBeenCalled();
  });

  it('should set "category" search param on tab click when categorySlug is truthy', () => {
    renderWithProviders(
      <BlogTab categoryLabel="Tab label" categorySlug="wellness" />
    );

    const button = screen.getByRole("button", { name: "Tab label" });
    fireEvent.click(button);

    expect(mockSetSearchParam).toHaveBeenCalledWith("category", "wellness");
    expect(mockDeleteSearchParam).not.toHaveBeenCalled();
  });
});
