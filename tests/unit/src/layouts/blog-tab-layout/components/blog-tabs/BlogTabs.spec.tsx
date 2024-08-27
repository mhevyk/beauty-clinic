import { screen } from "@testing-library/react";

import { MockedResponse } from "@apollo/client/testing";
import renderWithProviders from "@tests/unit/utils/renderWithProviders";

import { GetPostCategoriesDocument } from "@/api/generated";
import BlogTabs from "@/layouts/blog-tab-layout/components/blog-tabs/BlogTabs";

jest.mock("@/components/error-boundary/ErrorBoundary", () =>
  jest.fn(({ children }) => <div>{children}</div>)
);

jest.mock("@/layouts/blog-tab-layout/components/blog-search/BlogSearch", () =>
  jest.fn(() => <div>BlogSearch</div>)
);

const apiMocks: MockedResponse[] = [
  {
    request: {
      query: GetPostCategoriesDocument,
    },
    result: {
      data: {
        categories: [
          {
            id: "1",
            name: "Category 1",
            slug: "category-1",
          },
        ],
      },
    },
  },
];

describe("BlogTabs", () => {
  it("should render correctly", async () => {
    renderWithProviders(<BlogTabs />, { apiMocks });

    const blogSearch = screen.getByText("BlogSearch");
    expect(blogSearch).toBeInTheDocument();

    const skeletons = screen.getAllByTestId("skeleton");
    expect(skeletons).toHaveLength(3);

    // from renderWithProviders inside MockedProvider
    const category = await screen.findByText("Category 1");
    expect(category).toBeInTheDocument();
  });
});
