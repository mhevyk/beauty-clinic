import { GetTreatmentByIdDocument, Treatment } from "@api/hooks";
import { client } from "@config/apollo";
import { useCartStore } from "@store/cart/cartStore";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

type LocationState = {
  fromCalendar?: boolean;
  fromCart?: boolean;
};

export default function useBookingDetails(treatmentId: number) {
  const [treatments, setTreatments] = useState<Treatment[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();
  const { fromCalendar, fromCart } = location.state ?? ({} as LocationState);

  useEffect(() => {
    if (fromCalendar) {
      setIsLoading(true);
      client
        .query({
          query: GetTreatmentByIdDocument,
          variables: { treatmentId },
        })
        .then((response) => setTreatments([response.data.treatment]))
        .catch((error) => error.message)
        .finally(() => setIsLoading(false));
    } else if (fromCart) {
      const itemsFromCart = useCartStore.getState().getItems();
      const treatmentsFromCart = itemsFromCart.map((item) => item.treatment);
      setTreatments(treatmentsFromCart);
    }
  }, [fromCalendar, fromCalendar, setIsLoading, setTreatments]);

  return { treatments, isLoading };
}
