import { Button, Stack } from "@mui/material";
import PasswordForm from "./components/PasswordForm";
import SignUpForm from "./components/SignUpForm";
import { useMultistepForm } from "./hooks/useMultistepForm";
import AuthAlternativeLink from "../components/AuthAlternativeLink";
import theme from "@theme/theme";
import { Formik, useFormikContext } from "formik";
import { SignUpFormValues } from "../types";
import {
  repeatPasswordFormSchema,
  signUpFormSchema,
} from "@validation/signUpFormSchema";
import { useSignUpMutation } from "@api/hooks";
import ButtonWithSpinner from "@components/ButtonWithSpinner";
import { useNavigate } from "react-router-dom";
import { AUTH_TOKEN_KEY } from "@constants/index";

const initialFormValues: SignUpFormValues = {
  username: "",
  email: "",
  phoneNumber: "",
  password: "",
  repeatedPassword: "",
};

export default function SignUpPage() {
  const { page, controls, hasNextPage, hasPreviousPage, isFirstPage } =
    useMultistepForm({
      pages: [<SignUpForm />, <PasswordForm />],
    });
  const [signUp, { loading: isSigningUp }] = useSignUpMutation();
  const navigate = useNavigate();

  async function handleSubmit(values: SignUpFormValues) {
    try {
      const response = await signUp({ variables: { input: values } });
      const token = response.data?.signUp.token;

      if (!token) {
        throw new Error("SignUp failed");
      }

      localStorage.setItem(AUTH_TOKEN_KEY, token);
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
      validationSchema={
        isFirstPage ? signUpFormSchema : repeatPasswordFormSchema
      }
    >
      <>
        {page}
        <Stack
          direction="row"
          gap="18px"
          mt="48px"
          sx={{
            [theme.breakpoints.down("md")]: {
              flexWrap: "wrap",
            },
          }}
        >
          {hasPreviousPage && (
            <Button
              size="small"
              variant="primary-outlined"
              fullWidth
              onClick={controls.previousPage}
            >
              Back
            </Button>
          )}
          <NextPageButton
            hasNextPage={hasNextPage}
            openNextPage={controls.nextPage}
            loading={isSigningUp}
          />
        </Stack>
        <AuthAlternativeLink
          linkProps={{
            to: "/auth/signin",
            label: "Have an account",
          }}
        />
      </>
    </Formik>
  );
}

type NextPageButtonProps = {
  hasNextPage: boolean;
  openNextPage: () => void;
  loading: boolean;
};

function NextPageButton({
  hasNextPage,
  openNextPage,
  loading,
}: NextPageButtonProps) {
  const { handleSubmit, validateForm } = useFormikContext();
  async function handleNextPage() {
    if (!hasNextPage) {
      return handleSubmit();
    }

    const errors = await validateForm();
    if (Object.keys(errors).length === 0) {
      openNextPage();
    }
  }

  return (
    <ButtonWithSpinner
      variant="primary"
      size="small"
      fullWidth
      onClick={handleNextPage}
      loading={loading}
    >
      {hasNextPage ? "Next" : "Sign up"}
    </ButtonWithSpinner>
  );
}
