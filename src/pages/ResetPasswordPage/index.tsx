import { useResetPasswordMutation } from "@api/hooks";
import AuthAlternativeLink from "@components/AuthAlternativeLink";
import ButtonWithSpinner from "@components/ButtonWithSpinner";
import PasswordForm, { PasswordFormValues } from "@components/PasswordForm";
import { Box } from "@mui/material";
import showSnackbar from "@utils/showSnackbar";
import { repeatPasswordFormSchema } from "@validation/signUpFormSchema";
import { Formik } from "formik";
import { useNavigate, useSearchParams } from "react-router-dom";

const initialFormValues: PasswordFormValues = {
  password: "",
  repeatedPassword: "",
};

export default function ResetPasswordpage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [resetPassword, { loading: isResettingPassword }] =
    useResetPasswordMutation();

  async function handleSubmit(values: PasswordFormValues) {
    try {
      const token = searchParams.get("token");

      if (token === null) {
        throw new Error("Invalid reset link, try again");
      }

      const data = { token, password: values.password };
      await resetPassword({ variables: { input: data } });
      navigate("/auth/signin", { replace: true });

      showSnackbar({
        variant: "success",
        autohide: true,
        autohideDuration: 3000,
        message: "Password was successfully reset\nPlease sign in now",
      });
    } catch (error) {
      const errorMessage =
        "Password reset token is not valid\nPlease go to sign in page and try resetting password again";
      showSnackbar({
        autohide: true,
        autohideDuration: 4000,
        message: errorMessage,
      });
    }
  }

  return (
    <Formik
      initialValues={initialFormValues}
      onSubmit={handleSubmit}
      validationSchema={repeatPasswordFormSchema}
    >
      {({ handleSubmit }) => (
        <>
          <Box sx={{ mb: "48px" }}>
            <PasswordForm />
          </Box>
          <ButtonWithSpinner
            variant="primary"
            size="small"
            fullWidth
            onClick={handleSubmit as () => void}
            loading={isResettingPassword}
          >
            Reset password
          </ButtonWithSpinner>
          <AuthAlternativeLink
            linkProps={{ label: "Create account", to: "/auth/signup" }}
          />
        </>
      )}
    </Formik>
  );
}
