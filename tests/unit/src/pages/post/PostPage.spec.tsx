import { screen } from "@testing-library/react";
import { useParams } from "react-router-dom";
import { Navigate } from "react-router-dom";

import mockPost from "@tests/unit/mocks/mockPost";
import renderWithProviders from "@tests/unit/utils/renderWithProviders";

import { useGetPostByIdQuery } from "@/api/generated";
import PostPage from "@/pages/post/PostPage";

jest.mock("@/pages/post/components/post-header/PostHeader", () => ({
  __esModule: true,
  default: () => <div data-testid="post-header" />,
}));

jest.mock("@/pages/post/components/post-footer/PostFooter", () => ({
  __esModule: true,
  default: () => <div data-testid="post-footer" />,
}));

jest.mock("@/layouts/blog-tab-layout/BlogTabLayout", () => ({
  __esModule: true,
  default: () => <div data-testid="blog-tab-layout" />,
}));

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: jest.fn(),
  Navigate: jest.fn(() => null),
}));

jest.mock("@/api/generated", () => ({
  useGetPostByIdQuery: jest.fn(),
}));

describe("<PostPage />", () => {
  beforeEach(() => {
    (useParams as jest.Mock).mockReturnValue({ postId: "1" });
  });

  it("should render loading state initially", () => {
    (useGetPostByIdQuery as jest.Mock).mockReturnValue({
      loading: true,
      data: null,
    });

    renderWithProviders(<PostPage />);

    const loadingElement = screen.getByText(/loading/i);
    expect(loadingElement).toBeInTheDocument();
  });

  it("should redirect to /not-found when post is not found", () => {
    (useGetPostByIdQuery as jest.Mock).mockReturnValue({
      loading: false,
      data: { post: null },
    });

    renderWithProviders(<PostPage />);
    expect(Navigate).toHaveBeenCalledWith({ to: "/not-found" }, {});
  });

  it("should render post data correctly when available", () => {
    (useGetPostByIdQuery as jest.Mock).mockReturnValue({
      loading: false,
      data: { post: mockPost },
    });

    renderWithProviders(<PostPage />);

    expect(screen.getByTestId("post-header")).toBeInTheDocument();
    expect(screen.getByTestId("post-footer")).toBeInTheDocument();
    expect(screen.getByTestId("blog-tab-layout")).toBeInTheDocument();
  });
});
