import { Components } from "@mui/material";

const MuiTextFieldStyles: Components["MuiTextField"] = {
  defaultProps: {
    InputProps: {
      sx: {
        borderRadius: 0,
      },
    },
  },
  styleOverrides: {
    root: {
      backgroundColor: "rgba(255, 255, 255, 0.3)",
      "& .MuiOutlinedInput-root": {
        "& fieldset": {
          borderColor: "black",
        },
        "&:hover fieldset": {
          borderColor: "rgb(3, 3, 3)",
          borderWidth: "0.15rem",
        },
        "&.Mui-focused fieldset": {
          borderColor: "rgb(3, 3, 3)",
        },
      },
    },
  },
};

export default MuiTextFieldStyles;
