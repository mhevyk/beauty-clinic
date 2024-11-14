import { styled } from "@mui/material";
import { keyframes } from "@mui/material";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";

import CaretIconSvg from "@/assets/icons/caret-left.svg";

export const ANIMATION_DURATION_MS = 550;

export const DrawerContentWrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  height: "100%",
  width: "350px",
  [theme.breakpoints.down(400)]: {
    width: "100vw",
  },
}));

export const CartHeader = styled(Box)(({ theme }) => ({
  position: "relative",
  backgroundColor: theme.palette.secondary.main,
  padding: "35px 0",
  textAlign: "center",
}));

export const CaretIconButton = styled(IconButton)({
  position: "absolute",
  left: "31px",
  top: "50%",
  transform: "translateY(-50%)",
  "&:focus": {
    background: "rgba(255, 255, 255, 0.1)",
  },
});

// TODO: add scroll icon to inform user about scroll: https://github.com/mhevyk/beauty-clinic/issues/58
export const CartContent = styled(Box)({
  flexGrow: 1,
  overflowY: "auto",
  padding: "0 8px",
});

type CaretIconProps = {
  pointsToRight: boolean;
};

export const CaretIcon = styled(CaretIconSvg, {
  shouldForwardProp: prop => prop !== "pointsToRight",
})<CaretIconProps>(({ pointsToRight, theme }) => ({
  stroke: theme.palette.primary.main,
  animation: `${pointsToRight ? rotateForward : rotateBackward} ${ANIMATION_DURATION_MS}ms forwards`,
}));

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
