import { useNavigate } from "react-router-dom";

import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";

import { useGetCurrentUserDetailsQuery } from "@/api/generated";
import ButtonWithSpinner from "@/components/button-with-spinner/ButtonWithSpinner";
import { ClientDetailsFormValues } from "@/containers/forms/booking-form/BookingForm.types";
import useCreateOrder from "@/hooks/use-create-order/useCreateOrder";
import {
  ButtonGroup,
  CartBar,
  ContentBox,
  TotalPriceInformation,
} from "@/pages/cart/components/cart-checkout-bar/CartCheckoutBar.styled";
import { useCartStore } from "@/store/cart/cartStore.ts";
import { useUserStore } from "@/store/user/userStore.ts";
import getSessionsToOrderFromCart from "@/utils/get-sessions-to-order-from-cart/getSessionsToOrderFromCart";

export default function CartCheckoutBar() {
  const sessionsToOrderFromCart = getSessionsToOrderFromCart();
  const { data } = useGetCurrentUserDetailsQuery();

  const [createOrder, { isLoading: isOrderProcessing }] = useCreateOrder(
    sessionsToOrderFromCart
  );

  const totalPrice = useCartStore(store => store.getTotalPrice());
  const clearCart = useCartStore(store => store.clearCart);

  const isAuthenticated = useUserStore(store => store.checkAuthenticated());
  const navigate = useNavigate();

  const handleBookNow = async () => {
    const userDetails = data?.getCurrentUserDetails;

    if (userDetails && isAuthenticated) {
      const orderDetails: ClientDetailsFormValues = {
        name: userDetails.username,
        email: userDetails.email,
        phoneNumber: userDetails.phoneNumber ?? "",
      };
      await createOrder(orderDetails);
      return;
    }

    navigate("/booking-form", {
      state: { sessions: sessionsToOrderFromCart },
    });
  };

  return (
    <CartBar>
      <Divider color="#c7bdb5" />
      <ContentBox>
        <TotalPriceInformation>
          <Typography fontWeight="500" fontSize="18px">
            Total Price:
          </Typography>

          <Typography fontSize="18px" fontWeight="500">
            ${totalPrice}
          </Typography>
        </TotalPriceInformation>
        <ButtonGroup>
          <Button size="small" variant="primary-outlined" onClick={clearCart}>
            Clear cart
          </Button>
          <ButtonWithSpinner
            onClick={handleBookNow}
            loading={isOrderProcessing}
            size="small"
            variant="primary"
          >
            Book Now
          </ButtonWithSpinner>
        </ButtonGroup>
      </ContentBox>
    </CartBar>
  );
}
