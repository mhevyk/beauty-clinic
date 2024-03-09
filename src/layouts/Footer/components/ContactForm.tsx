import { Button, InputBase, Stack, styled } from "@mui/material";

const TextInput = styled(InputBase)(() => {
  const placeholderStyles = {
    "&::placeholder": {
      opacity: 0.6,
    },
  };

  return {
    padding: "3px 3px 3px 12px",
    fontSize: "16px",
    flexGrow: 1,
    borderBottom: "1px solid rgb(3, 3, 3)",
    color: "rgb(3, 3, 3)",
    input: placeholderStyles,
    textarea: placeholderStyles,
  };
});

const SubmitButton = styled(Button)(({ theme }) => ({
  ...theme.typography.FontAvenirLight3,
  textTransform: "initial",
  fontWeight: 400,
  fontSize: "16px",
  color: "rgb(3, 3, 3)",
}));

// TODO: complete UI
export default function ContactForm() {
  // TODO: add validation logic

  return (
    <form>
      <Stack direction="row" gap="22px">
        <TextInput placeholder="Name" />
        <TextInput placeholder="Email" />
      </Stack>
      <TextInput
        multiline
        rows={5}
        placeholder="Message"
        fullWidth
        sx={{ marginTop: "22px" }}
      />
      <SubmitButton type="submit" fullWidth>
        Submit
      </SubmitButton>
    </form>
  );
}
