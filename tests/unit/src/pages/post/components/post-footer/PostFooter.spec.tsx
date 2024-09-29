import { screen } from "@testing-library/react";

import renderWithProviders from "@tests/unit/utils/renderWithProviders";

import PostFooter from "@/pages/post/components/post-footer/PostFooter";

jest.mock("@/pages/post/components/activity-section/ActivitySection", () => ({
  __esModule: true,
  default: jest.fn(() => <div data-testid="activity-section" />),
}));

describe("<PostFooter />", () => {
  it("should render correctly", () => {
    renderWithProviders(
      <PostFooter commentsCount={10} viewsCount={20} categories={[]} />
    );

    const activitySection = screen.getByTestId("activity-section");
    expect(activitySection).toBeInTheDocument();
  });
});
