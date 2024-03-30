import * as Yup from "yup";

export const passwordSchema = Yup.object({
  password: Yup.string()
    .required("Password is required")
    .min(5, "Password must be at least 5 characters")
    .max(255, "Password must be at most 255 characters"),
  repeatedPassword: Yup.string()
    .required("Repeated password is required")
    .oneOf([Yup.ref("password")], "Passwords must match"),
});
