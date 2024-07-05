import * as Yup from "yup";

import {
  emailFieldValidation,
  passwordFieldValidation,
  usernameFieldValidation,
} from "./common";

export const signInFormSchema = Yup.object({
  usernameOrEmail: Yup.string()
    .required("Username or email is required")
    .test("is-username-or-email", "Invalid username or email", value => {
      // Allow empty value (handled by required validation)
      if (!value) {
        return true;
      }

      if (value.includes("@")) {
        return emailFieldValidation.isValidSync(value);
      }

      return usernameFieldValidation.isValidSync(value);
    }),
  password: passwordFieldValidation,
});
