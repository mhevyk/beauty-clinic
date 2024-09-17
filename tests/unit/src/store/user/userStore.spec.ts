import { act, renderHook } from "@testing-library/react";

import { LogoutDocument } from "@/api/generated";
import { client } from "@/config/apollo";
import { useUserStore } from "@/store/user/userStore";

jest.mock("@/config/apollo", () => ({
  client: {
    mutate: jest.fn(),
  },
}));

describe("useUserStore()", () => {
  it("should set correct initial values", () => {
    const { result } = renderHook(() => useUserStore());

    expect(result.current.accessToken).toBeNull();
    expect(result.current.isAuthenticating).toBe(false);
  });

  it("should update accessToken when setAccessToken is called", () => {
    const { result } = renderHook(() => useUserStore());

    act(() => {
      result.current.setAccessToken("test_token");
    });

    expect(result.current.accessToken).toBe("test_token");
  });

  it("should update isAuthenticating when setIsAuthenticating is called", () => {
    const { result } = renderHook(() => useUserStore());

    act(() => {
      result.current.setIsAuthenticating(true);
    });

    expect(result.current.isAuthenticating).toBe(true);
  });

  it("should return true from checkAuthenticated when accessToken is not null", () => {
    const { result } = renderHook(() => useUserStore());

    act(() => {
      result.current.setAccessToken("test_token");
    });

    expect(result.current.checkAuthenticated()).toBe(true);
  });

  it("should return false from checkAuthenticated when accessToken is null", () => {
    const { result } = renderHook(() => useUserStore());

    act(() => {
      result.current.setAccessToken(null);
    });

    expect(result.current.checkAuthenticated()).toBe(false);
  });

  it("should call the logout mutation and clear accessToken", async () => {
    const { result } = renderHook(() => useUserStore());

    (client.mutate as jest.Mock).mockResolvedValue({ data: {} });

    act(() => {
      result.current.setAccessToken("test_token");
    });

    await act(async () => {
      await result.current.logout();
    });

    expect(client.mutate).toHaveBeenCalledWith({
      mutation: LogoutDocument,
    });
    expect(result.current.accessToken).toBeNull();
  });
});
