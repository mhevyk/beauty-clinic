import { format } from "date-fns";
import AppTypography from "design-system/app-typography/AppTypography";

import "@/pages/booking-form/components/booking-details-item/BookingDetailsItem.scss";
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
    <div className="booking-details-item">
      <AppTypography>{treatment.name}</AppTypography>
      <AppTypography>
        {format(sessionStartsAt, `MMMM d, yyyy h:mm aaa `)}
      </AppTypography>
      <AppTypography
        className="booking-details-item__subitems"
        variant="caption"
      >
        {employee.name}
      </AppTypography>
      <AppTypography
        className="booking-details-item__subitems"
        variant="caption"
      >
        {minutesToHourAndMinutes(treatment.duration)}
      </AppTypography>
    </div>
  );
}
