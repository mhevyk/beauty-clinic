import {
  Box,
  Button,
  Drawer,
  IconButton,
  Stack,
  Typography,
  keyframes,
  styled,
} from "@mui/material";
import CaretIconSvg from "@icons/caret-left.svg?react";
import useLockPageScroll from "@hooks/useLockPageScroll";
import { useCartStore } from "@store/cart/cartStore";
import renderDrawerCartList from "./utils/renderDrawerCartList";

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
  flexDirection: "column",
  justifyContent: "center",
  padding: "34px",
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

// TODO: remove mocks after implementing end logic
const mockTreatment1Session1 = {
  treatment: {
    id: 1,
    name: "Oxygen facial",
    pricePerUnit: 200,
  },
  session: {
    id: 2,
    employee: {
      name: "Max",
    },
    time: {
      start: new Date(),
      end: new Date(),
    },
  },
};

const mockTreatment1Session2 = {
  treatment: mockTreatment1Session1.treatment,
  session: {
    ...mockTreatment1Session1.session,
    id: 3,
  },
};

const mockTreatment2Session1 = {
  ...mockTreatment1Session1,
  treatment: {
    ...mockTreatment1Session1.treatment,
    name: "Nitrogen facial",
    id: 3,
  },
};

type CartDrawerProps = {
  isCartDrawerOpen: boolean;
  closeCartDrawer: () => void;
};

export default function CartDrawer({
  isCartDrawerOpen,
  closeCartDrawer,
}: CartDrawerProps) {
  const addItemToCart = useCartStore((store) => store.addToCart);

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
            <CaretIcon pointsToRight={isCartDrawerOpen} />
          </CaretIconButton>
          <Typography variant="heading" color="white" fontSize="22px">
            Cart
          </Typography>
        </CartHeader>
        <CartContent>
          {/* TODO: remove button later */}
          <Stack gap="20px">
            <Button
              variant="primary"
              size="small"
              onClick={() => addItemToCart(mockTreatment1Session1)}
            >
              Add Oxygen facial treatment
            </Button>
            <Button
              variant="primary"
              size="small"
              onClick={() => addItemToCart(mockTreatment1Session2)}
            >
              Add another Oxygen facial treatment
            </Button>
            <Button
              variant="primary"
              size="small"
              onClick={() => addItemToCart(mockTreatment2Session1)}
            >
              Add Nitrogen facial treatment
            </Button>
          </Stack>
          {renderDrawerCartList()}
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
