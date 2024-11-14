import { styled } from "@mui/material";
import Box from "@mui/material/Box";

import AppLink from "@/components/app-link/AppLink";

export const LoginPromptBox = styled(Box)({
  padding: "12px",
  margin: "16px 0",
  //   TODO: add this button in palette
  backgroundColor: "#f1ebde",
});

export const LoginPromptTypography = styled("span")(({ theme }) => ({
  ...theme.typography.paragraph,
  fontSize: "14px",
}));

// TODO: replace all links in project to AppLink
export const LoginPromptLink = styled(AppLink)(({ theme }) => ({
  fontSize: "14px",
  textDecoration: "underline",
  color: theme.palette.secondary.main,
}));

export const TellAboutYou = styled("p")(({ theme }) => ({
  ...theme.typography.paragraph,
  margin: "20px 0 12px",
}));
