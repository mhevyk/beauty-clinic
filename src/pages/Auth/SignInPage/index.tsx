import { Formik } from "formik";
import SignInForm from "./components/SignInForm";
import AuthAlternativeLink from "../components/AuthAlternativeLink";
import { Box, Button } from "@mui/material";
import { signInFormSchema } from "@validation/authSchema";
import { SignInFormValues } from "../types";

const initialFormValues: SignInFormValues = {
  usernameOrEmail: "",
  password: "",
};

export default function SignInPage() {
  function handleSubmit(values: SignInFormValues) {
    // TODO: handle values
    console.log(values);
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
