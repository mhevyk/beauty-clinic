import {
  Box,
  Button,
  Collapse,
  Divider,
  IconButton,
  keyframes,
  styled,
} from "@mui/material";
import caretIcon from "@icons/caret-left.svg?react";
import useToggle from "@hooks/useToggle.ts";
import useItemsToOrder from "@pages/BookingFormPage/hooks/useItemsToOrder";
import BookingDetailsItem from "./BookingDetailsItem";

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
  shouldForwardProp: (prop) => prop !== "pointsToRight",
})<CaretIconProps>(({ pointsToRight, theme }) => ({
  stroke: theme.palette.secondary.main,
  animation: `${pointsToRight ? rotateForward : rotateBackward} ${ANIMATION_DURATION_MS}ms forwards`,
}));

export default function BookingDetails() {
  const { isOpen, toggle } = useToggle();
  const itemsToOrder = useItemsToOrder();

  return (
    <>
      <Box alignItems="center" display="flex" onClick={toggle}>
        <ButtonStyled fullWidth>Booking Details</ButtonStyled>
        <IconButton>
          <IconStyled pointsToRight={isOpen} />
        </IconButton>
      </Box>
      <Collapse in={isOpen} sx={{ maxHeight: "220px", overflowY: "scroll" }}>
        {itemsToOrder.map((orderItem) => (
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
