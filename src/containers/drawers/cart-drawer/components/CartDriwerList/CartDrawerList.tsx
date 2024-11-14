import { Fragment } from "react/jsx-runtime";

import Divider from "@mui/material/Divider";
import List from "@mui/material/List";

import CartDrawerItem from "@/containers/drawers/cart-drawer/components/CartDrawerItem/CartDrawerItem";
import { EmptyCartTypography } from "@/containers/drawers/cart-drawer/components/CartDriwerList/CartDrawerList.styled";
import { useCartStore } from "@/store/cart/cartStore";

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
