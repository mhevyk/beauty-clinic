import Box from "@mui/material/Box";
import { Formik } from "formik";

import AuthAlternativeLink from "@/components/AuthAlternativeLink.tsx";
import ButtonWithSpinner from "@/components/ButtonWithSpinner.tsx";
import { PasswordFormValues } from "@/components/PasswordForm.tsx";
import useSignIn from "@/hooks/auth/useSignIn.ts";
import { signInFormSchema } from "@/validation/signInFormSchema.ts";

import ResetPasswordLink from "./components/ForgotPasswordLink.tsx";
import SignInForm from "./components/SignInForm.tsx";

export type SignInFormValues = Pick<PasswordFormValues, "password"> & {
  usernameOrEmail: string;
};

const initialFormValues: SignInFormValues = {
  usernameOrEmail: "",
  password: "",
};

export default function SignInPage() {
  const [signIn, { isSigningIn }] = useSignIn();

  async function handleSubmit(values: SignInFormValues) {
    await signIn(values);
  }

  return (
    <Formik
      initialValues={initialFormValues}
      onSubmit={handleSubmit}
      validationSchema={signInFormSchema}
    >
      {({ handleSubmit }) => (
        <>
          <Box sx={{ mb: "25px" }}>
            <SignInForm />
            <ResetPasswordLink />
          </Box>
          <ButtonWithSpinner
            loading={isSigningIn}
            size="small"
            variant="primary"
            fullWidth
            onClick={handleSubmit as () => void}
          >
            Sign In
          </ButtonWithSpinner>
          <AuthAlternativeLink
            linkProps={{
              label: "Create account",
              to: "/auth/signup",
            }}
          />
        </>
      )}
    </Formik>
  );
}
