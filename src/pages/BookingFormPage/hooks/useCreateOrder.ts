import {
  CreateOrderByAuthorizedUserInput,
  useCreateOrderByAuthorizedUserMutation,
  useCreateOrderByGuestUserMutation,
} from "@api/hooks";
import { useUserStore } from "@store/user/userStore";
import { CreateOrderSubmitForm } from "..";
import { useCallback, useEffect } from "react";
import showSnackbar from "@utils/showSnackbar";
import useItemsToOrder from "./useItemsToOrder";
import useSuccessfulOrderHandler from "./useSuccessfulOrderHandler";

export default function useCreateOrder() {
  const [
    createOrderByGuestUser,
    { loading: isCreatingOrderByGuest, error: creatingOrderByGuestError },
  ] = useCreateOrderByGuestUserMutation();
  const [
    createOrderByAuthorizedUser,
    {
      loading: isCreatingOrderByAuthorizedUser,
      error: creatingOrderByAuthorizedUserError,
    },
  ] = useCreateOrderByAuthorizedUserMutation();
  const isAuthenticated = useUserStore((store) => store.checkAuthenticated());
  const itemsToOrder = useItemsToOrder();
  const handleOrderSuccess = useSuccessfulOrderHandler();

  const createOrder = useCallback(
    async (values: CreateOrderSubmitForm) => {
      const transformedItemsToOrder: CreateOrderByAuthorizedUserInput["treatmentSessions"] =
        itemsToOrder.map((itemToOrder) => ({
          employeeId: itemToOrder.employee.id,
          treatmentId: itemToOrder.treatment.id,
          startsAt: itemToOrder.sessionStartsAt,
        }));

      const baseVariables = {
        message: values.message,
        treatmentSessions: transformedItemsToOrder,
      };

      if (isAuthenticated) {
        await createOrderByAuthorizedUser({
          variables: { input: baseVariables },
        });
        handleOrderSuccess();

        return;
      }

      const guestUserVariables = {
        ...baseVariables,
        message: values.message,
        email: values.email,
        name: values.name,
        phoneNumber: values.phoneNumber,
      };

      await createOrderByGuestUser({
        variables: {
          input: guestUserVariables,
        },
      });
      handleOrderSuccess();
    },
    [isAuthenticated]
  );

  useEffect(() => {
    if (creatingOrderByGuestError) {
      showSnackbar({
        message: creatingOrderByGuestError.message,
        autohide: false,
      });
    }
  }, [creatingOrderByGuestError]);

  useEffect(() => {
    if (creatingOrderByAuthorizedUserError) {
      showSnackbar({
        message: creatingOrderByAuthorizedUserError.message,
        autohide: true,
      });
    }
  }, [creatingOrderByAuthorizedUserError]);

  const isLoading = isCreatingOrderByGuest || isCreatingOrderByAuthorizedUser;

  return [createOrder, { isLoading }] as const;
}
