import { Formik } from "formik";
import SignInForm from "./components/SignInForm";
import AuthAlternativeLink from "@components/AuthAlternativeLink";
import { Box } from "@mui/material";
import { signInFormSchema } from "@validation/signInFormSchema";
import ButtonWithSpinner from "@components/ButtonWithSpinner";
import useSignIn from "@hooks/auth/useSignIn";
import { PasswordFormValues } from "@components/PasswordForm";
import ResetPasswordLink from "./components/ForgotPasswordLink";

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
