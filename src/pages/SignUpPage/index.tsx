import { Button, Stack, styled } from "@mui/material";
import PasswordForm from "./components/PasswordForm";
import SignUpForm from "./components/SignUpForm";
import { useMultistepForm } from "./hooks/useMultistepForm";
import AuthAlternativeLink from "./components/AuthAlternativeLink";
import theme from "@theme/theme";

const ButtonStyled = styled(Button)({
  padding: "5.28px 50px",
});

export default function SignUpPage() {
  const { page, controls, hasNextPage, hasPreviousPage } = useMultistepForm({
    pages: [<SignUpForm />, <PasswordForm />],
  });

  function handleSubmit() {
    // TODO: handle submit
  }

  return (
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
        <ButtonStyled
          variant="primary"
          fullWidth
          onClick={hasNextPage ? controls.nextPage : handleSubmit}
        >
          {hasNextPage ? "Next" : "Sign up"}
        </ButtonStyled>
        {hasPreviousPage && (
          <ButtonStyled
            variant="primary-outlined"
            fullWidth
            onClick={controls.previousPage}
          >
            Back
          </ButtonStyled>
        )}
      </Stack>
      <AuthAlternativeLink
        linkProps={{
          to: "/auth/signin",
          label: "Have an account",
        }}
      />
    </>
  );
}
