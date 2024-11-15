import { styled } from "@mui/material";
import InputBase from "@mui/material/InputBase";

export const TextInput = styled(InputBase)(() => {
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

export const SuccessFeedback = styled("p")({
  textAlign: "center",
  color: "#9bcb84",
  fontSize: 16,
  fontWeight: 200,
});
