import { styled } from "@mui/material";
import ButtonBase from "@mui/material/ButtonBase";

import theme from "@/theme/theme";

export const BlogTabButton = styled(ButtonBase)({
  fontSize: "16px",
  "&:focus-visible": {
    outline: `2px solid ${theme.palette.secondary.main}`,
  },
});
