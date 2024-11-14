import {
  BurgerButtonIcon,
  IconButtonStyled,
} from "@/layouts/sidebar/components/BurgerButton/BurgerButton.styled";

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
