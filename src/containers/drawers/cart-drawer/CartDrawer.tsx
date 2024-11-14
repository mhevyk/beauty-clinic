import Drawer from "@mui/material/Drawer";
import Typography from "@mui/material/Typography";

import {
  ANIMATION_DURATION_MS,
  CaretIcon,
  CaretIconButton,
  CartContent,
  CartHeader,
  DrawerContentWrapper,
} from "@/containers/drawers/cart-drawer/CartDrawer.styled";
import CartDrawerFooter from "@/containers/drawers/cart-drawer/components/CartDrawerFooter/CartDrawerFooter";
import CartDrawerList from "@/containers/drawers/cart-drawer/components/CartDriwerList/CartDrawerList";
import useLockPageScroll from "@/hooks/use-lock-page-scroll/useLockPageScroll";
import { useCartStore } from "@/store/cart/cartStore";

type CartDrawerProps = {
  isCartDrawerOpen: boolean;
  closeCartDrawer: () => void;
};

// TODO: fix scroll
export default function CartDrawer({
  isCartDrawerOpen,
  closeCartDrawer,
}: CartDrawerProps) {
  const totalPrice = useCartStore(store => store.getTotalPrice());
  useLockPageScroll(isCartDrawerOpen, false);

  return (
    <Drawer
      anchor="right"
      transitionDuration={ANIMATION_DURATION_MS}
      open={isCartDrawerOpen}
      onClose={closeCartDrawer}
      disableScrollLock
      elevation={0}
    >
      <DrawerContentWrapper>
        <CartHeader>
          <CaretIconButton onClick={closeCartDrawer}>
            <CaretIcon pointsToRight={isCartDrawerOpen} />
          </CaretIconButton>
          <Typography variant="heading" color="white" fontSize="22px">
            Cart
          </Typography>
        </CartHeader>
        <CartContent>
          <CartDrawerList closeCartDrawer={closeCartDrawer} />
        </CartContent>
        {totalPrice > 0 && <CartDrawerFooter totalPrice={totalPrice} />}
      </DrawerContentWrapper>
    </Drawer>
  );
}
