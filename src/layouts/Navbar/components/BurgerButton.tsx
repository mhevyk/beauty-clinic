import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import { styled } from "@mui/material";

const MIDDLE_BURGER_BAR_Y = 46.5;

// FIXME: close icon is not focusable when mobile menu is open
const BurgerIconButton = styled(IconButton)(props => {
  const isButtonActive = props["aria-expanded"] === "true";

  if (!isButtonActive) {
    return;
  }

  return {
    zIndex: 1301,
    ".top": {
      y: MIDDLE_BURGER_BAR_Y,
      rotate: "-45deg",
    },
    ".middle": {
      width: 0,
      x: 80,
      opacity: 0,
    },
    ".bottom": {
      y: MIDDLE_BURGER_BAR_Y,
      rotate: "45deg",
    },
  };
});

const BurgerIcon = styled("svg")(({ theme }) => ({
  fill: theme.palette.secondary.dark,
}));

const BurgerLine = styled("rect")({
  transition: "500ms",
  transformOrigin: "center",
  width: 80,
  height: 7,
});

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
