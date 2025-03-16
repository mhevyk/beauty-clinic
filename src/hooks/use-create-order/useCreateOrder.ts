import { useCallback, useEffect } from "react";

import {
  CreateOrderByAuthorizedUserInput,
  useCreateOrderByAuthorizedUserMutation,
  useCreateOrderByGuestUserMutation,
} from "@/api/generated";
import { ClientDetailsFormValues } from "@/containers/forms/booking-form/BookingForm.types";
import useSuccessfulOrderHandler from "@/pages/booking-form/hooks/use-successful-order-handler/useSuccessfulOrderHandler";
import { useUserStore } from "@/store/user/userStore";
import { OrderItem } from "@/utils/get-sessions-to-order-from-cart/getSessionsToOrderFromCart";
import showSnackbar from "@/utils/show-snackbar/showSnackbar";

export default function useCreateOrder(itemsToOrder: OrderItem[]) {
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
  const isAuthenticated = useUserStore(store => store.checkAuthenticated());
  const handleOrderSuccess = useSuccessfulOrderHandler();

  const createOrder = useCallback(
    async (values: ClientDetailsFormValues) => {
      const transformedItemsToOrder: CreateOrderByAuthorizedUserInput["treatmentSessions"] =
        itemsToOrder.map(itemToOrder => ({
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

      await createOrderByGuestUser({
        variables: {
          input: {
            ...baseVariables,
            ...values,
          },
        },
      });
      handleOrderSuccess();
    },
    [
      isAuthenticated,
      createOrderByGuestUser,
      createOrderByAuthorizedUser,
      itemsToOrder,
      handleOrderSuccess,
    ]
  );

  useEffect(() => {
    if (creatingOrderByGuestError) {
      showSnackbar({
        message: creatingOrderByGuestError.message,
        autohide: true,
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
