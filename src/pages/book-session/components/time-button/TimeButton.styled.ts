import { styled } from "@mui/material";
import Button from "@mui/material/Button";

type ButtonStyledPickerProps = {
  isSelected: boolean;
};

export const ButtonStyledPicker = styled(Button, {
  shouldForwardProp: prop => prop !== "isSelected",
})<ButtonStyledPickerProps>(({ isSelected, theme }) => () => {
  const selectedStyles = {
    borderColor: theme.palette.secondary.main,
    color: "black",
    backgroundColor: "#e0d9ce",
  };

  return {
    border: "1px solid",
    borderColor: "#66635e",
    py: "8px",
    width: "117.659px",
    padding: "8px",
    textAlign: "center",
    ...(isSelected && selectedStyles),
    "&:hover, &:focus": selectedStyles,
  };
});
