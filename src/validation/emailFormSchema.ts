import * as Yup from "yup";

import { emailFieldValidation } from "./common";

export const emailFormSchema = Yup.object({
  email: emailFieldValidation.required("Email is required"),
});
