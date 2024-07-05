import { Components } from "@mui/material";

import { palette } from "@/theme/base";

const baseLinkStyles = {
  textDecoration: "underline",
  transition: "all 300ms",
  "&:active, &:hover": {
    opacity: 0.6,
  },
};

// TODO: add link variants
// TODO: fix type
const MuiLinkStyles: Components["MuiLink"] = {
  variants: [
    {
      props: { variant: "secondary" },
      style: {
        ...baseLinkStyles,
        color: palette.secondary!.main,
        "&:active, &:hover": {
          color: palette.secondary!.main,
        },
      },
    },
    {
      props: { variant: "accent" },
      style: {
        ...baseLinkStyles,
        color: palette.FieryOrange!.main,
        "&:active, &:hover": {
          color: palette.FieryOrange!.main,
        },
      },
    },
  ],
};

export default MuiLinkStyles;
