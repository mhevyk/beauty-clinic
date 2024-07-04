import * as Yup from "yup";

import {
  emailFieldValidation,
  messageFieldValidation,
  usernameFieldValidation,
} from "./common";

export const contactFormSchema = Yup.object().shape({
  name: usernameFieldValidation.required("Username is required"),
  email: emailFieldValidation.required("Email is required"),
  message: messageFieldValidation.required("Message is required"),
});
