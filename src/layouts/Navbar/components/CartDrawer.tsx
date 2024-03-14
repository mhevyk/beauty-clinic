import {
  Box,
  Drawer,
  IconButton,
  Typography,
  keyframes,
  styled,
} from "@mui/material";
import caretLeftIcon from "@icons/caret-left.svg";
import useLockPageScroll from "@hooks/useLockPageScroll";

const ANIMATION_DURATION_MS = 550;

const DrawerContentWrapper = styled(Box)(({ theme }) => ({
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

const CartContent = styled(Box)({
  display: "flex",
  justifyContent: "center",
  padding: "34px",
});

type CartDrawerProps = {
  isCartDrawerOpen: boolean;
  closeCartDrawer: () => void;
};

export default function CartDrawer({
  isCartDrawerOpen,
  closeCartDrawer,
}: CartDrawerProps) {
  // TODO: add logic to display cart items
  const itemsInCartCount = 0;

  useLockPageScroll(isCartDrawerOpen);

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
            <CaretIcon
              pointsToRight={isCartDrawerOpen}
              src={caretLeftIcon}
              alt="Caret icon"
            />
          </CaretIconButton>
          {/* TODO: add font */}
          <Typography
            variant="FontArialBlack2"
            color="white"
            sx={{ fontSize: "22px" }}
          >
            Cart
          </Typography>
        </CartHeader>
        <CartContent>
          {itemsInCartCount > 0 ? (
            "Render cart items"
          ) : (
            <Typography variant="FontAvenirLight3" sx={{ fontSize: "18px" }}>
              {/* TODO: add font */}
              Cart is empty
            </Typography>
          )}
        </CartContent>
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

type CaretIconProps = {
  pointsToRight: boolean;
};

const CaretIcon = styled("img")<CaretIconProps>(({ pointsToRight }) => ({
  animation: `${pointsToRight ? rotateForward : rotateBackward} ${ANIMATION_DURATION_MS}ms forwards`,
}));
