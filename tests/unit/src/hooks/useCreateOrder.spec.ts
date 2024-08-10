import { renderHook, waitFor } from "@testing-library/react";

import mockZustandStore from "@tests/unit/utils/mockZustandStore";

import useCreateOrder from "@/hooks/use-create-order/useCreateOrder";
import { CreateOrderSubmitForm } from "@/pages/booking-form/BookingFormPage.tsx";
import useSuccessfulOrderHandler from "@/pages/booking-form/hooks/useSuccessfulOrderHandler";
import { useUserStore } from "@/store/user/userStore";
import { OrderItem } from "@/utils/getSessionsToOrderFromCart";
import showSnackbar from "@/utils/showSnackbar";
import {
  CreateOrderByAuthorizedUserInput,
  useCreateOrderByAuthorizedUserMutation,
  useCreateOrderByGuestUserMutation,
} from "@api/hooks";

const mockCreateOrderByAuthorizedUser = jest.fn();
const mockCreateOrderByGuestUser = jest.fn();
const mockHandleOrderSuccess = jest.fn();
const mockShowSnackbar = jest.fn();

jest.mock("@/pages/booking-form/hooks/useSuccessfulOrderHandler");
jest.mock("@/utils/showSnackbar");

jest.mock("@/store/user/userStore", () => ({
  useUserStore: jest.fn(),
}));

jest.mock("@api/hooks", () => ({
  useCreateOrderByGuestUserMutation: jest.fn(),
  useCreateOrderByAuthorizedUserMutation: jest.fn(),
}));

const mockOrderItems = [
  {
    employee: {
      id: 1,
      name: "John Doe",
    },
    sessionStartsAt: new Date(),
    treatment: {
      id: 1,
      name: "Treatment",
      duration: 60,
      pricePerUnit: 100,
    },
  },
  {
    employee: {
      id: 2,
      name: "Jane Doe",
    },
    sessionStartsAt: new Date(),
    treatment: {
      id: 2,
      name: "Treatment 2",
      duration: 60,
      pricePerUnit: 100,
    },
  },
] as const satisfies OrderItem[];

const transfrormedItemsToOrder: CreateOrderByAuthorizedUserInput["treatmentSessions"] =
  [
    {
      employeeId: mockOrderItems[0].employee.id,
      treatmentId: mockOrderItems[0].treatment.id,
      startsAt: mockOrderItems[0].sessionStartsAt,
    },
    {
      employeeId: mockOrderItems[1].employee.id,
      treatmentId: mockOrderItems[1].treatment.id,
      startsAt: mockOrderItems[1].sessionStartsAt,
    },
  ];

const mockUserDetails: CreateOrderSubmitForm = {
  name: "John Doe",
  email: "johndoe@gmail.com",
  phoneNumber: "1234567890",
  message: "I liked this order! Will recommend to my friends!",
};

const baseVariables = {
  message: mockUserDetails.message,
  treatmentSessions: transfrormedItemsToOrder,
};

const guestUserRequestBody = {
  ...baseVariables,
  ...mockUserDetails,
};

type ErrorOptions = {
  loading: boolean;
  error: Error | null;
};

type ConfigOptions = {
  createOrderByGuestUserOptions?: Partial<ErrorOptions>;
  createOrderByAuthorizedUserOptions?: Partial<ErrorOptions>;
};

type RenderAndMock = ConfigOptions & {
  itemsToOrder: OrderItem[];
  isAuthenticated?: boolean;
};

const defaultLoadingOptions: ErrorOptions = {
  loading: true,
  error: null,
};

const createOrderByAuthorizedUserError = new Error(
  "Created user by authorized user failed"
);
const createOrderByGuestUserError = new Error(
  "Created user by guest user failed"
);

