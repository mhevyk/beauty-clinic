import { useLocation } from "react-router-dom";

import { styled } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Collapse from "@mui/material/Collapse";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";

import CaretAnimatedIcon from "@/components/CaretAnimatedIcon.tsx";
import useToggle from "@/hooks/useToggle.ts";
import useItemsToOrder from "@/pages/BookingFormPage/hooks/useItemsToOrder";
import { useUserStore } from "@/store/user/userStore";
import { OrderItem } from "@/utils/getSessionsToOrderFromCart.ts";

import BookingDetailsItem from "./BookingDetailsItem";

const ANIMATION_DURATION_MS = 550;

const ButtonStyled = styled(Button)({
  padding: "7px 0",
  flexDirection: "column",
  alignItems: "baseline",
});

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
          <CaretAnimatedIcon
            hasToggle={isOpen}
            AnimationDuration={ANIMATION_DURATION_MS}
            rotateStartPosition="270deg"
            rotateEndPosition="90deg"
          />
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
