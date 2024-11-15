import { useFormikContext } from "formik";

import { ActionButton } from "@/pages/booking-form/components/create-order-button/CreateOrderButton.styled";

type CreateOrderButtonProps = {
  isOrderProcessing: boolean;
};

export default function CreateOrderButton({
  isOrderProcessing,
}: CreateOrderButtonProps) {
  const { handleSubmit } = useFormikContext();

  return (
    <ActionButton
      onClick={() => handleSubmit()}
      loading={isOrderProcessing}
      fullWidth
      size="small"
      variant="primary"
    >
      Book Now
    </ActionButton>
  );
}
