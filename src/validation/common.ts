import { EMAIL_PATTERN } from "@constants/index";
import * as Yup from "yup";

export const usernameFieldValidation = Yup.string()
  .min(3, "Username must be at least 3 characters")
  .max(50, "Username must be at most 50 characters");

export const emailFieldValidation = Yup.string().matches(
  EMAIL_PATTERN,
  "Invalid email"
);

export const passwordFieldValidation = Yup.string()
  .required("Password is required")
  .min(5, "Password must be at least 5 characters")
  .max(255, "Password must be at most 255 characters");

export const phoneNumberFieldValidation = Yup.string().matches(
  /^\d{10}$/,
  "Phone number must be 10 digits",
);

export const messageFieldValidation = Yup.string()
  .min(10, "Message must be at least 10 characters")
  .max(500, "Message must be at most 500 characters");
