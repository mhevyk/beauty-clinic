import { styled, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const TypographyLogo = styled(Typography)({
  position: "absolute",
  top: "50%",
  width: 75,
  transform: "rotate(270deg)",
  cursor: "pointer",
  "&:hover": {
    color: "rgb(199, 179, 163)",
  },
});

export default function Logo() {
  return (
    <Link to="/">
      <TypographyLogo variant="FontArialBlack2">Lily.</TypographyLogo>
    </Link>
  );
}
