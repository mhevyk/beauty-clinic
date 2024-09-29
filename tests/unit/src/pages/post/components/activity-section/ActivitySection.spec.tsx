import { screen } from "@testing-library/react";

import renderWithProviders from "@tests/unit/utils/renderWithProviders";

import ActivitySection from "@/pages/post/components/activity-section/ActivitySection";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: jest.fn(() => ({ postId: "1" })),
}));

jest.mock("@/pages/post/components/like-widget/LikeWidget", () => ({
  __esModule: true,
  default: jest.fn(() => <div data-testid="like-widget" />),
}));

describe("<ActivitySection />", () => {
  it("should render correctly", () => {
    renderWithProviders(<ActivitySection commentsCount={10} viewsCount={20} />);

    const viewsCount = screen.getByTestId("views-count");
    expect(viewsCount).toHaveTextContent("20 views");

    const commentsCount = screen.getByTestId("comments-count");
    expect(commentsCount).toHaveTextContent("10 comments");

    const likeWidget = screen.getByTestId("like-widget");
    expect(likeWidget).toBeInTheDocument();
  });
});
