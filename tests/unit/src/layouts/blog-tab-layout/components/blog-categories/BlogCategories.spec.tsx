import { render, screen } from "@testing-library/react";

import { useGetPostCategoriesSuspenseQuery } from "@/api/generated";
import BlogCategories from "@/layouts/blog-tab-layout/components/blog-categories/BlogCategories";
import BlogTab from "@/layouts/blog-tab-layout/components/blog-tab/BlogTab";

jest.mock("@/api/generated", () => ({
  useGetPostCategoriesSuspenseQuery: jest.fn(),
}));

jest.mock("@/layouts/blog-tab-layout/components/blog-tab/BlogTab", () =>
  jest.fn(() => <li>BlogTab</li>)
);

describe("<BlogCategories />", () => {
  it("should render no BlogTab components when there are no categories", () => {
    (useGetPostCategoriesSuspenseQuery as jest.Mock).mockReturnValue({
      data: { categories: [] },
    });

    render(<BlogCategories />);

    expect(screen.queryByText("BlogTab")).not.toBeInTheDocument();
  });

  it("should render BlogTab components for each category", () => {
    const categories = [
      { id: "1", name: "Category 1", slug: "category-1" },
      { id: "2", name: "Category 2", slug: "category-2" },
    ];

    (useGetPostCategoriesSuspenseQuery as jest.Mock).mockReturnValue({
      data: { categories },
    });

    render(<BlogCategories />);

    const blogTabs = screen.getAllByText("BlogTab");
    expect(blogTabs).toHaveLength(categories.length);
  });

  it("should render BlogTab with the correct labels and slugs", () => {
    const categories = [
      { id: "1", name: "Category 1", slug: "category-1" },
      { id: "2", name: "Category 2", slug: "category-2" },
    ];

    (useGetPostCategoriesSuspenseQuery as jest.Mock).mockReturnValue({
      data: { categories },
    });

    render(<BlogCategories />);

    categories.forEach(category => {
      expect(BlogTab).toHaveBeenCalledWith(
        expect.objectContaining({
          categoryLabel: category.name,
          categorySlug: category.slug,
        }),
        {}
      );
    });
  });

  it("should handle when the categories data is undefined", () => {
    (useGetPostCategoriesSuspenseQuery as jest.Mock).mockReturnValue({
      data: undefined,
    });

    render(<BlogCategories />);

    const blogTab = screen.queryByText("BlogTab");
    expect(blogTab).not.toBeInTheDocument();
  });
});
