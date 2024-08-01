import { styled } from "@mui/material";
import Box from "@mui/material/Box";

import AppLink from "@/components/AppLink";
import BookingForm from "@/pages/BookingFormPage/components/ClientDetails/components/BookingForm.tsx";
import { useUserStore } from "@/store/user/userStore.ts";

const LoginPromptBox = styled(Box)(({ theme }) => ({
  padding: "12px",
  margin: "16px 0",
  backgroundColor: theme.palette.CreamBeige.main,
}));

const LoginPromptTypography = styled("span")(({ theme }) => ({
  ...theme.typography.paragraph,
  fontSize: "14px",
}));

// TODO: replace all links in project to AppLink
const LoginPromptLink = styled(AppLink)(({ theme }) => ({
  fontSize: "14px",
  textDecoration: "underline",
  color: theme.palette.secondary.main,
}));

const TellAboutYou = styled("p")(({ theme }) => ({
  ...theme.typography.paragraph,
  margin: "20px 0 12px",
}));

export default function ClientDetails() {
  const isAuthenticated = useUserStore(store => store.checkAuthenticated());

  if (isAuthenticated) {
    return <BookingForm />;
  }

  return (
    <>
      <TellAboutYou>Tell us a bit about yourself</TellAboutYou>
      <LoginPromptBox>
        <LoginPromptTypography>Already have an account?</LoginPromptTypography>{" "}
        <LoginPromptLink to="/auth/signin">Log In</LoginPromptLink>{" "}
        <LoginPromptTypography>for faster booking.</LoginPromptTypography>
      </LoginPromptBox>
      <BookingForm />
    </>
  );
}
