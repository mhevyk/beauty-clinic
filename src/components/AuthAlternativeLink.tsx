import { Divider, Box, styled } from "@mui/material";
import AppLink from "./AppLink";

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
      <AppLink variant="accent" to={linkProps.to}>{linkProps.label}</AppLink>
    </Box>
  );
}
