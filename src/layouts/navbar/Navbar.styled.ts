import { Link } from "react-router-dom";

import { styled } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";

import theme from "@/theme/theme";

export const AppBarStyled = styled(AppBar)(({ theme }) => ({
  padding: "16px 0 8px",
  zIndex: "auto",
  [theme.breakpoints.down("md")]: {
    backgroundColor: "white",
  },
}));

export const LinkStyled = styled(Link)({
  transition: "color 400ms",
});

export const LogoLink = styled(LinkStyled)({
  ...theme.typography.heading,
  fontSize: "22px",
});

export const ToolbarStyled = styled(Toolbar)(({ theme }) => ({
  [theme.breakpoints.up("md")]: {
    marginRight: "35px",
  },
}));
