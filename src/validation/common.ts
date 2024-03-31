import * as Yup from "yup";

export const usernameFieldValidation = Yup.string()
  .min(3, "Username must be at least 3 characters")
  .max(50, "Username must be at most 50 characters");

export const emailFieldValidation = Yup.string().email("Invalid email");

export const passwordFieldValidation = Yup.string()
  .required("Password is required")
  .min(5, "Password must be at least 5 characters")
  .max(255, "Password must be at most 255 characters");
