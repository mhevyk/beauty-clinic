import { IconButton, IconButtonProps, styled } from "@mui/material";

const BurgerIconButton = styled(IconButton)((props) => {
  const isButtonActive = props["aria-expanded"] === "true";

  if (!isButtonActive) {
    return;
  }

  return {
    ".top": {
      y: 45,
      rotate: "-45deg",
    },
    ".middle": {
      width: 0,
      x: 80,
      opacity: 0,
    },
    ".bottom": {
      y: 45,
      rotate: "45deg",
    },
  };
});

const BurgerIcon = styled("svg")(({ theme }) => ({
  width: 40,
  fill: theme.palette.primary.light,
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
      <BurgerIcon viewBox="0 0 100 100">
        <BurgerLine className="line top" x="10" y="20" rx="5" />
        <BurgerLine className="line middle" x="10" y="45" rx="5" />
        <BurgerLine className="line bottom" x="10" y="70" rx="5" />
      </BurgerIcon>
    </BurgerIconButton>
  );
}
