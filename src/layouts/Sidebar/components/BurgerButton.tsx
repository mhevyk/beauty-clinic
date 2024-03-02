import burgerbutton from "@icons/burger-icon.svg";
import { styled } from "@mui/material";

const BurgerButtonIcon = styled("img")({
  cursor: "pointer",
  width: 27,
  height: 23,
  marginLeft: 24,
  marginTop: 39,
});

type BurgerButtonProps = {
  openSidebar: () => void;
};

export default function BurgerButton({ openSidebar }: BurgerButtonProps) {
  return (
    <BurgerButtonIcon
      onClick={openSidebar}
      src={burgerbutton}
      alt="Burger icon"
    />
  );
}
