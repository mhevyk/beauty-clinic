import { Components } from "@mui/material";
import { palette } from "@theme/base";

// TODO: add link variants
export const MuiLinkStyles: Components["MuiLink"] = {
  variants: [
    {
      props: { variant: "accent" },
      style: {
        color: palette.FieryOrange!.main,
        textDecoration: "underline",
        transition: "all 300ms",
        "&:active, &:hover": {
          color: palette.FieryOrange!.main,
          opacity: 0.6,
        },
      },
    },
  ],
};
