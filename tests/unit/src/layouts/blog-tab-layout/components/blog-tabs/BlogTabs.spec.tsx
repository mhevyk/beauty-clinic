import { screen } from "@testing-library/react";

import renderWithProviders from "@tests/unit/utils/renderWithProviders";

import BlogTabs from "@/layouts/blog-tab-layout/components/blog-tabs/BlogTabs";

jest.mock("@/components/error-boundary/ErrorBoundary", () =>
  jest.fn(({ children }) => <div>{children}</div>)
);

jest.mock("@/layouts/blog-tab-layout/components/blog-search/BlogSearch", () =>
  jest.fn(() => <div>BlogSearch</div>)
);

describe("BlogTabs", () => {
  it("should render correctly", async () => {
    renderWithProviders(<BlogTabs />);

    const blogSearch = screen.getByText("BlogSearch");
    expect(blogSearch).toBeInTheDocument();

    const skeletons = screen.getAllByTestId("skeleton");
    expect(skeletons).toHaveLength(3);

    // from renderWithProviders inside MockedProvider
    const category = await screen.findByText("Category 1");
    expect(category).toBeInTheDocument();
  });
});
