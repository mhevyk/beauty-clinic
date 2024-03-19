import BurgerIcon from "@icons/burger-icon.svg?react";
import { IconButton, styled } from "@mui/material";

const BurgerButtonIcon = styled(BurgerIcon)({
  cursor: "pointer",
  width: 27,
  height: 23,
});

const IconButtonStyled = styled(IconButton)({
  width: 50,
  height: 50,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  marginLeft: 13,
  marginTop: 26,
});

type BurgerButtonProps = {
  openSidebar: () => void;
};

export default function BurgerButton({ openSidebar }: BurgerButtonProps) {
  return (
    <IconButtonStyled onClick={openSidebar}>
      <BurgerButtonIcon />
    </IconButtonStyled>
  );
}
