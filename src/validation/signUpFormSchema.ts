import * as Yup from "yup";

import {
  passwordFieldValidation,
  phoneNumberFieldValidation,
  usernameFieldValidation,
} from "./common";
import { emailFormSchema } from "./emailFormSchema";

export const signUpFormSchema = Yup.object({
  username: usernameFieldValidation.required("Username is required"),
  phoneNumber: phoneNumberFieldValidation,
}).concat(emailFormSchema);

export const repeatPasswordFormSchema = Yup.object({
  password: passwordFieldValidation,
  repeatedPassword: Yup.string()
    .required("Repeated password is required")
    .oneOf([Yup.ref("password")], "Passwords must match"),
});
