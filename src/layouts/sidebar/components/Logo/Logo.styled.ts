import { Link } from "react-router-dom";

import { Typography, styled } from "@mui/material";

export const TypographyLogo = styled(Typography)({
  margin: "auto",
  writingMode: "vertical-rl",
  transform: "scale(-1)",
  "&:hover": {
    color: "rgb(199, 179, 163)",
  },
});

export const LinkStyled = styled(Link)({
  color: "inherit",
});
