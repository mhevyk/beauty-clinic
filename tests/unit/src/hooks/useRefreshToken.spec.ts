import { renderHook, waitFor } from "@testing-library/react";

import useRefreshToken from "@/hooks/use-refresh-token/useRefreshToken";
import fetchAccessToken from "@/utils/fetch-access-token/fetchAccessToken";
import showSnackbar from "@/utils/show-snackbar/showSnackbar";

const mockShowSnackbar = jest.fn();
const mockFetchAccessToken = jest.fn();
const mockSetAccessToken = jest.fn();
const mockSetIsAuthenticating = jest.fn();
const mockAbort = jest.fn();

jest.mock("@/utils/show-snackbar/showSnackbar", () => ({
  __esModule: true,
  default: jest.fn(),
}));

jest.mock("@/utils/fetch-access-token/fetchAccessToken", () => ({
  __esModule: true,
  default: jest.fn(),
}));

jest.mock("@/store/user/userStore", () => ({
  useUserStore: jest.fn(fn => {
    const data = {
      setAccessToken: mockSetAccessToken,
      setIsAuthenticating: mockSetIsAuthenticating,
    };

    return fn(data);
  }),
}));

const createAbortError = () => {
  const error = new Error("Request was aborted");
  error.name = "AbortError";
  return error;
};

const createMockAbortController = (aborted?: boolean): jest.Mock => {
  return jest.fn(() => ({
    abort: mockAbort,
    signal: { aborted },
  }));
};

type RenderAndMock = {
  aborted?: boolean;
  hasNonAbortError?: boolean;
};

const renderAndMock = ({
  aborted = false,
  hasNonAbortError,
}: RenderAndMock = {}) => {
  (fetchAccessToken as jest.Mock).mockImplementation(mockFetchAccessToken);
  (showSnackbar as jest.Mock).mockImplementation(mockShowSnackbar);

  global.AbortController = createMockAbortController(aborted);

  if (aborted) {
    mockFetchAccessToken.mockRejectedValueOnce(createAbortError());
  } else if (hasNonAbortError) {
    mockFetchAccessToken.mockRejectedValueOnce(new Error());
  } else {
    mockFetchAccessToken.mockImplementationOnce(() => {
      return Promise.resolve({
        json: () => Promise.resolve({ accessToken: "mockToken" }),
      });
    });
  }

  return renderHook(() => useRefreshToken());
};

describe("useRefreshToken()", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should call abort on unmount", () => {
    const { unmount } = renderAndMock();
    unmount();
    expect(mockAbort).toHaveBeenCalled();
  });

  it("should set access token when request is successfull", async () => {
    renderAndMock();

    expect(mockFetchAccessToken).toHaveBeenCalledWith({
      signal: { aborted: false },
    });

    await waitFor(() => {
      expect(mockSetAccessToken).toHaveBeenCalledWith("mockToken");
    });
  });

  describe("with abort", () => {
    beforeEach(() => {
      renderAndMock({ aborted: true });
      expect(mockSetIsAuthenticating).toHaveBeenCalledWith(true);
    });

    it("should not call showSnackbar when request is aborted", async () => {
      await waitFor(() => {
        expect(mockShowSnackbar).not.toHaveBeenCalled();
        expect(mockSetAccessToken).not.toHaveBeenCalled();
      });
    });

    it("should not reset authenticated when request is aborted", async () => {
      await waitFor(() => {
        expect(mockSetIsAuthenticating).not.toHaveBeenCalledWith(false);
      });
    });
  });

  it("should call showSnackbar when request failed but not aborted", async () => {
    renderAndMock({ hasNonAbortError: true });

    await waitFor(() => {
      expect(mockShowSnackbar).toHaveBeenCalledWith({
        autohide: true,
        message: "User is not logged in",
      });
      expect(mockSetAccessToken).toHaveBeenCalledWith(null);
      expect(mockSetIsAuthenticating).toHaveBeenCalledWith(false);
    });
  });
});
