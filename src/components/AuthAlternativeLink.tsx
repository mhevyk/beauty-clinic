import { Box, Divider, styled } from "@mui/material";

import AppLink from "./AppLink";

const DividerStyled = styled(Divider)({
  "&::before, &::after": {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
});

const HorizontalDividerStyled = styled(DividerStyled)(({ theme }) => ({
  margin: "41px auto 32px",
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    maxWidth: "198px",
  },
}));

const VerticalDividerWrapper = styled(Box)({
  display: "flex",
  justifyContent: "center",
});

const VerticalDividerStyled = styled(DividerStyled)({
  backgroundColor: "rgba(0, 0, 0, 0.5)",
});

const LinkStyled = styled(AppLink)({
  flex: 1,
  display: "flex",
  justifyContent: "center",
});

type AuthFooterProps = {
  linkProps: {
    to: string;
    label: string;
  };
};

export default function AuthAlternativeLink({ linkProps }: AuthFooterProps) {
  return (
    <Box display="flex" flexDirection="column">
      <HorizontalDividerStyled aria-hidden="true">or</HorizontalDividerStyled>
      <Box sx={{ display: "flex" }}>
        <LinkStyled variant="secondary" to="/">
          Back to home
        </LinkStyled>
        <VerticalDividerWrapper>
          <VerticalDividerStyled aria-hidden="true" orientation="vertical" />
        </VerticalDividerWrapper>
        <LinkStyled variant="accent" to={linkProps.to}>
          {linkProps.label}
        </LinkStyled>
      </Box>
    </Box>
  );
}
