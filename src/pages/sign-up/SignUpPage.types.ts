import { PasswordFormValues } from "@/containers/forms/password-form/PasswordForm";

export type SignUpFormValues = PasswordFormValues & {
  username: string;
  email: string;
  phoneNumber: string;
};
