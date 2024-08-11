import { useNavigate } from "react-router-dom";

import { useCartStore } from "@/store/cart/cartStore.ts";
import showSnackbar from "@/utils/show-snackbar/showSnackbar";

export default function useSuccessfulOrderHandler() {
  const navigate = useNavigate();
  const clearCart = useCartStore(store => store.clearCart);

  async function successfulOrderHandler() {
    showSnackbar({
      variant: "success",
      message: "Order was created successfully",
      autohide: true,
      autohideDuration: 4000,
    });
    clearCart();
    navigate("/");
  }

  return successfulOrderHandler;
}
