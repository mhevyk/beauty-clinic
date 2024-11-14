import { styled } from "@mui/material";
import IconButton from "@mui/material/IconButton";

export const MIDDLE_BURGER_BAR_Y = 46.5;

// FIXME: close icon is not focusable when mobile menu is open
export const BurgerIconButton = styled(IconButton)(props => {
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

export const BurgerIcon = styled("svg")(({ theme }) => ({
  fill: theme.palette.secondary.dark,
}));

export const BurgerLine = styled("rect")({
  transition: "500ms",
  transformOrigin: "center",
  width: 80,
  height: 7,
});
