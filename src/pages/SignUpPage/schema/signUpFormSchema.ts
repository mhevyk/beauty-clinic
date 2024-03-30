import * as Yup from "yup";

export const signUpSchema = Yup.object({
  username: Yup.string()
    .min(3, "Username must be at least 3 characters")
    .required("Username is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  phoneNumber: Yup.string().matches(
    /^\d{10}$/,
    "Phone number must be 10 digits"
  ),
});
