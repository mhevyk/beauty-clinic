// TODO: change UI
import { CssBaseline, ThemeProvider, Typography } from "@mui/material";
import theme from "@theme/theme.ts";

export default function HomePage() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Typography variant="h2">How work fonts some text</Typography>
    </ThemeProvider>
  );
}
