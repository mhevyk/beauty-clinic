import { styled } from "@mui/material";
import Stack from "@mui/material/Stack";

import theme from "@/theme/theme";

export const ButtonGroup = styled(Stack)({
  flexDirection: "row",
  gap: "18px",
  marginTop: "48px",
  [theme.breakpoints.down("md")]: {
    flexWrap: "wrap",
  },
});
