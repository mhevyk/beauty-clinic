import { styled } from "@mui/material";
import Box from "@mui/material/Box";

export const CartBar = styled(Box)(({ theme }) => ({
  width: "100%",
  backgroundColor: theme.palette.PinkMarbleSky.main,
  position: "sticky",
  bottom: 0,
  borderTop: `6px solid ${theme.palette.PinkMarbleSky.main}`,
}));

export const ButtonGroup = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: "20px",
});

export const TotalPriceInformation = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: "80px",
});

export const ContentBox = styled(Box)({
  display: "flex",
  padding: "16px",
  justifyContent: "space-between",
  flexWrap: "wrap",
  gap: "20px",
});
