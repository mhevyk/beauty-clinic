import * as Yup from "yup";
import { emailFieldValidation, usernameFieldValidation } from "./common";

export const contactFormSchema = Yup.object().shape({
  name: usernameFieldValidation.required("Username is required"),
  email: emailFieldValidation.required("Email is required"),
  message: Yup.string()
    .min(10, "Message must be at least 10 characters")
    .max(500, "Message must be at most 500 characters")
    .required("Message is required"),
});
