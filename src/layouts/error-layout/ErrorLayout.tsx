import { Link } from "react-router-dom";

import { alpha } from "@mui/material";
import { styled } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

import ErrorIcon from "@/assets/icons/error-icon.svg";

const BookNowLinkButton = styled(Button)({
  padding: "8px 30px",
  display: "block",
  marginTop: "22px",
  width: "max-content",
}) as typeof Button;

const ErrorStyled = styled(ErrorIcon)({
  height: "60px",
});

const ErrorFallback = styled(Box)(({ theme }) => ({
  backgroundColor: alpha(theme.palette.background.default, 0.5),
  padding: "42px 56px",
  margin: "100px 0",
  width: "100%",
  [theme.breakpoints.down("sm")]: {
    padding: "42px 6px",
  },
}));

const BoxStyled = styled(Box)({
  marginBottom: "8px",
  display: "flex",
  alignItems: "center",
});

const TitleStyled = styled("h4")(({ theme }) => ({
  ...theme.typography.heading,
  margin: 0,
  padding: "0 32px",
  fontSize: "22px",
  textTransform: "uppercase",
  [theme.breakpoints.down("sm")]: {
    fontSize: "14px",
    padding: "0 12px",
  },
}));

const ButtonGroup = styled(Box)({
  display: "flex",
  justifyContent: "end",
});

const Description = styled("p")(({ theme }) => ({
  ...theme.typography.paragraph,
  margin: "12px 0",
  fontSize: "14px",
  letterSpacing: "0.1rem",
  [theme.breakpoints.down("sm")]: {
    fontSize: "12px",
  },
}));

const ListItemStyled = styled("li")({
  marginBottom: "4px",
  fontSize: "14px",
  letterSpacing: "0.1rem",
});

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
