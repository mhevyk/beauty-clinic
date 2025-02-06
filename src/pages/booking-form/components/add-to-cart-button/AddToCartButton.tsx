import { useState } from "react";

import { useMediaQuery } from "@mui/material";
import Tooltip from "@mui/material/Tooltip";
import AppButton from "design-system/app-button/AppButton";

import useSelectedTreatmentSession from "@/pages/booking-form/hooks/use-selected-treatment-session/useSelectedTreatmentSession";
import { useCartStore } from "@/store/cart/cartStore";
import theme from "@/theme/theme.ts";

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
      <AppButton
        type="button"
        variant="secondary"
        onClick={handleAddToCart}
        disabled={isButtonDisabled}
        width="full"
        size="sm"
      >
        Add to Cart
      </AppButton>
    </Tooltip>
  );
}
