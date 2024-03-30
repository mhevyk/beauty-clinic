import { Button, Stack, styled } from "@mui/material";
import PasswordForm from "./components/PasswordForm";
import SignUpForm from "./components/SignUpForm";
import { useMultistepForm } from "./hooks/useMultistepForm";
import AuthAlternativeLink from "./components/AuthAlternativeLink";
import theme from "@theme/theme";
import { Formik, useFormikContext } from "formik";
import { SignUpFormValues } from "./types";
import { signUpSchema } from "./schema/signUpFormSchema";
import { passwordSchema } from "./schema/passwordSchema";

const ButtonStyled = styled(Button)({
  padding: "5.28px 50px",
});

const initialFormValues = {
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

  function handleSubmit(values: SignUpFormValues) {
    console.log(values);
    // TODO: handle submit
  }

  return (
    <Formik
      initialValues={initialFormValues}
      onSubmit={handleSubmit}
      validationSchema={isFirstPage ? signUpSchema : passwordSchema}
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
            <ButtonStyled
              variant="primary-outlined"
              fullWidth
              onClick={controls.previousPage}
            >
              Back
            </ButtonStyled>
          )}
          <NextPageButton
            hasNextPage={hasNextPage}
            openNextPage={controls.nextPage}
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
};

function NextPageButton({ hasNextPage, openNextPage }: NextPageButtonProps) {
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
    <ButtonStyled variant="primary" fullWidth onClick={handleNextPage}>
      {hasNextPage ? "Next" : "Sign up"}
    </ButtonStyled>
  );
}
