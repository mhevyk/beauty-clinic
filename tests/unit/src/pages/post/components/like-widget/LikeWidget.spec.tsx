import { screen } from "@testing-library/react";

import renderWithProviders from "@tests/unit/utils/renderWithProviders";

import { useGetLikeDetailsQuery } from "@/api/generated";
import useCurrentUser from "@/hooks/use-current-user/useCurrentUser";
import LikeWidget from "@/pages/post/components/like-widget/LikeWidget";

const mockPostId = 3;
const mockUserId = 1;

jest.mock("@/hooks/use-current-user/useCurrentUser");
jest.mock("@/api/generated");

jest.mock("@/pages/post/components/like-button/LikeButton", () => ({
  __esModule: true,
  default: () => <div>LikeButton</div>,
}));

type RenderAndMock = {
  isLoading: boolean;
  hasUser: boolean;
  error: Error;
};

const renderAndMock = ({
  isLoading = false,
  hasUser = true,
  error,
}: Partial<RenderAndMock> = {}) => {
  (useGetLikeDetailsQuery as jest.Mock).mockReturnValue({
    loading: isLoading,
    error,
    data: {
      likeDetails: {
        isLiked: false,
        likesCount: 0,
      },
    },
  });

  (useCurrentUser as jest.Mock).mockReturnValue(
    hasUser && {
      userId: mockUserId,
    }
  );

  renderWithProviders(<LikeWidget postId={mockPostId} />);
};

describe("<LikeWidget />", () => {
  it("should perform request for like details with specific user if user is signed in", () => {
    renderAndMock({ hasUser: true });

    expect(useGetLikeDetailsQuery).toHaveBeenCalledWith({
      variables: {
        input: {
          postId: mockPostId,
          userId: mockUserId,
        },
      },
    });
  });

  it("should perform request for like details with no specific user if user is not signed in", () => {
    renderAndMock({ hasUser: false });

    expect(useGetLikeDetailsQuery).toHaveBeenCalledWith({
      variables: {
        input: {
          postId: mockPostId,
          userId: undefined,
        },
      },
    });
  });

  it("should render skeleton while loading", () => {
    renderAndMock({ isLoading: true });

    const skeleton = screen.getByTestId("like-skeleton");
    expect(skeleton).toBeInTheDocument();
  });

  it("should show error element in case of error", () => {
    renderAndMock({ error: new Error("Test error") });

    const errorElement = screen.getByText("Error occured");
    expect(errorElement).toBeInTheDocument();
  });

  it("should render like button if request is successful", () => {
    renderAndMock();

    const likeButton = screen.getByText("LikeButton");
    expect(likeButton).toBeInTheDocument();
  });
});
