import { styled } from "@mui/material";
import Box from "@mui/material/Box";

export const MapContainer = styled(Box)(() => ({
  width: "100%",
  height: "397px",
}));

export const MapMarker = styled("img")(() => ({
  width: "30px",
  height: "45px",
  cursor: "pointer",
}));
