import { styled, Typography } from "@mui/material";

const Logo = () => {
  const TypographyLogo = styled(Typography)({
    bottom: 0,
    left: 0,
    right: 0,
    top: 0,
    position: "absolute",
    justifySelf: "start",
    alignSelf: "center",
    width: 75,
    transform: "rotate(270deg)",
    cursor: "pointer",
    "&:hover": {
      color: "rgb(199, 179, 163)",
    },
  });
  return (
    <TypographyLogo variant="FontArialBlack2">
      <h2>Lily.</h2>
    </TypographyLogo>
  );
};
export default Logo;
