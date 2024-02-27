import { CssBaseline, GlobalStyles } from "@mui/material";
import theme from "./theme.ts";

export function CSSInit() {
  return (
    <>
      <CssBaseline />
      <GlobalStyles
        styles={{
          html: {
            scrollbarGutter: "stable",
            fontFamily: "Arial Black",
          },
          a: {
            textDecoration: "none",
            color: theme.palette.text.primary,
            "&:active": {
              color: theme.palette.primary.light,
            },
          },
        }}
      />
    </>
  );
}
