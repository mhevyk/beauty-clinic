import { emailFieldValidation } from "./common";
import * as Yup from "yup";

export const emailFormSchema = Yup.object({
  email: emailFieldValidation.required("Email is required"),
});
