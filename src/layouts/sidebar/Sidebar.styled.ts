import { AppBar, styled } from "@mui/material";

export const SidebarStyled = styled(AppBar)({
  width: "78px",
  height: "100vh",
  left: 0,
  display: "flex",
  flexDirection: "column",
  position: "fixed",
  zIndex: 30,
}) as typeof AppBar;
