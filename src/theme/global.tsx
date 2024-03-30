import { CssBaseline, GlobalStyles } from "@mui/material";
import theme from "./theme.ts";

const styles = {
  html: {
    scrollbarGutter: location.pathname.startsWith("/auth")
      ? undefined
      : "stable",
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
  ".MuiDialog-root:has(.MuiDialog-paperFullScreen)": {
    width: "100vw",
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
