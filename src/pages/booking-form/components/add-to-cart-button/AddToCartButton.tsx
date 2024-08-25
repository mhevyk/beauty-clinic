import { useState } from "react";

import { useMediaQuery } from "@mui/material";
import { styled } from "@mui/material";
import Box from "@mui/material/Box";
import Tooltip from "@mui/material/Tooltip";

import ButtonWithSpinner from "@/components/button-with-spinner/ButtonWithSpinner";
import useSelectedTreatmentSession from "@/pages/booking-form/hooks/use-selected-treatment-session/useSelectedTreatmentSession";
import { useCartStore } from "@/store/cart/cartStore.ts";
import theme from "@/theme/theme.ts";

const ActionButton = styled(ButtonWithSpinner)({
  ":disabled": {
    border: "1px solid #bbb", // TODO: add some gray color to theme
  },
});

export default function AddToCartButton() {
  const addToCart = useCartStore(store => store.addToCart);
  const checkSessionExists = useCartStore(store => store.checkSessionExists);

  const [{ employee, sessionStartsAt, treatment }] =
    useSelectedTreatmentSession();
  const isMediumScreen = useMediaQuery(theme.breakpoints.up("md"));

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
      employee: employee!,
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
