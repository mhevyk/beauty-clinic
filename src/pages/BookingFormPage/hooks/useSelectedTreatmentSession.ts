import { useParams } from "react-router-dom";
import useBookingDetails from "./useBookingDetails";
import { useOrderStore } from "@store/order/orderStore";

type BookTreatmentSessionParams = {
  treatmentId: string;
};

export default function useSelectedTreatmentSession() {
  const params = useParams<BookTreatmentSessionParams>();
  const treatmentId = Number(params.treatmentId);

  const { treatments, isLoading } = useBookingDetails(treatmentId);

  const sessionStartsAt = useOrderStore((store) => store.sessionStartsAt);
  const employee = useOrderStore((store) => store.employee);

  return [
    {
      treatmentId,
      treatments,
      sessionStartsAt,
      employee,
    },
    { isLoading },
  ] as const;
}
