import Box from "@mui/material/Box";

import {
  HorizontalDividerStyled,
  LinkStyled,
  VerticalDividerStyled,
  VerticalDividerWrapper,
} from "@/containers/auth-alternative-link/AuthAlternativeLink.styled";

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
