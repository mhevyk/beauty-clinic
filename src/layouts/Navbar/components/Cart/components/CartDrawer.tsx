import {
  Box,
  Drawer,
  IconButton,
  Typography,
  keyframes,
  styled,
} from "@mui/material";
import CaretIconSvg from "@icons/caret-left.svg";
import useLockPageScroll from "@/hooks/useLockPageScroll";
import { useCartStore } from "@store/cart/cartStore";
import CartDrawerFooter from "./CartDrawerFooter";
import CartDrawerList from "./CartDrawerList";

const ANIMATION_DURATION_MS = 550;

const DrawerContentWrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  height: "100%",
  width: "350px",
  [theme.breakpoints.down(400)]: {
    width: "100vw",
  },
}));

const CartHeader = styled(Box)(({ theme }) => ({
  position: "relative",
  backgroundColor: theme.palette.secondary.main,
  padding: "35px 0",
  textAlign: "center",
}));

const CaretIconButton = styled(IconButton)({
  position: "absolute",
  left: "31px",
  top: "50%",
  transform: "translateY(-50%)",
  "&:focus": {
    background: "rgba(255, 255, 255, 0.1)",
  },
});

// TODO: add scroll icon to inform user about scroll: https://github.com/mhevyk/beauty-clinic/issues/58
const CartContent = styled(Box)({
  flexGrow: 1,
  overflowY: "auto",
  padding: "0 8px",
});

type CaretIconProps = {
  pointsToRight: boolean;
};

const CaretIcon = styled(CaretIconSvg, {
  shouldForwardProp: (prop) => prop !== "pointsToRight",
})<CaretIconProps>(({ pointsToRight, theme }) => ({
  stroke: theme.palette.primary.main,
  animation: `${pointsToRight ? rotateForward : rotateBackward} ${ANIMATION_DURATION_MS}ms forwards`,
}));

type CartDrawerProps = {
  isCartDrawerOpen: boolean;
  closeCartDrawer: () => void;
};

// TODO: fix scroll
export default function CartDrawer({
  isCartDrawerOpen,
  closeCartDrawer,
}: CartDrawerProps) {
  const totalPrice = useCartStore((store) => store.getTotalPrice());
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

const rotateForward = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(180deg);
  }
`;

const rotateBackward = keyframes`
  from {
    transform: rotate(180deg);
  }
  to {
    transform: rotate(0deg);
  }
`;
