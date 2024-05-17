import ButtonWithSpinner from "@components/ButtonWithSpinner";
import { styled } from "@mui/material";
import { useCartStore } from "@store/cart/cartStore";
import { useOrderStore } from "@store/order/orderStore";
import { useGetTreatmentByIdQuery } from "@api/hooks";

const ActionButton = styled(ButtonWithSpinner)({
  marginTop: "12px",
});

type AddToCartButtonProps = {
  treatmentId: number;
};

export default function AddToCartButton({ treatmentId }: AddToCartButtonProps) {
  const addToCart = useCartStore((store) => store.addToCart);
  const { sessionStartsAt, employee } = useOrderStore();
  const { data } = useGetTreatmentByIdQuery({ variables: { treatmentId } });
  const treatment = data?.treatment;

  const isButtonDisabled = !treatment || !employee || !sessionStartsAt;

  function handleAddToCart() {
    if (isButtonDisabled) {
      return;
    }

    addToCart({
      treatment,
      session: {
        sessionStartsAt,
        employeeId: employee.id,
        employeeName: employee.name,
      },
    });
  }

  return (
    <ActionButton
      disabled={isButtonDisabled}
      fullWidth
      size="small"
      variant="primary-outlined"
      onClick={handleAddToCart}
    >
      Add to Cart
    </ActionButton>
  );
}