const renderAndMock = ({
  createOrderByGuestUserOptions: createOrderByGuestUserOptionsFromArgs,
  createOrderByAuthorizedUserOptions:
    createOrderByAuthorizedUserOptionsFromArgs,
  itemsToOrder,
  isAuthenticated = false,
}: RenderAndMock) => {
  const createOrderByGuestUserOptions = {
    ...defaultLoadingOptions,
    ...createOrderByGuestUserOptionsFromArgs,
  };

  (useCreateOrderByGuestUserMutation as jest.Mock).mockReturnValue([
    mockCreateOrderByGuestUser,
    createOrderByGuestUserOptions,
  ]);

  const createOrderByAuthorizedUserOptions = {
    ...defaultLoadingOptions,
    ...createOrderByAuthorizedUserOptionsFromArgs,
  };

  (useCreateOrderByAuthorizedUserMutation as jest.Mock).mockReturnValue([
    mockCreateOrderByAuthorizedUser,
    createOrderByAuthorizedUserOptions,
  ]);

  mockZustandStore(useUserStore, {
    checkAuthenticated: () => isAuthenticated,
  });

  (useSuccessfulOrderHandler as jest.Mock).mockReturnValue(
    mockHandleOrderSuccess
  );

  (showSnackbar as jest.Mock).mockImplementation(mockShowSnackbar);

  return renderHook(() => useCreateOrder(itemsToOrder));
};

// expectedLoading, isAuthenticated, isAuthorizedLoading, isGuestLoading
const loadingTestCases = [
  [true, true, true, false],
  [true, false, false, true],
  [false, false, false, false],
  [true, false, true, false],
];

describe("useCreateOrder()", () => {
  describe("creating order", () => {
    it("should create order for authorized user correctly", async () => {
      const { result } = renderAndMock({
        itemsToOrder: mockOrderItems,
        isAuthenticated: true,
      });

      const createOrder = result.current[0];
      createOrder(mockUserDetails);

      await waitFor(() => {
        expect(mockCreateOrderByAuthorizedUser).toHaveBeenCalledWith({
          variables: {
            input: baseVariables,
          },
        });
        expect(mockHandleOrderSuccess).toHaveBeenCalled();
        expect(mockCreateOrderByGuestUser).not.toHaveBeenCalled();
      });
    });

    it("should create order for guest user correctly", async () => {
      const { result } = renderAndMock({
        itemsToOrder: mockOrderItems,
      });

      const createOrder = result.current[0];
      createOrder(mockUserDetails);

      await waitFor(() => {
        expect(mockCreateOrderByGuestUser).toHaveBeenCalledWith({
          variables: {
            input: guestUserRequestBody,
          },
        });
        expect(mockHandleOrderSuccess).toHaveBeenCalled();
        expect(mockCreateOrderByAuthorizedUser).not.toHaveBeenCalled();
      });
    });
  });

  describe("handling errors", () => {
    it("should show snackbar with error message when creating order for authorized user fails", async () => {
      renderAndMock({
        itemsToOrder: [],
        createOrderByAuthorizedUserOptions: {
          error: createOrderByAuthorizedUserError,
        },
      });

      await waitFor(() => {
        expect(mockShowSnackbar).toHaveBeenCalledWith(
          expect.objectContaining({
            message: createOrderByAuthorizedUserError.message,
            autohide: true,
          })
        );
        expect(mockShowSnackbar).toHaveBeenCalledWith(
          expect.not.objectContaining({
            message: createOrderByGuestUserError.message,
          })
        );
      });
    });

    it("should show snackbar with error message when creating order for guest user fails", async () => {
      renderAndMock({
        itemsToOrder: [],
        createOrderByGuestUserOptions: {
          error: createOrderByGuestUserError,
        },
      });

      await waitFor(() => {
        expect(mockShowSnackbar).toHaveBeenCalledWith(
          expect.objectContaining({
            message: createOrderByGuestUserError.message,
            autohide: true,
          })
        );
        expect(mockShowSnackbar).toHaveBeenCalledWith(
          expect.not.objectContaining({
            message: createOrderByAuthorizedUserError.message,
          })
        );
      });
    });
  });

  describe("loading states", () => {
    test.each(loadingTestCases)(
      "should return loading state as %s when isAuthenticated is %s, isAuthorizedLoading is %s, and isGuestLoading is %s",
      async (
        expectedLoading,
        isAuthenticated,
        isAuthorizedLoading,
        isGuestLoading
      ) => {
        const { result } = renderAndMock({
          itemsToOrder: [],
          isAuthenticated,
          createOrderByAuthorizedUserOptions: {
            loading: isAuthorizedLoading,
          },
          createOrderByGuestUserOptions: {
            loading: isGuestLoading,
          },
        });

        const { isLoading } = result.current[1];
        expect(isLoading).toBe(expectedLoading);
      }
    );
  });
});
