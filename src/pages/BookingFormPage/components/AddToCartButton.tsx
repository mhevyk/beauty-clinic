import ButtonWithSpinner from "@components/ButtonWithSpinner";
import { Box, Tooltip, styled, useMediaQuery } from "@mui/material";
import { useCartStore } from "@store/cart/cartStore";
import { useOrderStore } from "@store/order/orderStore";
import { useGetTreatmentByIdQuery } from "@api/hooks";
import { useState } from "react";
import theme from "@theme/theme";

const ActionButton = styled(ButtonWithSpinner)({
  ":disabled": {
    border: "1px solid #bbb", // TODO: add some gray color to theme
  },
});

type AddToCartButtonProps = {
  treatmentId: number;
};

export default function AddToCartButton({ treatmentId }: AddToCartButtonProps) {
  const addToCart = useCartStore((store) => store.addToCart);
  const checkSessionExists = useCartStore((store) => store.checkSessionExists);
  const sessionStartsAt = useOrderStore((store) => store.sessionStartsAt);
  const employee = useOrderStore((store) => store.employee);
  const isMediumScreen = useMediaQuery(theme.breakpoints.up("md"));

  const { data } = useGetTreatmentByIdQuery({ variables: { treatmentId } });
  const treatment = data?.treatment;

  const initialIsButtonDisabled =
    !treatment ||
    !employee ||
    !sessionStartsAt ||
    checkSessionExists(treatment.id, {
      employeeId: employee.id,
      sessionStartsAt,
    });

  const [isButtonDisabled, setIsButtonDisabled] = useState(
    initialIsButtonDisabled
  );

  function handleAddToCart() {
    if (isButtonDisabled) {
      return;
    }

    addToCart(treatment!, {
      employeeId: employee!.id,
      employeeName: employee!.name,
      sessionStartsAt: sessionStartsAt!,
    });
    setIsButtonDisabled(true);
  }

  return (
    <Tooltip
      title={isButtonDisabled ? "Session is already in the cart!" : ""}
      arrow
      placement={isMediumScreen ? "left" : "top"}
    >
      <Box component="span" sx={{ marginTop: "12px" }}>
        <ActionButton
          type="button"
          disabled={isButtonDisabled}
          fullWidth
          size="small"
          variant="primary-outlined"
          onClick={handleAddToCart}
        >
          Add to Cart
        </ActionButton>
      </Box>
    </Tooltip>
  );
}
