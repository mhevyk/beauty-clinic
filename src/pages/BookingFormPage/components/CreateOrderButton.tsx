import ButtonWithSpinner from "@/components/ButtonWithSpinner";
import { styled } from "@mui/material";
import { useFormikContext } from "formik";

const ActionButton = styled(ButtonWithSpinner)({
  marginTop: "12px",
});

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
