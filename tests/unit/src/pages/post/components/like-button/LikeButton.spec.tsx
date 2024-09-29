import { act, fireEvent, screen, waitFor } from "@testing-library/react";

import { ApolloError } from "@apollo/client";
import mockZustandStore from "@tests/unit/utils/mockZustandStore";
import renderWithProviders from "@tests/unit/utils/renderWithProviders";
import { GraphQLError } from "graphql";

import { SetLikeDocument, useSetLikeMutation } from "@/api/generated";
import LikeButton from "@/pages/post/components/like-button/LikeButton";
import { useUserStore } from "@/store/user/userStore";
import showSnackbar from "@/utils/show-snackbar/showSnackbar";

const mockPostId = 3;
const mockLikesCount = 10;
const mockSaveLike = jest.fn();
const mockAbort = jest.fn();
const mockAbortSignal = AbortSignal;

const mockApolloError = new ApolloError({
  graphQLErrors: [new GraphQLError("TEST_ERROR_CODE")],
  networkError: null,
});

jest.mock("@/utils/show-snackbar/showSnackbar");

jest.mock("@/api/generated");

jest.mock("@/store/user/userStore", () => ({
  useUserStore: jest.fn(),
}));

global.AbortController = jest.fn(() => ({
  abort: mockAbort,
  signal: mockAbortSignal,
})) as jest.Mock;

type RenderAndMock = {
  isAuthenticated: boolean;
  isLiked: boolean;
  saveLikeError: ApolloError | null;
};

const defaultArgs = {
  isAuthenticated: true,
  isLiked: false,
  saveLikeError: null,
};

const renderAndMock = (fnArgs: Partial<RenderAndMock> = {}) => {
  const args = { ...defaultArgs, ...fnArgs };

  mockZustandStore(useUserStore, {
    checkAuthenticated: () => args.isAuthenticated,
  });

  const apiMocks = [
    {
      request: { query: SetLikeDocument },
      ...(args.saveLikeError && { error: args.saveLikeError }),
    },
  ];

  renderWithProviders(
    <LikeButton
      postId={mockPostId}
      isLiked={args.isLiked}
      likesCount={mockLikesCount}
    />,
    { apiMocks }
  );
};

describe("<LikeButton />", () => {
  beforeEach(() => {
    // ignore error with svgs
    jest.spyOn(console, "error").mockImplementation(() => jest.fn());
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  describe("with mocked useSetLikeMutation", () => {
    beforeEach(() => {
      (useSetLikeMutation as jest.Mock).mockReturnValue([mockSaveLike]);
    });

    it("should render with initial props correctly", () => {
      renderAndMock();

      const likeCountElement = screen.getByTestId("like-count");
      expect(likeCountElement).toHaveTextContent(mockLikesCount.toString());

      expect(useSetLikeMutation).toHaveBeenCalledWith({
        ignoreResults: true,
        onError: expect.any(Function),
      });
    });

    it("should save like state if it differs from previous after debounce delay", () => {
      renderAndMock({ isLiked: false });

      const heartButton = screen.getByTestId("heart-button");
      fireEvent.click(heartButton);

      act(() => {
        jest.advanceTimersToNextTimer();
      });

      expect(mockSaveLike).toHaveBeenCalledWith({
        variables: {
          input: {
            postId: mockPostId,
            isLiked: true,
          },
        },
        context: {
          fetchOptions: {
            signal: mockAbortSignal,
          },
        },
      });
    });
  });

  describe("with actual useSetLikeMutation", () => {
    beforeEach(() => {
      (useSetLikeMutation as jest.Mock).mockImplementation(
        jest.requireActual("@/api/generated").useSetLikeMutation
      );
    });

    it("should perform optimistic like correctly", () => {
      renderAndMock({ isLiked: false });

      const heartButton = screen.getByTestId("heart-button");
      fireEvent.click(heartButton);

      const likeCountElement = screen.getByTestId("like-count");
      expect(likeCountElement).toHaveTextContent(
        (mockLikesCount + 1).toString()
      );
    });

    it("should perform optimistic unlike correctly", () => {
      renderAndMock({ isLiked: true });

      const heartButton = screen.getByTestId("heart-button");
      fireEvent.click(heartButton);

      const likeCountElement = screen.getByTestId("like-count");
      expect(likeCountElement).toHaveTextContent(
        (mockLikesCount - 1).toString()
      );
    });

    it("should show error snackbar if user is not autenticated", () => {
      renderAndMock({ isAuthenticated: false });

      const heartButton = screen.getByTestId("heart-button");
      fireEvent.click(heartButton);

      expect(showSnackbar).toHaveBeenCalledWith({
        message: "Please sign in to like the post",
        autohide: true,
      });
    });

    it("should show error snackbar with like error and rollback like state if save like error occured", async () => {
      renderAndMock({ isLiked: false, saveLikeError: mockApolloError });

      const heartButton = screen.getByTestId("heart-button");
      fireEvent.click(heartButton);

      const likeCountElementAfterClick = screen.getByTestId("like-count");
      expect(likeCountElementAfterClick).toHaveTextContent(
        (mockLikesCount + 1).toString()
      );

      act(() => {
        jest.advanceTimersToNextTimer();
      });

      await waitFor(() => {
        expect(showSnackbar).toHaveBeenCalledWith({
          message: "Failed to like post, please try again later",
          autohide: true,
        });
      });

      const likeCountElementAfterRequest = screen.getByTestId("like-count");
      expect(likeCountElementAfterRequest).toHaveTextContent(
        mockLikesCount.toString()
      );
    });

    it("should show error snackbar with unlike error and rollback like state if save like error occured", async () => {
      renderAndMock({ isLiked: true, saveLikeError: mockApolloError });

      const heartButton = screen.getByTestId("heart-button");
      fireEvent.click(heartButton);

      const likeCountElementAfterClick = screen.getByTestId("like-count");
      expect(likeCountElementAfterClick).toHaveTextContent(
        (mockLikesCount - 1).toString()
      );

      act(() => {
        jest.advanceTimersToNextTimer();
      });

      await waitFor(() => {
        expect(showSnackbar).toHaveBeenCalledWith({
          message: "Failed to unlike post, please try again later",
          autohide: true,
        });
      });

      const likeCountElementAfterRequest = screen.getByTestId("like-count");
      expect(likeCountElementAfterRequest).toHaveTextContent(
        mockLikesCount.toString()
      );
    });
  });
});
