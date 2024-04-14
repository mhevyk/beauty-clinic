import { createTheme } from "@mui/material";
import { palette, typography, breakpoints } from "./base";
import components from "./components/index.ts";

const theme = createTheme({
  palette,
  typography,
  breakpoints,
  components
});

export default theme;
