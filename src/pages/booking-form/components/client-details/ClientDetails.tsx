import BookingForm from "@/containers/forms/booking-form/BookingForm";
import {
  LoginPromptBox,
  LoginPromptLink,
  LoginPromptTypography,
  TellAboutYou,
} from "@/pages/booking-form/components/client-details/ClientDetails.styled";
import { useUserStore } from "@/store/user/userStore.ts";

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
