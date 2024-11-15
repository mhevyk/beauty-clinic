import { IconButton, styled } from "@mui/material";

import BurgerIcon from "@/assets/icons/burger-icon.svg";

export const BurgerButtonIcon = styled(BurgerIcon)({
  cursor: "pointer",
  width: 27,
  height: 23,
});

export const IconButtonStyled = styled(IconButton)({
  width: 50,
  height: 50,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  marginLeft: 13,
  marginTop: 26,
});
