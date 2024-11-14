import { styled } from "@mui/material";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";

import theme from "@/theme/theme.ts";

type BoxStyledProps = {
  backgroundColor: string;
};

export const BoxStyled = styled(Box)(({ backgroundColor }: BoxStyledProps) => {
  return {
    [theme.breakpoints.up("lg")]: {
      height: 662,
    },
    height: 422,
    backgroundColor: backgroundColor,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  };
});

export const StackStyled = styled(Stack)({
  position: "relative",
  top: "35%",
});
