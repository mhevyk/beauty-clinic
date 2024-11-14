import { styled } from "@mui/material";
import Box from "@mui/material/Box";

export const TreatmentInfo = styled("p")(({ theme }) => ({
  ...theme.typography.paragraph,
  paddingBottom: "16px",
  fontSize: "18px",
  margin: 0,
}));

export const BoxStyled = styled(Box)({
  minWidth: "170px",
  paddingTop: "16px",
  marginRight: "22px",
});

export const InformationBox = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
});
