import burgerbutton from "@icons/burger-icon.svg";
import { IconButton, styled } from "@mui/material";

const BurgerButtonIcon = styled("img")({
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
      <BurgerButtonIcon src={burgerbutton} alt="Burger icon" />
    </IconButtonStyled>
  );
}
