import * as Yup from "yup";
import { usernameFieldValidation, passwordFieldValidation } from "./common";
import { emailFormSchema } from "./emailFormSchema";
import { PHONE_NUMBER_PATTERN } from "@constants/index";

// Combile all PHONE_NUMBER_PATTERN elements into single pattern
const PHONE_NUMBER_JOINED_PATTERN = new RegExp(
  PHONE_NUMBER_PATTERN.map((component) => {
    return component instanceof RegExp ? component.source : `\\${component}`;
  }).join("")
);

export const signUpFormSchema = Yup.object({
  username: usernameFieldValidation.required("Username is required"),
  phoneNumber: Yup.string().matches(PHONE_NUMBER_JOINED_PATTERN, {
    message: "Phone number should match pattern (xxx) xxx-xxxx",
  }),
}).concat(emailFormSchema);

export const repeatPasswordFormSchema = Yup.object({
  password: passwordFieldValidation,
  repeatedPassword: Yup.string()
    .required("Repeated password is required")
    .oneOf([Yup.ref("password")], "Passwords must match"),
});
