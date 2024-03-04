import { styled, Typography } from "@mui/material";
import { Link } from "react-router-dom";

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
      <TypographyLogo variant="FontArialBlack2">
        <LinkStyled to="/">Lily.</LinkStyled>
      </TypographyLogo>
    </>
  );
}
