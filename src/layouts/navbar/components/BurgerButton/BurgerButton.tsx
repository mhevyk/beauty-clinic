import { IconButtonProps } from "@mui/material/IconButton";

import {
  BurgerIcon,
  BurgerIconButton,
  BurgerLine,
  MIDDLE_BURGER_BAR_Y,
} from "@/layouts/navbar/components/BurgerButton/BurgerButton.styled";

type BurgerButtonProps = {
  isActive: boolean;
} & IconButtonProps;

export default function BurgerButton({
  isActive = false,
  ...rest
}: BurgerButtonProps) {
  return (
    <BurgerIconButton aria-expanded={isActive ? "true" : "false"} {...rest}>
      <BurgerIcon viewBox="0 0 100 100" width="30">
        <BurgerLine className="line top" x="10" y="15" rx="5" />
        <BurgerLine
          className="line middle"
          x="10"
          y={MIDDLE_BURGER_BAR_Y}
          rx="5"
        />
        <BurgerLine className="line bottom" x="10" y="78" rx="5" />
      </BurgerIcon>
    </BurgerIconButton>
  );
}
