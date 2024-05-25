import { useCartStore } from "@store/cart/cartStore";
import CartDrawerItem from "../components/CartDrawerItem";
import { Divider, List, Typography, styled } from "@mui/material";
import { Fragment } from "react/jsx-runtime";

const EmptyCartTypography = styled(Typography)({
  display: "block",
  fontSize: "18px",
  marginTop: "30px",
  textAlign: "center",
});

type CartDrawerListProps = {
  closeCartDrawer: () => void;
};

export default function CartDrawerList({
  closeCartDrawer,
}: CartDrawerListProps) {
  const cartItems = useCartStore((store) => store.getItems());

  if (cartItems.length === 0) {
    return (
      <EmptyCartTypography variant="paragraph">
        Cart is empty
      </EmptyCartTypography>
    );
  }

  return (
    <List>
      {cartItems.map((item) => (
        <Fragment key={item.treatment.id}>
          <CartDrawerItem item={item} closeCartDrawer={closeCartDrawer} />
          <Divider />
        </Fragment>
      ))}
    </List>
  );
}