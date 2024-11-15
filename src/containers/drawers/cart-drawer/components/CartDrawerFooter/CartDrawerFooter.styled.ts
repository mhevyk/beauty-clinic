import { styled } from "@mui/material";
import Box from "@mui/material/Box";

export const CartDrawerFooterStyled = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.SteelMist.main,
  marginTop: "40px",
  padding: "20px 24px",
  display: "flex",
  justifyContent: "space-between",
}));
