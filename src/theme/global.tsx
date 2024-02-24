import { CssBaseline, GlobalStyles } from "@mui/material";

export function CSSInit() {
  return (
    <>
      <CssBaseline />
      <GlobalStyles
        styles={{
          html: {
            scrollbarGutter: "stable",
          },
        }}
      />
    </>
  );
}
