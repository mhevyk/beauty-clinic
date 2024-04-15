import ButtonWithSpinner from "@components/ButtonWithSpinner";
import PasswordForm, { PasswordFormValues } from "@components/PasswordForm";
import { Box } from "@mui/material";
import { repeatPasswordFormSchema } from "@validation/signUpFormSchema";
import { Formik } from "formik";
import { useSearchParams } from "react-router-dom";

const initialFormValues: PasswordFormValues = {
  password: "",
  repeatedPassword: "",
};

export default function ResetPasswordpage() {
  const [searchParams] = useSearchParams();

  const token = searchParams.get("token");

  async function handleSubmit(values: PasswordFormValues) {
    // TODO: connect to backend
    console.log(values, token);
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
          >
            Reset password
          </ButtonWithSpinner>
        </>
      )}
    </Formik>
  );
}
