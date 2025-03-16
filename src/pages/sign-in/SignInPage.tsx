import Box from "@mui/material/Box";
import { Formik } from "formik";

import AppHelmet from "@/components/app-helmet/AppHelmet";
import ButtonWithSpinner from "@/components/button-with-spinner/ButtonWithSpinner";
import AuthAlternativeLink from "@/containers/auth-alternative-link/AuthAlternativeLink";
import { PasswordFormValues } from "@/containers/forms/password-form/PasswordForm";
import SignInForm from "@/containers/forms/sign-in-form/SignInForm";
import useSignIn from "@/hooks/use-sign-in/useSignIn";
import ResetPasswordLink from "@/pages/sign-in/components/forgot-password-link/ForgotPasswordLink";
import { signInFormSchema } from "@/validation/signInFormSchema";

export type SignInFormValues = Pick<PasswordFormValues, "password"> & {
  usernameOrEmail: string;
};

const initialFormValues: SignInFormValues = {
  usernameOrEmail: "",
  password: "",
};

export default function SignInPage() {
  const [signIn, { isSigningIn }] = useSignIn();

  async function onSubmit(values: SignInFormValues) {
    await signIn(values);
  }

  return (
    <AppHelmet title="Sign in">
      <Formik
        initialValues={initialFormValues}
        onSubmit={onSubmit}
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
    </AppHelmet>
  );
}
