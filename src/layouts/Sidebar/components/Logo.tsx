import { Link } from "react-router-dom";

import { Typography, styled } from "@mui/material";

const TypographyLogo = styled(Typography)({
  margin: "auto",
  writingMode: "vertical-rl",
  transform: "scale(-1)",
  "&:hover": {
    color: "rgb(199, 179, 163)",
  },
});

const LinkStyled = styled(Link)({
  color: "inherit",
});

export default function Logo() {
  return (
    <>
      <TypographyLogo fontSize="22px" variant="heading">
        <LinkStyled to="/">Lily.</LinkStyled>
      </TypographyLogo>
    </>
  );
}
