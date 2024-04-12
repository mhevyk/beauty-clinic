import { useCartStore } from "@store/cart/cartStore";
import CartDrawerItem from "../CartDrawerItem";
import { Typography } from "@mui/material";

export default function renderDrawerCartList() {
  const cartItems = useCartStore((store) => store.items);

  if (cartItems.length === 0) {
    return (
      <Typography variant="paragraph" fontSize="18px">
        Cart is empty
      </Typography>
    );
  }

  return cartItems.map((item) => (
    <CartDrawerItem key={item.treatment.id} item={item} />
  ));
}
