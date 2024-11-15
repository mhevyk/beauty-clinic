import { styled } from "@mui/material";

import ButtonWithSpinner from "@/components/button-with-spinner/ButtonWithSpinner";

export const ActionButton = styled(ButtonWithSpinner)({
  ":disabled": {
    border: "1px solid #bbb", // TODO: add some gray color to theme
  },
});
