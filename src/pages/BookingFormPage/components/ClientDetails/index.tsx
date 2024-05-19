import { Box, styled } from "@mui/material";
import { Link } from "react-router-dom";
import BookingForm from "@pages/BookingFormPage/components/ClientDetails/components/BookingForm.tsx";
import { useUserStore } from "@store/user/userStore.ts";

const LoginPromptBox = styled(Box)({
  padding: "12px",
  margin: "16px 0",
  //   TODO: add this button in palette
  backgroundColor: "#f1ebde",
});

const LoginPromptTypography = styled("span")(({ theme }) => ({
  ...theme.typography.paragraph,
  fontSize: "14px",
}));

const LoginPromptLink = styled(Link)({
  fontSize: "14px",
  textDecoration: "underline",
});

const TellAboutYou = styled("p")(({ theme }) => ({
  ...theme.typography.paragraph,
  margin: "20px 0 12px",
}));

export default function ClientDetails() {
  const isAuthenticated = useUserStore((store) => store.checkAuthenticated());

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
