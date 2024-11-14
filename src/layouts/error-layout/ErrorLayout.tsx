import { Link } from "react-router-dom";

import Box from "@mui/material/Box";

import {
  BookNowLinkButton,
  BoxStyled,
  ButtonGroup,
  Description,
  ErrorFallback,
  ErrorStyled,
  ListItemStyled,
  TitleStyled,
} from "@/layouts/error-layout/ErrorLayout.styled";

type ErrorAlertLayoutProps = {
  backButtonPath?: string;
  errorMessage?: string;
  buttonLabel?: string;
  size?: "normal" | "small";
};

export default function ErrorAlertLayout({
  backButtonPath,
  errorMessage,
  buttonLabel = "Go Back",
  size = "normal",
}: ErrorAlertLayoutProps) {
  if (size === "small") {
    return (
      <>
        <Description>
          We encountered an unexpected error. Please try the following:
        </Description>
        <ul>
          <ListItemStyled>Check your internet connection.</ListItemStyled>
          <ListItemStyled>Reload the page.</ListItemStyled>
          <ListItemStyled>
            If the problem persists, try again later.
          </ListItemStyled>
        </ul>
      </>
    );
  }

  return (
    <Box display="flex" justifyContent="center">
      <ErrorFallback>
        <BoxStyled>
          <ErrorStyled />
          <TitleStyled>{errorMessage}</TitleStyled>
        </BoxStyled>
        <Description>
          We encountered an unexpected error. Please try the following:
        </Description>
        <ListItemStyled>Check your internet connection.</ListItemStyled>
        <ListItemStyled>Reload the page.</ListItemStyled>
        <ListItemStyled>
          If the problem persists, try again later.
        </ListItemStyled>
        {backButtonPath && (
          <ButtonGroup>
            <BookNowLinkButton
              component={Link}
              to={backButtonPath}
              variant="primary"
            >
              {buttonLabel}
            </BookNowLinkButton>
          </ButtonGroup>
        )}
      </ErrorFallback>
    </Box>
  );
}
