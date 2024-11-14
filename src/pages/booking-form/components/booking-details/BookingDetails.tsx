import { useLocation } from "react-router-dom";

import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";

import useToggle from "@/hooks/use-toggle/useToggle.ts";
import BookingDetailsItem from "@/pages/booking-form/components/booking-details-item/BookingDetailsItem";
import {
  ButtonStyled,
  IconStyled,
} from "@/pages/booking-form/components/booking-details/BookingDetails.styled";
import useItemsToOrder from "@/pages/booking-form/hooks/use-items-to-order/useItemsToOrder";
import { useUserStore } from "@/store/user/userStore.ts";
import { OrderItem } from "@/utils/get-sessions-to-order-from-cart/getSessionsToOrderFromCart.ts";

export default function BookingDetails() {
  const { isOpen, toggle } = useToggle();
  const location = useLocation();

  const isAuthenticated = useUserStore(store => store.checkAuthenticated());
  const itemsToOrderFromHook = useItemsToOrder();

  const itemsToOrderFromState = location.state?.sessions ?? null;
  const itemsToOrder: OrderItem[] =
    itemsToOrderFromState || itemsToOrderFromHook;

  return (
    <>
      <Box alignItems="center" display="flex" onClick={toggle}>
        <ButtonStyled fullWidth>Booking Details</ButtonStyled>
        <IconButton>
          <IconStyled pointsToRight={isOpen} />
        </IconButton>
      </Box>
      <Collapse
        in={isOpen}
        sx={{
          maxHeight: isAuthenticated ? "110px" : "220px",
          overflowY: "scroll",
        }}
      >
        {itemsToOrder.map(orderItem => (
          <BookingDetailsItem
            key={`${orderItem.treatment.id}-${orderItem.employee.id}-${orderItem.sessionStartsAt}`}
            orderItem={orderItem}
          />
        ))}
      </Collapse>
      <Divider color="black" />
    </>
  );
}
