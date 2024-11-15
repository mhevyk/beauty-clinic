import { Box, IconButton, styled } from "@mui/material";

import CloseIconSvg from "@/assets/icons/close-icon.svg";

export const CloseIcon = styled(CloseIconSvg)({
  position: "relative",
  cursor: "pointer",
  width: 25,
  height: 28,
});

export const IconButtonStyled = styled(IconButton)({
  left: 360,
  top: 50,
});

export const MenuWrapper = styled(Box)({
  width: 430,
});
