import * as Yup from "yup";
import { emailFieldValidation, usernameFieldValidation, passwordFieldValidation } from "./common";

export const signUpFormSchema = Yup.object({
  username: usernameFieldValidation.required("Username is required"),
  email: emailFieldValidation.required("Email is required"),
  phoneNumber: Yup.string().matches(
    /^\d{10}$/,
    "Phone number must be 10 digits"
  ),
});

export const repeatPasswordFormSchema = Yup.object({
  password: passwordFieldValidation,
  repeatedPassword: Yup.string()
    .required("Repeated password is required")
    .oneOf([Yup.ref("password")], "Passwords must match"),
});
