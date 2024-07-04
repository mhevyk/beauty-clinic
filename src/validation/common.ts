import * as Yup from "yup";

import { EMAIL_PATTERN, PHONE_NUMBER_PATTERN } from "@/constants/index";

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

// Combine all PHONE_NUMBER_PATTERN elements into single pattern
const PHONE_NUMBER_JOINED_PATTERN = new RegExp(
  PHONE_NUMBER_PATTERN.map(component => {
    return component instanceof RegExp ? component.source : `\\${component}`;
  }).join("")
);

export const phoneNumberFieldValidation = Yup.string().matches(
  PHONE_NUMBER_JOINED_PATTERN,
  {
    message: "Phone number should match pattern (xxx) xxx-xxxx",
  }
);

export const messageFieldValidation = Yup.string()
  .min(10, "Message must be at least 10 characters")
  .max(500, "Message must be at most 500 characters");
