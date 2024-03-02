import { CssBaseline, GlobalStyles } from "@mui/material";
import theme from "./theme.ts";

const styles = {
  html: {
    scrollbarGutter: "stable",
    scrollBehavior: "smooth",
    fontFamily: "Arial Black",
  },
  a: {
    textDecoration: "none",
    color: theme.palette.text.primary,

    "&:active": {
      color: theme.palette.primary.light,
    },
  },
  ul: {
    listStyle: "none",
    margin: 0,
    padding: 0,
  },
};

export function CSSInit() {
  return (
    <>
      <CssBaseline />
      <GlobalStyles styles={styles} />
    </>
  );
}
