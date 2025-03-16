import React from "react";

import useMediaQuery from "@mui/material/useMediaQuery";

import {
  BoxStyled,
  ErrorImageSVGStyled,
} from "@/pages/error/components/page-content/PageContent.styled.ts";
import AppButton from "@/styles/app-button/AppButton.tsx";
import AppTypography from "@/styles/app-typography/AppTypography.tsx";
import theme from "@/theme/theme.ts";

type PageContentProps = {
  errorInformation?: React.ReactNode;
};

export default function PageContent({ errorInformation }: PageContentProps) {
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const textVariant = isSmallScreen ? "h6" : "h3";

  return (
    <>
      <BoxStyled>
        <ErrorImageSVGStyled />
        <AppTypography variant={textVariant}>
          Oops! Something went wrong
        </AppTypography>
        {errorInformation ? (
          <AppTypography variant={textVariant}>
            {errorInformation}
          </AppTypography>
        ) : (
          <AppTypography variant={textVariant}>with the server.</AppTypography>
        )}
        <br />
        <AppButton to="/">Back to Home</AppButton>
      </BoxStyled>
    </>
  );
}
