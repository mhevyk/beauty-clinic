import { useLocation } from "react-router-dom";

import { styled } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Collapse from "@mui/material/Collapse";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import { keyframes } from "@mui/material/styles";

import caretIcon from "@/assets/icons/caret-left.svg";

import useToggle from "@/hooks/use-toggle/useToggle.ts";
import useItemsToOrder from "@/pages/booking-form/hooks/useItemsToOrder.ts";
import { useUserStore } from "@/store/user/userStore.ts";
import { OrderItem } from "@/utils/get-sessions-to-order-from-cart/getSessionsToOrderFromCart.ts";

import BookingDetailsItem from "./BookingDetailsItem.tsx";

const ANIMATION_DURATION_MS = 550;

const ButtonStyled = styled(Button)({
  padding: "7px 0",
  flexDirection: "column",
  alignItems: "baseline",
});

type CaretIconProps = {
  pointsToRight: boolean;
};

//TODO: make this animation global
const IconStyled = styled(caretIcon, {
  shouldForwardProp: prop => prop !== "pointsToRight",
})<CaretIconProps>(({ pointsToRight, theme }) => ({
  stroke: theme.palette.secondary.main,
  animation: `${pointsToRight ? rotateForward : rotateBackward} ${ANIMATION_DURATION_MS}ms forwards`,
}));

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

const rotateForward = keyframes`
  from {
    transform: rotate(270deg);
  }
  to {
    transform: rotate(90deg);
  }
`;

const rotateBackward = keyframes`
  from {
    transform: rotate(90deg);
  }
  to {
    transform: rotate(270deg);
  }
`;
