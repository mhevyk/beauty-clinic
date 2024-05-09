import * as Yup from "yup";
import {
  emailFieldValidation,
  messageFieldValidation,
  phoneNumberFieldValidation,
  usernameFieldValidation,
} from "@validation/common.ts";

export const bookingFormSchema = Yup.object().shape({
  name: usernameFieldValidation.required("Username is required"),
  email: emailFieldValidation.required("Email is required"),
  phoneNumber: phoneNumberFieldValidation,
  message: messageFieldValidation,
});
