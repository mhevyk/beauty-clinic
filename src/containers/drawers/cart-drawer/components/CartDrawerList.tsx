import { Fragment } from "react/jsx-runtime";

import { styled } from "@mui/material";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";

import CartDrawerItem from "@/containers/drawers/cart-drawer/components/CartDrawerItem";
import { useCartStore } from "@/store/cart/cartStore";

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
  const cartItems = useCartStore(store => store.getItems());

  if (cartItems.length === 0) {
    return (
      <EmptyCartTypography variant="paragraph">
        Cart is empty
      </EmptyCartTypography>
    );
  }

  return (
    <List>
      {cartItems.map(item => (
        <Fragment key={item.treatment.id}>
          <CartDrawerItem item={item} closeCartDrawer={closeCartDrawer} />
          <Divider />
        </Fragment>
      ))}
    </List>
  );
}
