import { screen } from "@testing-library/react";

import renderWithProviders from "@tests/unit/utils/renderWithProviders";

import BlogTabLayout from "@/layouts/blog-tab-layout/BlogTabLayout";

jest.mock("@/layouts/blog-tab-layout/components/blog-tabs/BlogTabs", () => ({
  __esModule: true,
  default: () => <div>BlogTabs</div>,
}));

describe("<BlogTabLayout />", () => {
  it("should render correctly", () => {
    renderWithProviders(<BlogTabLayout />);

    const blogTabs = screen.getByText("BlogTabs");
    expect(blogTabs).toBeInTheDocument();
  });
});
