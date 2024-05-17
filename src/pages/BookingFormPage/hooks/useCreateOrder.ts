import {
  useCreateOrderByAuthorizedUserMutation,
  useCreateOrderByGuestUserMutation,
} from "@api/hooks";
import { useUserStore } from "@store/user/userStore";
import { CreateOrderSubmitForm } from "..";
import { useCallback, useEffect } from "react";
import getOrderItemsFromCart from "../utils/getOrderItemsFromCart";
import showSnackbar from "@utils/showSnackbar";

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

  const createOrder = useCallback(
    async (values: CreateOrderSubmitForm) => {
      const sessions = getOrderItemsFromCart();

      const baseVariables = {
        message: values.message,
        treatmentSessions: sessions,
      };

      if (isAuthenticated) {
        await createOrderByAuthorizedUser({
          variables: { input: baseVariables },
        });

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
