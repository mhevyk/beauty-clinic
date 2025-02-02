import { ActionButton } from "@/pages/booking-form/components/create-order-button/CreateOrderButton.styled";

type CreateOrderButtonProps = {
  isOrderProcessing: boolean;
};

export default function CreateOrderButton({
  isOrderProcessing,
}: CreateOrderButtonProps) {
  return (
    <ActionButton
      loading={isOrderProcessing}
      fullWidth
      size="small"
      variant="primary"
    >
      Book Now
    </ActionButton>
  );
}
