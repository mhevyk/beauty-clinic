import { useCartStore } from "@store/cart/cartStore";
import showSnackbar from "@utils/showSnackbar";
import { useNavigate } from "react-router-dom";

export default function useSuccessfulOrderHandler() {
  const navigate = useNavigate();
  const clearCart = useCartStore((store) => store.clearCart);

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
