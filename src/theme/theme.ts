import { createTheme } from "@mui/material";

import { breakpoints, palette, typography } from "./base";
import components from "./components/index.ts";

const theme = createTheme({
  palette,
  typography,
  breakpoints,
  components,
});

export default theme;
