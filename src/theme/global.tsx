import { CssBaseline, GlobalStyles } from "@mui/material";

import theme from "@/theme/theme";

const styles = {
  html: {
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
  ".mapboxgl-popup-content": {
    padding: "7px 13px",
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
