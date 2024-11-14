import { Link } from "react-router-dom";

import { alpha } from "@mui/material";
import { styled } from "@mui/material";
import ListItem from "@mui/material/ListItem";

export const ListItemStyled = styled(ListItem)({
  position: "relative",
});

export const OverlayLink = styled(Link)(({ theme }) => ({
  opacity: 0,
  transition: "all 600ms",
  content: "'Go to cart'",
  position: "absolute",
  inset: 0,
  zIndex: 10,
  width: "100%",
  height: "100%",
  backgroundColor: alpha(theme.palette.secondary.main, 0.65),
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  paddingLeft: "16px",
  paddingRight: "24px",
}));
