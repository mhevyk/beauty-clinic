import { createTheme } from "@mui/material";

import { breakpoints, palette, typography } from "@/theme/base";
import components from "@/theme/components";

const theme = createTheme({
  palette,
  typography,
  breakpoints,
  components,
});

export default theme;
