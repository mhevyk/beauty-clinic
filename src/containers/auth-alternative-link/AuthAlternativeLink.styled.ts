import { styled } from "@mui/material";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";

import AppLink from "../../components/app-link/AppLink";

const DividerStyled = styled(Divider)({
  "&::before, &::after": {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
});

export const HorizontalDividerStyled = styled(DividerStyled)(({ theme }) => ({
  margin: "41px auto 32px",
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    maxWidth: "198px",
  },
}));

export const VerticalDividerWrapper = styled(Box)({
  display: "flex",
  justifyContent: "center",
});

export const VerticalDividerStyled = styled(DividerStyled)({
  backgroundColor: "rgba(0, 0, 0, 0.5)",
});

export const LinkStyled = styled(AppLink)({
  flex: 1,
  display: "flex",
  justifyContent: "center",
});
