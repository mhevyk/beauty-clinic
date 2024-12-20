import Button from "@mui/material/Button";
import { Formik } from "formik";

import AppHelmet from "@/components/app-helmet/AppHelmet";
import AuthAlternativeLink from "@/containers/auth-alternative-link/AuthAlternativeLink";
import { useMultistepForm } from "@/hooks/use-multistep-form/useMultistepForm";
import useSignUp from "@/hooks/use-sign-up/useSignUp";
import {
  initialFormValues,
  multistepFormConfig,
} from "@/pages/sign-up/SignUpPage.constants";
import { ButtonGroup } from "@/pages/sign-up/SignUpPage.styled";
import { SignUpFormValues } from "@/pages/sign-up/SignUpPage.types";
import NextPageButton from "@/pages/sign-up/components/next-page-button/NextPageButton";
import {
  repeatPasswordFormSchema,
  signUpFormSchema,
} from "@/validation/signUpFormSchema";

export default function SignUpPage() {
  const { page, controls, hasNextPage, hasPreviousPage } =
    useMultistepForm(multistepFormConfig);

  const [signUp, { isSigningUp }] = useSignUp();

  async function handleSubmit(values: SignUpFormValues) {
    await signUp(values);
  }

  const validationSchema = !hasPreviousPage
    ? signUpFormSchema
    : repeatPasswordFormSchema;

  return (
    <AppHelmet title="Sign up">
      <Formik
        initialValues={initialFormValues}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        <>
          {page}
          <ButtonGroup>
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
          </ButtonGroup>
          <AuthAlternativeLink
            linkProps={{
              to: "/auth/signin",
              label: "Have an account",
            }}
          />
        </>
      </Formik>
    </AppHelmet>
  );
}
