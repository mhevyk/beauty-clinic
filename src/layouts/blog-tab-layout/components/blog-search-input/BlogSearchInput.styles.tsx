import { styled } from "@mui/material";
import Input from "@mui/material/Input";

import CloseIconThin from "@/assets/icons/close-icon-thin.svg";

export const CloseIconThinStyled = styled(CloseIconThin)({
  width: "19px",
  height: "19px",
});

export const SearchInput = styled(Input)({
  "&:after": {
    borderBottom: "none",
  },
  input: {
    padding: "6px 0",
  },
});
