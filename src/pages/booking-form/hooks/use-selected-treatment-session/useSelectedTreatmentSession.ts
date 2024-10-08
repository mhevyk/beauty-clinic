import { useParams } from "react-router-dom";

import { useGetTreatmentByIdQuery } from "@/api/generated";
import { useOrderStore } from "@/store/order/orderStore.ts";

type BookTreatmentSessionParams = {
  treatmentId: string;
};

export default function useSelectedTreatmentSession() {
  const params = useParams<BookTreatmentSessionParams>();
  const treatmentId = Number(params.treatmentId);

  const { data, loading } = useGetTreatmentByIdQuery({
    variables: { treatmentId },
  });

  const sessionStartsAt = useOrderStore(store => store.sessionStartsAt);
  const employee = useOrderStore(store => store.employee);

  return [
    {
      treatmentId,
      treatment: data?.treatment,
      sessionStartsAt,
      employee,
    },
    { isLoading: loading },
  ] as const;
}
