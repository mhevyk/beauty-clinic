import { useNavigate } from "react-router-dom";

import { styled } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";

import ButtonWithSpinner from "@/components/ButtonWithSpinner.tsx";
import useCreateOrder from "@/hooks/useCreateOrder.ts";
import { CreateOrderSubmitForm } from "@/pages/BookingFormPage";
import { useCartStore } from "@/store/cart/cartStore.ts";
import { useUserStore } from "@/store/user/userStore.ts";
import getSessionsToOrderFromCart from "@/utils/getSessionsToOrderFromCart.ts";
import { useGetCurrentUserDetailsQuery } from "@api/hooks";

const CartBar = styled(Box)(({ theme }) => ({
  width: "100%",
  backgroundColor: theme.palette.PinkMarbleSky.main,
  position: "sticky",
  bottom: 0,
  borderTop: `6px solid ${theme.palette.PinkMarbleSky.main}`,
}));

const ButtonGroup = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: "20px",
});

const TotalPriceInformation = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: "80px",
});

const ContentBox = styled(Box)({
  display: "flex",
  padding: "16px",
  justifyContent: "space-between",
  flexWrap: "wrap",
  gap: "20px",
});

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
      const orderDetails: CreateOrderSubmitForm = {
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
