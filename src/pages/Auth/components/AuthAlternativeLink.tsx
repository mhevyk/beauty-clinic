import { Divider, Box, styled } from "@mui/material";
import { Link } from "react-router-dom";

const DividerStyled = styled(Divider)(({ theme }) => ({
  padding: "0 8px",
  marginTop: "41px",
  marginBottom: "32px",
  width: "100%",
  "&::before, &::after": {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  [theme.breakpoints.up("md")]: {
    maxWidth: "198px",
  },
}));

// TODO: fix types
const LinkStyled = styled(Link)(({ theme }) => ({
  color: theme.palette.FieryOrange.main,
  textDecoration: "underline",
  transition: "all 300ms",
  "&:active, &:hover": {
    color: theme.palette.FieryOrange.main,
    opacity: 0.6,
  },
}));

type AuthFooterProps = {
  linkProps: {
    to: string;
    label: string;
  };
};

export default function AuthAlternativeLink({ linkProps }: AuthFooterProps) {
  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      <DividerStyled aria-hidden="true">or</DividerStyled>
      <LinkStyled to={linkProps.to}>{linkProps.label}</LinkStyled>
    </Box>
  );
}
