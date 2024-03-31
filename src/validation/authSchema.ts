import * as Yup from "yup";

const passwordValidation = Yup.string()
  .required("Password is required")
  .min(5, "Password must be at least 5 characters")
  .max(255, "Password must be at most 255 characters");

const usernameValidation = Yup.string().min(
  3,
  "Username must be at least 3 characters"
);
const emailValidation = Yup.string().email("Invalid email");

export const repeatPasswordFormSchema = Yup.object({
  password: passwordValidation,
  repeatedPassword: Yup.string()
    .required("Repeated password is required")
    .oneOf([Yup.ref("password")], "Passwords must match"),
});

export const signInFormSchema = Yup.object({
  usernameOrEmail: Yup.string()
    .required("Username or email is required")
    .test("is-username-or-email", "Invalid username or email", (value) => {
      // Allow empty value (handled by required validation)
      if (!value) {
        return true;
      }

      if (value.includes("@")) {
        return emailValidation.isValidSync(value);
      }

      return usernameValidation.isValidSync(value);
    }),
  password: passwordValidation,
});

export const signUpFormSchema = Yup.object({
  username: usernameValidation.required("Username is required"),
  email: emailValidation.required("Email is required"),
  phoneNumber: Yup.string().matches(
    /^\d{10}$/,
    "Phone number must be 10 digits"
  ),
});
