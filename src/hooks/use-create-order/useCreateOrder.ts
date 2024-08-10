import { useCallback, useEffect } from "react";

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
    async (values: CreateOrderSubmitForm) => {
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
    [isAuthenticated]
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
