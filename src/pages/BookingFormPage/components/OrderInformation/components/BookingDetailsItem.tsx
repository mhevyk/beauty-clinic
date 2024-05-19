import { Box, Chip, Typography } from "@mui/material";
import { OrderItem } from "@pages/BookingFormPage/utils/getSessionsToOrderFromCart";
import minutesToHourAndMinutes from "@utils/minutesToHourAndMinutes";
import { format } from "date-fns";

type BookingDetailsItemProps = {
  orderItem: OrderItem;
};

export default function BookingDetailsItem({
  orderItem,
}: BookingDetailsItemProps) {
  const { treatment, employee, sessionStartsAt, isSelectedSession } = orderItem;

  return (
    <Box minHeight="116px" paddingBottom="12px">
      <Chip label={isSelectedSession ? "Current" : "From cart"} size="small" />
      <Typography fontSize="16px">{treatment.name}</Typography>
      <Typography fontSize="16px">
        {format(sessionStartsAt, `MMMM d, yyyy h:mm aaa `)}
      </Typography>
      <Typography color="#605f5d" fontSize="14px">
        {employee.name}
      </Typography>
      <Typography color="#605f5d" fontSize="14px">
        {minutesToHourAndMinutes(treatment.duration)}
      </Typography>
    </Box>
  );
}
