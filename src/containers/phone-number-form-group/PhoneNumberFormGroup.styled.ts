import MaskedInput from "react-text-mask";

import { styled } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";

type MaskedInputStyledProps = {
  backgroundColor: string;
  disabled: boolean;
};

export const LabelStyled = styled(InputLabel)(({ theme }) => ({
  color: theme.palette.secondary.main,
  fontSize: "15px",
  marginBottom: "2px",
  fontWeight: 400,
}));

export const MaskedInputStyled = styled(MaskedInput, {
  shouldForwardProp: prop => prop !== "backgroundColor",
})<MaskedInputStyledProps>(
  ({ backgroundColor, disabled }: MaskedInputStyledProps) => ({
    backgroundColor,
    ...(disabled && { pointerEvents: "none" }),
  })
);
