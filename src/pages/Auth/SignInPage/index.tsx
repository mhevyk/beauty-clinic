import { Formik } from "formik";
import SignInForm from "./components/SignInForm";
import AuthAlternativeLink from "../components/AuthAlternativeLink";
import { Box } from "@mui/material";
import { signInFormSchema } from "@validation/signInFormSchema";
import { SignInFormValues } from "../types";
import { useSignInMutation } from "@api/hooks";
import { useNavigate } from "react-router-dom";
import ButtonWithSpinner from "@components/ButtonWithSpinner";

const initialFormValues: SignInFormValues = {
  usernameOrEmail: "",
  password: "",
};

export default function SignInPage() {
  const [signIn, { loading: isSigningIn }] = useSignInMutation();
  const navigate = useNavigate();

  async function handleSubmit(values: SignInFormValues) {
    try {
      const response = await signIn({ variables: { input: values } });
      const token = response.data?.signIn.token;

      if (!token) {
        throw new Error("Auth failed");
      }

      localStorage.setItem("token", token);
      navigate("/");
    } catch (error) {
      // TODO: use toast to display error
      console.log(error);
    }
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
