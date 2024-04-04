import { Formik } from "formik";
import SignInForm from "./components/SignInForm";
import AuthAlternativeLink from "../components/AuthAlternativeLink";
import { Box, Button } from "@mui/material";
import { signInFormSchema } from "@validation/signInFormSchema";
import { SignInFormValues } from "../types";
import ButtonWithSpinner from "@components/ButtonWithSpinner";
import useSignIn from "@pages/Auth/hooks/useSignIn";

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
          <Box sx={{ mb: "48px" }}>
            <SignInForm />
          </Box>
          <Button
            size="small"
            variant="primary"
            fullWidth
            onClick={handleSubmit as () => void}
          >
            Sign In
          </Button>
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
