import { ActionButton } from "@/pages/booking-form/components/create-order-button/CreateOrderButton.styled";

type CreateOrderButtonProps = {
  isOrderProcessing: boolean;
  type?: "submit" | "button";
};

export default function CreateOrderButton({
  isOrderProcessing,
  type = "button",
}: CreateOrderButtonProps) {
  return (
    <ActionButton
      type={type}
      loading={isOrderProcessing}
      fullWidth
      size="small"
      variant="primary"
    >
      Book Now
    </ActionButton>
  );
}
