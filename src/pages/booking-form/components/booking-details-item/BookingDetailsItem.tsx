import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { format } from "date-fns";

import { OrderItem } from "@/utils/get-sessions-to-order-from-cart/getSessionsToOrderFromCart";
import minutesToHourAndMinutes from "@/utils/minutes-to-hour-and-minutes/minutesToHourAndMinutes";

type BookingDetailsItemProps = {
  orderItem: OrderItem;
};

export default function BookingDetailsItem({
  orderItem,
}: BookingDetailsItemProps) {
  const { treatment, employee, sessionStartsAt } = orderItem;

  return (
    <Box minHeight="116px" paddingBottom="12px">
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
