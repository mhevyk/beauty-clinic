import { styled } from "@mui/material";
import Box from "@mui/material/Box";

import errorImageSVG from "@/assets/decorations/error.svg";

export const BoxStyled = styled(Box)({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  height: "100vh",
  width: "100vw",
  backgroundColor: "#f8ebe1",
  overflow: "hidden",
});

export const ErrorImageSVGStyled = styled(errorImageSVG)({
  paddingBottom: "20px",
  maxWidth: "100%",
  objectFit: "contain",
});
