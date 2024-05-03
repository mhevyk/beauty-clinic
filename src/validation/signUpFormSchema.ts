import * as Yup from "yup";
import { usernameFieldValidation, passwordFieldValidation } from "./common";
import { emailFormSchema } from "./emailFormSchema";

export const signUpFormSchema = Yup.object({
  username: usernameFieldValidation.required("Username is required"),
  phoneNumber: Yup.string().matches(
    /^\d{10}$/,
    "Phone number must be 10 digits"
  ),
}).concat(emailFormSchema);

export const repeatPasswordFormSchema = Yup.object({
  password: passwordFieldValidation,
  repeatedPassword: Yup.string()
    .required("Repeated password is required")
    .oneOf([Yup.ref("password")], "Passwords must match"),
});
