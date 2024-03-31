export type PasswordFormValues = {
  password: string;
  repeatedPassword: string;
};

export type SignUpFormValues = PasswordFormValues & {
  username: string;
  email: string;
  phoneNumber: string;
};

export type SignInFormValues = Pick<PasswordFormValues, "password"> & {
  usernameOrEmail: string;
};
