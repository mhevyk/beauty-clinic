import PasswordForm from "@/containers/forms/password-form/PasswordForm";
import SignUpForm from "@/containers/forms/sign-up-form/SignUpForm";
import { SignUpFormValues } from "@/pages/sign-up/SignUpPage.types";

export const initialFormValues: SignUpFormValues = {
  username: "",
  email: "",
  phoneNumber: "",
  password: "",
  repeatedPassword: "",
};

export const multistepFormConfig = {
  pages: [
    <SignUpForm key="sign-up-form" />,
    <PasswordForm key="password-form" />,
  ],
};
