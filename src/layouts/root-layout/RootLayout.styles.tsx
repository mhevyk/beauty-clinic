import { styled } from "@mui/material";
import Box from "@mui/material/Box";

import theme from "@/theme/theme";

export const SidebarOmitWrapper = styled(Box)({
  margin: "auto",
  maxWidth: "1900px",
  [theme.breakpoints.up("md")]: {
    paddingLeft: "78px",
  },
});
