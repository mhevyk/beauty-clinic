import { Formik } from "formik";
import SignInForm from "./components/SignInForm";
import AuthAlternativeLink from "@pages/SignUpPage/components/AuthAlternativeLink";
import { Box, Button, styled } from "@mui/material";
import { SignInSchema } from "./schema/signInSchema";

const ButtonStyled = styled(Button)({
  padding: "5.28px 50px",
});

export type SignInFormValues = {
  usernameOrEmail: string;
  password: string;
};

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
      validationSchema={SignInSchema}
    >
      {({ handleSubmit }) => (
        <>
          <Box sx={{ mb: "48px" }}>
            <SignInForm />
          </Box>
          <ButtonStyled
            variant="primary"
            fullWidth
            onClick={handleSubmit as () => void}
          >
            Sign In
          </ButtonStyled>
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
