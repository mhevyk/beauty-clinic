import * as Yup from "yup";

export const SignInSchema = Yup.object({
  usernameOrEmail: Yup.string()
    .required("Username or email is required")
    .test("is-username-or-email", "Invalid username or email", (value) => {
      // Allow empty value (handled by required validation)
      if (!value) {
        return true;
      }

      if (value.includes("@")) {
        return Yup.string().email().isValidSync(value);
      }

      return Yup.string().min(3).isValidSync(value);
    }),
  password: Yup.string()
    .required("Password is required")
    .min(5, "Password must be at least 5 characters")
    .max(255, "Password must be at most 255 characters"),
});
