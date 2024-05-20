import { useCartStore } from "@store/cart/cartStore";
import CartItemCard from "./components/CartItemCard";
import { Box, Divider, Typography, styled } from "@mui/material";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";

const Wrapper = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.CreamyDawn.main,
  padding: "100px 50px",
}));

// TODO: remove duplicated cart items
export default function CartPage() {
  const cartItems = useCartStore((store) => store.items);

  return (
    <Wrapper>
      <Typography>My cart</Typography>
      <Divider />
      <ResponsiveMasonry>
        <Masonry gutter="30px">
          {cartItems.map((cartItem) => (
            <CartItemCard key={cartItem.treatment.id} item={cartItem} />
          ))}
          {cartItems.map((cartItem) => (
            <CartItemCard key={cartItem.treatment.id} item={cartItem} />
          ))}
          {cartItems.map((cartItem) => (
            <CartItemCard key={cartItem.treatment.id} item={cartItem} />
          ))}
          {cartItems.map((cartItem) => (
            <CartItemCard key={cartItem.treatment.id} item={cartItem} />
          ))}
          {cartItems.map((cartItem) => (
            <CartItemCard key={cartItem.treatment.id} item={cartItem} />
          ))}
        </Masonry>
      </ResponsiveMasonry>
      <Divider textAlign="right" />
    </Wrapper>
  );
}
